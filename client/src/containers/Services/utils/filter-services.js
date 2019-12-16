import geoDistance from './geo-distance';

export default (stores, services, fields) => {
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
      let matchedStored = {};
      stores.filter(store => {
        const { time: storeTime } = store.store_open_close;
        // eslint-disable-next-line no-restricted-syntax
        for (const key in storeTime) {
          // eslint-disable-next-line no-prototype-builtins, no-continue
          if (!storeTime.hasOwnProperty(key)) continue;
          const obj = storeTime[key];
          const { closing_time: closingTime, opening_time: openingTime } = obj;
          if (closingTime === time.to && openingTime === time.from) {
            matchedStored = {
              id: store.id,
            };
          }
        }
      });
      if (matchedStored.id !== service.store.id) return false;
    }
    return true;
  });
  return filteredServices;
};
