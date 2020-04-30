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
    const { user_id: salonOwnerId } = firstSalon;
    const res = await request(app)
      .get(`/api/salon/${salonOwnerId}`)
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
