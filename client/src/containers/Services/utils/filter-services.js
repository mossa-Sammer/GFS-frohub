import moment from 'moment';
import geoDistance from './geo-distance';

export default (stores, services, fields) => {
  const { treatment, location, date, time } = fields;
  // console.log(99999, stores);
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
      // console.log(454, time.to);
      const searchFrom = Number(time.from.split(':')[0]);
      const searchTo = Number(time.to.split(':')[0]);
      // const toTime = moment(time.to).format('LT');
      // console.log(4432, toTime);
      // console.log(999, stores);
      // console.log(stores.store_open_close.time.opening_time);
      // console.log(stores.store_open_close.time.closing_time);
      // exclude services that doesn't have availability
      const storesIds = [];
      const filteredStores = stores.filter(store => {
        // console.log(6666, time.from);
        // console.log(9999, store.store_open_close.time);
        const { time: storeTime } = store.store_open_close;
        // eslint-disable-next-line no-restricted-syntax
        for (const key in storeTime) {
          if (!storeTime.hasOwnProperty(key)) continue;
          const obj = storeTime[key];
          const { closing_time, opening_time } = obj;
          if (closing_time === time.to && opening_time === time.from) {
            // storesIds.push(store.id);
            return service.store.id;
          }
          // return closing_time === time.to && opening_time === time.from;
        }
      });
      // console.log(7777777, storesIds);
      // if (!service.availability.length) return false;

      // let isTimeMatch = false;
      // for (let i = 0; i < service.availability.length; i += 1) {
      //   const { from, to } = service.availability[i];
      //   if (searchTo <= Number(from.split(':')[0])) {
      //     isTimeMatch = false;
      //   } else if (searchFrom >= Number(to.split(':')[0])) {
      //     isTimeMatch = false;
      //   } else {
      //     isTimeMatch = true;
      //     break;
      //   }
      // }
      // if (!isTimeMatch) return false;
    }
    return true;
  });
  return filteredServices;
};
