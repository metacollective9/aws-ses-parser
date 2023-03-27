import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-ses-parser',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SES_BUCKET_NAME: 'mails-urls-cz'
    },
  },
  functions: {
    parseMail: {
      handler: 'handler.parseMail',
      events: [
        {
          http: {
            method: 'get',
            path: 'parseMail',
          }
        }
      ]
    },
    send: {
      handler: 'handler.send',
      events: [
        {
          http: {
            method: 'post',
            path: 'send',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
