const AWS = require("aws-sdk");

class ImageHandle {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  uploadImage(nombre, image, type) {
    const Key = `${nombre}.${type.split("/")[1]}`;
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key,
        ContentType: type,
        Body: image,
        ACL: "public-read",
      };
      this.s3.upload(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${Key}`);
        }
      });
    });
  }
  deleteImage(Key) {
    Key = Key.split("/")[3];
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key,
      };
      this.s3.deleteObject(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          console.log(JSON.stringify(data));
          resolve(data);
        }
      });
    });
  }
}

module.exports = ImageHandle;
