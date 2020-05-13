const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const { addSalonOpeningTimes } = require('../../database/sql_queries');

beforeAll(() => build());
afterAll(() => connection.end());

test('add a salon opeinig times', async (done) => {
  expect.assertions(1);
  try {
    const { rows: [salon] } = await connection.query('SELECT * FROM salon LIMIT 1');
    const data = [
      {
        salon_id: salon.salon_id,
        day: 1,
        from_time: '00:00:00',
        to_time: '08:00:00',
      },
      {
        salon_id: salon.salon_id,
        day: 2,
        from_time: '01:00:00',
        to_time: '08:00:00',
      },
      {
        salon_id: salon.salon_id,
        day: 3,
        from_time: '02:00:00',
        to_time: '08:00:00',
      },
      {
        salon_id: salon.salon_id,
        day: 4,
        from_time: '04:00:00',
        to_time: '08:00:00',
      },
    ];
    const { rows } = await addSalonOpeningTimes(data);
    expect(rows.length).toBe(data.length);
    done();
  } catch (e) { done(e); }
});
