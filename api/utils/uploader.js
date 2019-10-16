const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const ApplicationSettings = require("../utils/ApplicationSettings");

var s3 = {}

class Uploader {
  static setKeys() {
    console.log(
      "AWS_SECRET_ACCESS_KEY:" +
      ApplicationSettings.getValue("AWS_SECRET_ACCESS_KEY")
    );
    console.log(
      "AWS_ACCESS_KEY_ID:" + ApplicationSettings.getValue("AWS_ACCESS_KEY_ID")
    );
    console.log("AWS_REGION:" + ApplicationSettings.getValue("AWS_REGION"));
    aws.config.update({
      secretAccessKey: ApplicationSettings.getValue('AWS_SECRET_ACCESS_KEY'),
      accessKeyId: ApplicationSettings.getValue('AWS_ACCESS_KEY_ID'),
      region: ApplicationSettings.getValue('AWS_REGION') // region of your bucket
    });

    s3 = new aws.S3();
  }


  static uploadAvatar(account_id) {
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: ApplicationSettings.getValue("AWS_BUCKET"),
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: "inline",
        metadata: function (req, file, cb) {
          cb(null, {
            fieldName: file.fieldname
          });
        },
        key: function (req, file, cb) {
          cb(null, `${account_id}/avatar/${Date.now().toString()}`);
        }
      })
    });
    return upload.single("avatar");
  }

  static uploadForm(form, ref_no) {
    console.log("UploadForm ...")
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: ApplicationSettings.getValue("AWS_BUCKET"),
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: "inline",
        metadata: function (req, file, cb) {
          cb(null, {
            fieldName: file.fieldname
          });
        },
        key: function (req, file, cb) {
          cb(null, `forms/${form}/${ref_no}.pdf`);
        }
      })
    });
    return upload.single("tax_returns");
  }

  /**
   *
   * @param {avatar_key} key
   */
  static deleteAvatar(key) {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: ApplicationSettings.getValue("AWS_BUCKET"),
        Key: key
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static uploadDocuments(directory) {
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: ApplicationSettings.getValue("AWS_BUCKET"),
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: "inline",
        metadata: function (req, file, cb) {
          console.log("UPLOADING FILE: " + JSON.stringify(file));
          cb(null, {
            fieldName: file.fieldname
          });
        },
        key: function (req, file, cb) {
          cb(null, `${directory}/${Date.now().toString()}`);
        }
      })
    });
    return upload.array("files");
  }

  /**
   *
   * @param {avatar_key} key
   */
  static deleteDocuments(keys) {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: ApplicationSettings.getValue("AWS_BUCKET"),
        Delete: {
          Objects: [],
          Quiet: false
        }
      };
      keys.forEach(element => {
        params.Delete.Ojects.push({
          Key: element.key
        });
      });
      s3.deleteObjects(params, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Uploader;