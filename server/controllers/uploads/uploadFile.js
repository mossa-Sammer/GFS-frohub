const boom = require('@hapi/boom');
const { v4: uuid } = require('uuid');
const S3 = require('../../config/awsS3');


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { id: userId } = req.params;
  const { contentType } = req.body;

  if (!Number(userId)) {
    return next(boom.badRequest('user id should be number'));
  }

  if (!contentType) {
    return next(boom.badRequest('must specfiy content type'));
  }

  if (!contentType.includes('pdf') && !contentType.includes('image')) {
    return next(boom.badRequest('should be image or pdf document'));
  }

  const ext = contentType.split('/')[1];
  const key = `${userId}/${uuid()}.${contentType}`;
  const imageUrl = 'https://frohub-test.s3.eu-west-2.amazonaws.com/';

  S3.getSignedUrlPromise('putObject', {
    Bucket: 'frohub-test',
    ContentType: ext === 'pdf' ? contentType : ext,
    Key: key,
  }).then((url) => res.json({ imageUrl: imageUrl + url })).catch(next);
};
