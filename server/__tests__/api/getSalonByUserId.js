const request = require('supertest');
const app = require('../../app');


const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

let token;

beforeAll(async () => {
  await build();
  const result = await request(app).post('/api/login').send({
    email: 'mossa@gmail.com',
    password: '123456',
  });
  // eslint-disable-next-line prefer-destructuring
  token = result.headers['set-cookie'][0].split(';')[0];
});

afterAll(() => connection.end());

const getFirstSalon = () => connection.query('SELECT * FROM salon LIMIT 1');

test('API GET /salon/1', async (done) => {
  try {
    const { rows: [firstSalon] } = await getFirstSalon();
    const { user_id: salonOwnerId } = firstSalon;
    const res = await request(app)
      .get(`/api/salon/${salonOwnerId}`)
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);

    const { salon } = res.body;
    const { user_id: userId } = salon;
    expect(userId).toBe(salonOwnerId);
    done();
  } catch (e) {
    done(e);
  }
});
