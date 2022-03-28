import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export async function uploadtoS3(s3Data: S3.PutObjectRequest) {
  console.info("---- UPLODAING TO S3", `${s3Data.Bucket}/${s3Data.Key}`);

  try {
    return await s3.upload(s3Data).promise();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function downloadFromS3(params: S3.GetObjectRequest): Promise<any> {
  console.info("---- DOWNLOADING FROM S3", JSON.stringify(params, null, 2));
  try {
    return await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getS3SignedUrl(params: any): Promise<any> {
  console.info("---- GETTING SIGNED URL FROM S3", JSON.stringify(params, null, 2));
  try {
    return s3.getSignedUrl("getObject", {
      Bucket: params.Bucket,
      Key: params.Key,
      Expires: params.Expires,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
