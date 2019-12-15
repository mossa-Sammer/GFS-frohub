// eslint-disable-next-line import/prefer-default-export, consistent-return
export const advancedSearch = (services, field) => {
  if (field.byRate || field.byService) {
    if (field.byRate === 'highestPrice' && !field.byService) {
      return services.sort(
        (service1, service2) => Number(service2.price) - Number(service1.price)
      );
    }
    if (field.byRate === 'lowestPrice' && !field.byService) {
      return services.sort(
        (service1, service2) => Number(service1.price) - Number(service2.price)
      );
    }
    if (field.byRate === 'highestRate' && !field.byService) {
      return services.sort(
        (service1, service2) =>
          Number(service2.average_rating) - Number(service1.average_rating)
      );
    }
  }
  return services;
};
