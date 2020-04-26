const { getUserById } = require('../../../database/sql_queries');

module.exports = (req, res, next) => {
  const { id } = req.params;
  getUserById(id).then((data) => {
    const { rows } = data;
    res.json({ ...rows[0] });
  }).catch(next);
};
