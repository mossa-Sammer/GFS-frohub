const searchLogic = (searchFor, data) => {
  return data.filter(obj =>
    obj.name
      .trim()
      .toLocaleLowerCase()
      .includes(searchFor.trim().toLocaleLowerCase())
  );
};

module.exports = searchLogic;
