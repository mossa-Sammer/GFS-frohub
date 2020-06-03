const request = require('supertest');

const app = require('../../app');
const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

beforeAll(() => build());
afterAll(() => connection.end());

const getFirstSalon = () => connection.query('SELECT * FROM salon LIMIT 1');

test('API PATCH /api/salon', async (done) => {
  try {
    const { rows: [firstSalon] } = await getFirstSalon();
    const { salon_id: salonId } = firstSalon;
    const data = {
      salon: {
        salonId,
        name: 'update salon',
        about: 'lorem lorem lorem',
        instgramHandle: 'http://instgram.com/***',
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

    const res = await request(app)
      .patch(`/api/salon/${salonId}`)
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(expectedFields).toEqual(Object.keys(res.body));
    done();
  } catch (e) { done(e); }
});
