const { deleteServiceLengthByAdmin } = require('../../../database/queries');


module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteServiceLengthByAdmin(id);
    res.json({ msg: 'service length deleted successfully' });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
