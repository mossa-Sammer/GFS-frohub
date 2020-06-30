const { deleteServiceByAdmin } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteServiceByAdmin(id);
    res.json({ msg: 'service deleted successfully' });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
