const dbConnection = require('../../../database/config/dbConnection');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await dbConnection.query('SELECT * FROM service_length WHERE service_length_id=$1', [id]);
    res.json({ serviceLength: rows[0] });
  } catch (err) {
    next(err);
  }
};
