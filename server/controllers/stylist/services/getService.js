const {
  getService,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const service = await getService(id);
    res.send({ service: service.rows });
  } catch (err) {
    next(err);
  }
};
