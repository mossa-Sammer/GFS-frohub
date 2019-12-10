import {
  services,
  servicesByLocation,
  servicesByLocation2,
} from './mockupServices/mock-services-location';
import { filterServices } from './index';

describe('Filter services tests "location"', () => {
  it('Filter services by location only 1', () => {
    // get all services within 10 miles of the location + MOBILE services
    const searchQueries = {
      treatment: '',
      location: {
        lat: '51.5895493',
        lon: '-0.4366119',
      },
      time: null,
      date: null,
    };
    const filteredServices = filterServices(services, searchQueries);
    expect(filteredServices).toHaveLength(servicesByLocation.length);
    expect(filteredServices).toMatchObject(servicesByLocation);
  });

  it('Filter services by location only 2', () => {
    // services filtered when the location is far, only MOBILE services
    const searchQueries = {
      treatment: '',
      location: {
        lat: '51.8885078302529',
        lon: '0.258922620894347',
      },
      time: null,
      date: null,
    };
    const filteredServices = filterServices(services, searchQueries);
    expect(filteredServices).toHaveLength(servicesByLocation2.length);
    expect(filteredServices).toMatchObject(servicesByLocation2);
  });
});
