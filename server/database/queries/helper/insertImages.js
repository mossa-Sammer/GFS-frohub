const insertServiceImages = (images, forigenKey) => {
  let count = 1;
  let preparedStatment = '';
  const values = [];

  // eslint-disable-next-line array-callback-return
  images.map((image) => {
    preparedStatment += '(';

    if (forigenKey) {
      preparedStatment += `$${count},`;
      count += 1;
      values.push(forigenKey);
    }

    values.push(image);
    preparedStatment += `$${count},`;
    count += 1;
    preparedStatment = `${preparedStatment.slice(0, -1)}),`;
  });
  preparedStatment = preparedStatment.slice(0, -1);
  return { preparedStatment, values };
};

module.exports = insertServiceImages;
