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
  expect.assertions(3);
  try {
    const { rows: [user] } = await getStylist();

    const data = {
      salon: {
        name: 'gfs salon',
        about: 'lorem ipsum is the simplest text in the world',
        instgramHandle: 'http://instgram.com/***',
        profileImage: 'c',
        coverImage: 'c',
        document: 'm',
        type: 'mobile',
        street: 'hmeed',
        city: 'gaza',
        countryCode: 'PS',
        postalCode: '1234',
      },
      openingTimes: [
        {
          day: 1,
          fromTime: '00:00',
          toTime: '08:00',
        },
        {
          day: 2,
          fromTime: '00:00',
          toTime: '09:00',
        },
        {
          day: 3,
          fromTime: '04:00',
          toTime: '11:30',
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

    const salonFields = [
      'salon_id',
      'user_id',
      'name',
      'about',
      'instgram_handle',
      'profile_image',
      'cover_image',
      'document',
      'type',
      'street',
      'city',
      'country',
      'postal_code',
      'status',
    ];
    const openingTimesFields = [
      'salon_opening_time_id',
      'salon_id',
      'day',
      'from_time',
      'to_time',
    ];

    const zonesFields = [
      'salon_zone_id',
      'salon_id',
      'from_zone',
      'to_zone',
      'price',
    ];

    const res = await request(app)
      .post(`/api/salon/${user.user_id}`)
      .send(data).expect(200)
      .expect('Content-Type', /json/);
    let { salon, times, zones } = res.body.data;

    salon = Object.keys(salon);
    times = Object.keys(times[0]);
    zones = Object.keys(zones[0]);

    expect(salon).toEqual(salonFields);
    expect(times).toEqual(openingTimesFields);
    expect(zones).toEqual(zonesFields);

    done();
  } catch (e) {
    done(e);
  }
});
