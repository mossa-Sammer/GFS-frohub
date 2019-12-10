// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::                                                                         :::
// :::  This routine calculates the distance between two points (given the     :::
// :::  latitude/longitude of those points). It is being used to calculate     :::
// :::  the distance between two locations using GeoDataSource (TM) prodducts  :::
// :::                                                                         :::
// :::  Definitions:                                                           :::
// :::    South latitudes are negative, east longitudes are positive           :::
// :::                                                                         :::
// :::  Passed to function:                                                    :::
// :::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
// :::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
// :::    unit = the unit you desire for results                               :::
// :::           where: 'M' is statute miles (default)                         :::
// :::                  'K' is kilometers                                      :::
// :::                  'N' is nautical miles                                  :::
// :::                                                                         :::
// :::  Worldwide cities and other features databases with latitude longitude  :::
// :::  are available at https://www.geodatasource.com                         :::
// :::                                                                         :::
// :::  For enquiries, please contact sales@geodatasource.com                  :::
// :::                                                                         :::
// :::  Official Web site: https://www.geodatasource.com                       :::
// :::                                                                         :::
// :::               GeoDataSource.com (C) All Rights Reserved 2018            :::
// :::                                                                         :::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export const getDistance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist *= 1.609344;
  }
  if (unit === 'N') {
    dist *= 0.8684;
  }
  return dist;
};

// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export const filterServices = (services, fields) => {
  const { treatment, location, date, time } = fields;

  let filteredServices;
  if (!treatment && !location && !date && !time) return services;
  filteredServices = services.filter(service => {
    if (!treatment) return true;
    return service.categories[0].id === Number(treatment);
  });

  if (!treatment && location && !date && !time) {
    const { lat: lat1, lon: lon1 } = location;
    let lat2;
    let lon2;
    filteredServices = services.filter(service => {
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
      const distance = getDistance(lat1, lon1, lat2, lon2);
      if (distance <= 10) return true;
      return false;
    });
  }
  return filteredServices;
};
