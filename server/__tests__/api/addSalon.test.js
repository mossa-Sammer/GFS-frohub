const request = require('supertest');
const app = require('../../app');
const build = require('../../database/config/dbBuild');
const connection = require('../../database/config/dbConnection');


beforeAll(() => build());
afterAll(() => connection.end());

const getStylist = () => connection.query(
  'SELECT * FROM "user" WHERE role=$1 LIMIT 1',
  ['stylist'],
);

test('POST /api/salon ', async (done) => {
  const { rows: [user] } = await getStylist();

  const data = {
    salon: {
      userId: user.user_id,
      name: 'gfs salon',
      about: 'lorem ipsum is the simplest text in the world',
      profileImage: '',
      coverImage: '',
      document: '',
      type: 'mobile',
      street: 'hmeed',
      city: 'gaza',
      countryCode: 'PS',
      postalCode: '1234',
    },
    openingTimes: [
      {
        day: 1,
        fromTime: '00:00:00',
        toTime: '08:00:00',
      },
      {
        day: 2,
        fromTime: '00:00:00',
        toTime: '09:00:00',
      },
      {
        day: 3,
        fromTime: '04:00:00',
        toTime: '11:30:00',
      },
    ],
    zones: [
      {
        fromZone: 1,
        toZone: 2,
        price: 500,
      },
    ],
  };
  const res = await request(app)
    .post('/api/salon')
    .send(data).expect(200)
    .expect('Content-Type', /json/);
  console.log(res);
  done();
});
