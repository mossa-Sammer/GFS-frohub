const boom = require('@hapi/boom');
const { v4: uuid } = require('uuid');

const { S3, storageUrl, bucket } = require('../../config/awsS3');
const { checkStylist } = require('../../database/queries/stylist');

const typesValidation = require('./contentTypesValidation');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { id: userId } = req.params;
  const { contentTypes } = req.body;
  const images = [];

  const imageUrl = `${storageUrl}/`;
  let promises = [];


  if (!Number(userId)) {
    return next(boom.badRequest('user id should be number'));
  }

  const { rows: [stylist] } = await checkStylist(userId);
  if (!stylist) { return next(boom.notFound('stylist not found')); }

  await typesValidation.validate(contentTypes);


  promises = await Promise.all(contentTypes.map((type) => {
    const key = `${userId}/${uuid()}.${type}`;
    images.push(imageUrl + key);

    return S3.getSignedUrlPromise('putObject', {
      Bucket: bucket,
      ContentType: type,
      Key: key,
    });
  }));

  res.json({ promises, images });
};
