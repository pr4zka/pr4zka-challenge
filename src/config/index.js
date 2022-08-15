require('dotenv').config();
module.exports = {
    aws: {
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
        s3Bucket: process.env.S3Bucket,
    }
}