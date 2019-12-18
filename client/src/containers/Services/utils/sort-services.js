// eslint-disable-next-line import/prefer-default-export, consistent-return
export const advancedSearch = (stores, services, advancedQueries) => {
  const filteredServices = services.filter(service => {
    if (advancedQueries.instantBook) {
      if (service.requires_confirmation) return false;
    }
    if (advancedQueries.serviceType) {
      const matchedStores = {};
      stores.forEach(store => {
        store.categories.forEach(({ name }) => {
          if (name.toLowerCase().includes(advancedQueries.serviceType)) {
            matchedStores[store.id] = true;
          }
        });
      });
      if (!matchedStores[service.store.id]) return false;
    }
    return true;
  });

  if (advancedQueries.sortBy) {
    if (advancedQueries.sortBy === 'highestPrice') {
      return filteredServices.sort(
        (service1, service2) => Number(service2.price) - Number(service1.price)
      );
    }
    if (advancedQueries.sortBy === 'lowestPrice') {
      return filteredServices.sort(
        (service1, service2) => Number(service1.price) - Number(service2.price)
      );
    }
    if (advancedQueries.sortBy === 'highestRate') {
      return filteredServices.sort(
        (service1, service2) =>
          Number(service2.average_rating) - Number(service1.average_rating)
      );
    }
  }
  return filteredServices;
};
