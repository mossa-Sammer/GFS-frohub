const { unauthorized } = require('@hapi/boom');

const {
  checkStylist,
  getFinance,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows: isStylist } = await checkStylist(id);
    if (!isStylist.length) next(unauthorized('Unauthorized'));
    else {
      const { rows: stylistFinance } = await getFinance(id);
      res.json({ stylistFinance });
    }
  } catch (err) {
    next(err);
  }
};
