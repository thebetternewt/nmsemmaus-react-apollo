const aws = require('aws-sdk');

const s3Bucket = process.env.S3_BUCKET;

module.exports = {
  Mutation: {
    signS3: async (parent, { filename, filetype, path }) => {
      // TODO: Restrict to ADMIN only.

      // AWS_ACCESS_KEY_ID
      // AWS_SECRET_ACCESS_KEY
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-1',
      });

      const s3Params = {
        Bucket: s3Bucket,
        Key: `${path}/${filename}`,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read',
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      const url = `https://${s3Bucket}.s3.amazonaws.com/${path}/${filename}`;

      return {
        signedRequest,
        url,
      };
    },
  },
};
