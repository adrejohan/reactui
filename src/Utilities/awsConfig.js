import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "ACCESSKEY",
  secretAccessKey: "SECRETACCESSKEY",
  region: "ap-northeast-1",
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default dynamoDb;
