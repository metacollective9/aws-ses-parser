import { Handler, SNSEvent } from 'aws-lambda';
import 'source-map-support/register';
import { S3 } from 'aws-sdk';
import { downloadFromS3, uploadtoS3 } from './src/util/awsWrapper';
import { simpleParser } from 'mailparser';

export const parseMail: Handler = async (event:SNSEvent) => {
  try {

    console.log(JSON.stringify(event));
    
    const message: any = JSON.parse(event.Records[0].Sns.Message);
    
    let bucket = message.receipt.action.bucketName;
    let objKey = decodeURIComponent(message.receipt.action.objectKey.replace(/\+/g, " "));
    
    const s3Data: S3.GetObjectOutput = await downloadFromS3({ Bucket: bucket, Key: objKey });
    const isParsed = await parse(s3Data.Body.toString('utf8'));
    console.log('Parsed -> ', isParsed);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Your function parseMail executed successfully!",
        event
      })
    };

  } catch (error) {
    console.log(error);
  }
};

const parse = async (email: string) => {
  return new Promise( (resolve, reject) => {
    try {

      simpleParser(email, {})
        .then(async (parsed) => {
          if (parsed.attachments[0]) {
            //console.log(parsed.attachments[0].content.toString('utf8'));
            const s3Data: S3.PutObjectRequest = {
              ContentType: parsed.attachments[0].contentType,
              CacheControl: "max-age=86400",
              Bucket: process.env.SES_BUCKET_NAME,
              Key: `${parsed.attachments[0].filename}`,
              Body: parsed.attachments[0].content.toString('utf8')
            };
            await uploadtoS3(s3Data);
          }
          resolve(true);
      })
        .catch(err => {
          console.log(err);
          reject(err);
      });
     
    } catch (error) {
      console.log(error);
      reject(error)
    }
  })
}