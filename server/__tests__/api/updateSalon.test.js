const request = require('supertest');

const app = require('../../app');
const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

beforeAll(() => build());
afterAll(() => connection.end());

test('API PATCH /api/salon', async (done) => {
  const data = {
    salon: {
      salonId: 1,
      name: 'update salon',
      about: 'lorem lorem lorem',
      profileImage: 'pro',
      coverImage: 'cover',
      document: 'ddd',
      type: 'mobile',
      street: 'omar el mukhtar',
      city: 'gaza',
      countryCode: 'PS',
      postalCode: '00972',
    },
    openingTimes: [
      { day: 1, fromTime: '00:00', toTime: '09:15' },
      { day: 2, fromTime: '03:00', toTime: '10:15' },
      { day: 3, fromTime: '02:00', toTime: '11:15' },
      { day: 4, fromTime: '01:00', toTime: '12:15' },
    ],
    zones: [
      {
        fromZone: 1,
        toZone: 2,
        price: 100,
      },
      {
        fromZone: 4,
        toZone: 6,
        price: 200,
      },
    ],
  };
  const expectedFields = ['salon', 'zones', 'openingTimes'];
  try {
    const res = await request(app)
      .patch('/api/salon/1')
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(expectedFields).toEqual(Object.keys(res.body));
    done();
  } catch (e) { done(e); }
});
