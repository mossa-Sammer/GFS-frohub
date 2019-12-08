import { services, servicesByTreatment } from './mockServices';
import { filterServices } from './index';

/** {
    treatment: 58,
    location: {
      place_id: 162713773,
      licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
      osm_type: 'way',
      osm_id: 391724170,
      boundingbox: [
        '51.2832342',
        '51.2847546',
        '-0.947534',
        '-0.9467504'
      ],
      lat: '51.2838981',
      lon: '-0.9475045',
      display_name: 'Myllers Lond, Hook, Hart, Hampshire, South East, England, RG27 9UD, United Kingdom',
      'class': 'highway',
      type: 'living_street',
      importance: 0.2
    },
    time: null,
    date: null
  },
 */

describe('Filter services tests', () => {
  it('Get all services when no filter applied', () => {
    const searchQueries = {
      treatment: '',
      location: null,
      time: null,
      date: null,
    };
    const filteredServices = filterServices(services, searchQueries);
    expect(filteredServices).toHaveLength(services.length);
    expect(filteredServices).toMatchObject(services);
  });

  it('Filter services by treatment only', () => {
    const searchQueries = {
      treatment: '59',
      location: null,
      time: null,
      date: null,
    };

    const filteredServices = filterServices(services, searchQueries);
    expect(filteredServices).toHaveLength(servicesByTreatment.length);
    expect(filteredServices).toMatchObject(servicesByTreatment);
  });

  it('Filter services by location only', () => {
    // get all services within 10 miles of the location + MOBILE services
    // const searchQueries = {
    //   treatment: '',
    //   location: {
    //     lat: '51.2838981',
    //     lon: '-0.9475045',
    //   },
    //   time: null,
    //   date: null,
    // };
    // const filteredServices = filterServices(services, searchQueries);
    // expect(filteredServices).toHaveLength(servicesByTreatment.length);
    // expect(filteredServices).toMatchObject(servicesByTreatment);
  });
});
