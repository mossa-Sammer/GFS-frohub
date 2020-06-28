const { getServicesLengthesByAdmin } = require('../../../database/queries');

module.exports = async (req, res) => {
  const { rows: servicesLengthes } = await getServicesLengthesByAdmin();
  res.json({ data: servicesLengthes });
};
