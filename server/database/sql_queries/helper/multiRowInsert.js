const multiRowInsert = (data) => {
  let count = 1;
  let preparedStatment = '';
  const values = [];

  data.forEach((item) => {
    preparedStatment += '(';

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
