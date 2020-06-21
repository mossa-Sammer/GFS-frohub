const axios = require('axios');

module.exports = async (req, res) => {
  const { data } = await axios.get('http://country.io/phone.json');
  return res.json(data);
};
