const request = require('supertest');
const app = require('../../app');


const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

beforeAll(() => build());
afterAll(() => connection.end());

const getFirstSalon = () => connection.query('SELECT * FROM salon LIMIT 1');

test('API GET /salon/1', async (done) => {
  try {
    const { rows: [firstSalon] } = await getFirstSalon();

    const res = await request(app)
      .get(`/api/salon/${firstSalon.user_id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    const { salon } = res.body;
    expect(salon.user_id).toBe(firstSalon.user_id);
    done();
  } catch (e) {
    done(e);
  }
});
