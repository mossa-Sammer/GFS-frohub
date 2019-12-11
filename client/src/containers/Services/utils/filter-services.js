import geoDistance from './geo-distance';

export default (services, fields) => {
  const { treatment, location, date, time } = fields;
  // No search queries applied
  if (!treatment && !location && !date && !time.to) return services;
  const filteredServices = services.filter(service => {
    if (treatment && service.categories[0].id !== Number(treatment))
      return false;

    if (location) {
      const {
        store: { address },
        meta_data: metaData,
      } = service;
      const { lat: lat1, lon: lon1 } = location;
      let lat2;
      let lon2;

      // filter location for not MOBILE services, ToDo check the city
      if (address.street_1 !== 'MOBILE') {
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
        if (distance > 10) return false;
      }
    }

    if (time.to) {
      const searchFrom = Number(time.from.split(':')[0]);
      const searchTo = Number(time.to.split(':')[0]);

      // exclude services that doesn't have availability
      if (!service.availability.length) return false;

      let isTimeMatch = false;
      for (let i = 0; i < service.availability.length; i += 1) {
        const { from, to } = service.availability[i];
        if (searchTo <= Number(from.split(':')[0])) {
          isTimeMatch = false;
        } else if (searchFrom >= Number(to.split(':')[0])) {
          isTimeMatch = false;
        } else {
          isTimeMatch = true;
          break;
        }
      }
      if (!isTimeMatch) return false;
    }
    return true;
  });
  return filteredServices;
};
