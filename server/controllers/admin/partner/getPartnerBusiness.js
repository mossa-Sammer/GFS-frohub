const { getPartnerBusiness } = require('../../../database/queries');


module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows: business } = await getPartnerBusiness(id);
    res.json(business);
  } catch (err) {
    next(err);
  }
};
