import geoDistance from './geo-distance';

export default (services, fields) => {
  const { treatment, location, date, time } = fields;

  // No search queries applied
  if (!treatment && !location && !date && !time.to) return services;

  // Only treatment search query applied
  if (treatment && !location && !date && !time.to) {
    const filteredServices = services.filter(service => {
      return service.categories[0].id === Number(treatment);
    });
    return filteredServices;
  }

  // Only time search query applied
  if (!treatment && !location && !date && time.to) {
    const searchFrom = Number(time.from.split(':')[0]);
    const searchTo = Number(time.to.split(':')[0]);
    // eslint-disable-next-line array-callback-return, consistent-return
    const filteredServices = services.filter(service => {
      if (!service.availability.length) return false;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < service.availability.length; i++) {
        const { from, to } = service.availability[i];
        if (searchTo <= Number(from.split(':')[0])) return false;
        if (searchFrom >= Number(to.split(':')[0])) return false;
        return true;
      }
    });
    return filteredServices;
  }

  // Only location search query applied
  if (!treatment && location && !date && !time) {
    const { lat: lat1, lon: lon1 } = location;
    let lat2;
    let lon2;
    const filteredServices = services.filter(service => {
      const {
        store: { address },
        meta_data: metaData,
      } = service;

      // filter for MOBILE services, ToDo check the city
      if (address.street_1 === 'MOBILE') return true;

      // get lat and lon for the service
      metaData.forEach(({ key, value }) => {
        if (key === 'dokan_geo_latitude') {
          lat2 = value;
        }
        if (key === 'dokan_geo_longitude') {
          lon2 = value;
        }
      });

      // get the distance
      const distance = geoDistance(lat1, lon1, lat2, lon2);
      if (distance <= 10) return true;
      return false;
    });
    return filteredServices;
  }
  return services;
};
