const { unauthorized } = require('@hapi/boom');
const {
  insertStylistBusiness,
  checkStylist,
} = require('../../../database/queries');

const { validateAddBusiness } = require('./validation/addBusiness');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    accountNum,
    sortCode,
    preffaredPayMethod,
  } = req.body;
  const isStylist = checkStylist(id);
  validateAddBusiness.validate({
    fullName,
    accountNum,
    sortCode,
  }).then(() => {
    isStylist.then((result) => {
      if (result.rows.length) {
        insertStylistBusiness(id, {
          fullName, accountNum, sortCode, preffaredPayMethod,
        })
          .then((business) => {
            res.send({ ...business.rows[0] });
          }).catch((err) => console.log(5555, err));
      } else {
        next(unauthorized('unauthorize'));
      }
    })
      .catch((err) => console.log(99, err));
  })
    .catch((err) => console.log(765342, err));
};
