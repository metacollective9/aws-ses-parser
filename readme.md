# AWS SES PARSER

This is a lambda function written using serverless framework (https://www.serverless.com/). This function will do the following -

* It will receive a SNS event with details of the email it has just received. A copy of the email is placed on the S3 bucket using SES Email receving action service.


This repo uses these packages - 
* aws-sdk: AWS SDK for JavaScript
* serverless-offline: This Serverless plugin emulates AWS λ and API Gateway on your local machine to speed up your development cycles
* mailparser: To parse an email

# Install

```javascript
   npm install 
```

# Run
```javascript
   sls offline
```
# deploy

Make sure that you have AWS access and secret key with correct permission set in the environment before you run this.

```javascript
   sls deploy --stage [dev][prod] --region[any-aws-region-of-you-choice] 
```


