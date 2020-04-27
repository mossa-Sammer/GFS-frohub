const { unauthorized } = require('@hapi/boom');
const {
  getStylistBusiness,
  checkStylist,
} = require('../../../database/queries');


module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const isStylist = await checkStylist(id);
    if (isStylist.rows[0]) {
      const business = await getStylistBusiness(id);
      if (business.rows) {
        res.json({ ...business.rows });
      }
    } else {
      next(unauthorized('Unauthorized'));
    }
  } catch (err) {
    next();
  }
};
