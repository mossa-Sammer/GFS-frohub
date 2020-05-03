const multiRowInsert = (data, forigenId) => {
  let count = 1;
  let preparedStatment = '';
  const values = [];

  data.forEach((item) => {
    preparedStatment += '(';

    if (forigenId) {
      preparedStatment += `$${count},`;
      count += 1;
      values.push(forigenId);
    }

    Object.values(item).forEach((value) => {
      values.push(value);
      preparedStatment += `$${count},`;
      count += 1;
    });
    preparedStatment = `${preparedStatment.slice(0, -1)}),`;
  });
  preparedStatment = preparedStatment.slice(0, -1);
  return { preparedStatment, values };
};


module.exports = multiRowInsert;
