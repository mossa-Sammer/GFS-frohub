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
  return filteredServices;
};
