const aws = require('aws-sdk');

const {
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

module.exports = {
    videoUpload: (req, res) => {

        aws.config = {
          region: "us-west-1",
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        };
        
        const s3 = new aws.S3();
        const fileName = req.query["file-name"];
        const fileType = req.query["file-type"];
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
          Expires: 60,
          ContentType: fileType,
          ACL: "public-read",
        };

        s3.getSignedUrl("putObject", s3Params, (err, data) => {
          if (err) {
            console.log(err);
            return res.end();
          }
          const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
          };

          return res.send(returnData);
        });
    },
    deleteVideo: (req, res) => {
      const { video_url, user_id } = req.body,
          { id } = req.params,
          db = req.app.get('db')

      const fileName = video_url.replace(
        "https://le-bucket.s3-us-west-1.amazonaws.com/", ''
      );
     
      aws.config = {
        region: "us-west-1",
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      };

      const s3 = new aws.S3();
      const params = {
        Bucket: "le-bucket",
        Key: fileName
      }
      s3.deleteObject(params, (err, data) => {
        if (err) console.log(err, err.stack)
        else console.log(data)
      });

      db.video.delete_video({id, user_id})
      .then(videos => res.status(200).send(videos))
      .catch(err => res.status(500).send(err))
    },
}