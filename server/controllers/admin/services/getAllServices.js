const { getAllServices } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { rows: services } = await getAllServices();
    res.json({ data: services });
  } catch (e) { next(e); }
};
