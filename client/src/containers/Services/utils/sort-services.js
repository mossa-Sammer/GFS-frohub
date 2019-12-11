// eslint-disable-next-line import/prefer-default-export, consistent-return
export const sortServices = (services, field) => {
  if (field) {
    if (field === 'highestPrice') {
      return services.sort(
        (service1, service2) => Number(service2.price) - Number(service1.price)
      );
    }
    if (field === 'lowestPrice') {
      return services.sort(
        (service1, service2) => Number(service1.price) - Number(service2.price)
      );
    }
    return services.sort(
      (service1, service2) =>
        Number(service2.average_rating) - Number(service1.average_rating)
    );
  }
  return services;
};
