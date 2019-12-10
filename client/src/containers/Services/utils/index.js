// eslint-disable-next-line no-unused-vars, import/prefer-default-export, consistent-return
export const filterServices = (services, fields) => {
  const { treatment, location, date, time } = fields;

  if (!treatment && !location && !date && !time) return services;
  if (treatment && !location && !date && !time) {
    const filteredServices = services.filter(service => {
      return service.categories[0].id === Number(treatment);
    });
    return filteredServices;
  }
  if (!treatment && !location && !date && time) {
    const searchFrom = Number(time.from.split(':')[0]);
    const searchTo = Number(time.to.split(':')[0]);
    // eslint-disable-next-line array-callback-return, consistent-return
    const filteredS = services.filter(service => {
      if (!service.availability.length) return false;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < service.availability.length; i++) {
        const { from, to } = service.availability[i];
        if (searchTo <= Number(from.split(':')[0])) return false;
        if (searchFrom >= Number(to.split(':')[0])) return false;
        return true;
      }
    });
    return filteredS;
  }
};
