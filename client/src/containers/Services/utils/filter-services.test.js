import { services, servicesByTreatment } from './mockupServices/mockServices';
import stores from './mockupServices/stores';
import { filterServices } from './index';

describe('Filter services tests', () => {
  it('Get all services when no filter applied', () => {
    const searchQueries = {
      treatment: '',
      location: null,
      time: {
        from: '',
        to: '',
      },
      date: null,
    };
    const filteredServices = filterServices(stores, services, searchQueries);
    expect(filteredServices).toHaveLength(services.length);
    expect(filteredServices).toMatchObject(services);
  });

  it('Filter services by treatment only', () => {
    const searchQueries = {
      treatment: '59',
      location: null,
      time: {
        from: '',
        to: '',
      },
      date: null,
    };

    const filteredServices = filterServices(stores, services, searchQueries);
    expect(filteredServices).toHaveLength(servicesByTreatment.length);
    expect(filteredServices).toMatchObject(servicesByTreatment);
  });
});
