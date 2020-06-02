const AWS = require('aws-sdk');


const storageUrl = 'https://myfirstbucket512.s3.eu-west-3.amazonaws.com';
const bucket = 'myfirstbucket512';
const region = 'eu-west-3';


const S3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region,
});


module.exports = {
  S3, storageUrl, bucket, region,
};
