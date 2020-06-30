const { getStylistBusiness } = require('../../../database/queries');


module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows: business } = await getStylistBusiness(id);
    res.json(business);
  } catch (err) {
    next(err);
  }
};
