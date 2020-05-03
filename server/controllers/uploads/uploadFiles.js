const boom = require('@hapi/boom');
const { v4: uuid } = require('uuid');
const S3 = require('../../config/awsS3');


// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { id: userId } = req.params;
  const { contentTypes } = req.body;
  const promises = [];
  const images = [];
  const imageUrl = 'https://frohub-test.s3.eu-west-2.amazonaws.com/';


  if (!Number(userId)) {
    return next(boom.badRequest('user id should be number'));
  }

  if (!contentTypes) {
    return next(boom.badRequest('must specfiy content types'));
  }


  for (let i = 0; i < contentTypes.length; i += 1) {
    if (!contentTypes.includes('pdf') && !contentTypes.startsWith('image/')) {
      return next(boom.badRequest('should be image or pdf document'));
    }
    const key = `${userId}/${uuid()}.${contentTypes[i]}`;

    promises.push(S3.getSignedUrlPromise('putObject', {
      Bucket: 'frohub-test',
      ContentType: contentTypes[i],
      Key: key,
    }));
    images.push(imageUrl + key);
  }

  const uploadUrls = await Promise.all(promises);
  res.json({ uploadUrls, images });
};
