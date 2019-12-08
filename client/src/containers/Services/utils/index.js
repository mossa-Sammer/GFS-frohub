// eslint-disable-next-line no-unused-vars, import/prefer-default-export
export const filterServices = (services, fields) => {
  const { treatment, location, date, time } = fields;

  if (!treatment && !location && !date && !time) return services;
  const filteredServices = services.filter(service => {
    if (!treatment) return true;
    return service.categories[0].id === Number(treatment);
  });
  return filteredServices;
};
