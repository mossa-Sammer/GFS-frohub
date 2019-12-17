// eslint-disable-next-line import/prefer-default-export, consistent-return
export const advancedSearch = (services, field) => {
  let filteredServices = services;

  if (field.instantBook) {
    // eslint-disable-next-line no-unused-vars
    filteredServices = services.filter(service => {
      // check for instant book
      return true;
    });
  }

  if (field.byRate || field.byService) {
    if (field.byRate === 'highestPrice' && !field.byService) {
      return filteredServices.sort(
        (service1, service2) => Number(service2.price) - Number(service1.price)
      );
    }
    if (field.byRate === 'lowestPrice' && !field.byService) {
      return filteredServices.sort(
        (service1, service2) => Number(service1.price) - Number(service2.price)
      );
    }
    if (field.byRate === 'highestRate' && !field.byService) {
      return filteredServices.sort(
        (service1, service2) =>
          Number(service2.average_rating) - Number(service1.average_rating)
      );
    }
  }
  return filteredServices;
};
