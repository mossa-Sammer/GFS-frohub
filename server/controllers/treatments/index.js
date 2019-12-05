const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const treatments = await axios.get('http://frohub.com/wp-json/wc-bookings/v1/products?per_page=100');
    res.send({ data: treatments.data });
  } catch (err) {
    res.send(err);
  }
};
