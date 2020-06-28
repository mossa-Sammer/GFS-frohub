const { getAllPartners } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { rows: partners } = await getAllPartners();
    res.json(partners);
  } catch (err) { next(err); }
};
