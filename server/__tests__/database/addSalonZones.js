const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const { addSalonZones } = require('../../database/sql_queries');


beforeAll(() => build());
afterAll(() => connection.end());

test('add salon zones', async (done) => {
  expect.assertions(1);
  try {
    const zones = [
      {
        salonId: 1,
        fromZone: 1,
        toZone: 2,
        price: 800,
      },
      {
        salonId: 1,
        fromZone: 1,
        toZone: 3,
        price: 800,
      },
      {
        salonId: 1,
        fromZone: 2,
        toZone: 3,
        price: 500,
      },
      {
        salonId: 1,
        fromZone: 6,
        toZone: 7,
        price: 100,
      },
    ];
    const { rows } = await addSalonZones(zones);
    expect(rows.length).toBe(zones.length);
    done();
  } catch (e) { done(e); }
});
