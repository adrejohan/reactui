import AWS from "aws-sdk";
import dynamoDb from "../../../Utilities/awsConfig";

const s3 = new AWS.S3();

const uploadToS3 = async (
  file,
  fileName,
  userID,
  finalFileName,
  refreshUploadedFiles
) => {
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const uploadDateTime = now.toISOString().slice(0, 16).replace("T", " ");

  const beforeItem = {
    userID: userID,
    fileName: finalFileName,
    imagesUrl: [],
    annotationList: [],
    uploadDateTime: uploadDateTime,
    status: "アップロード中",
  };

  const firstDynamoParams = {
    TableName: "upload-database",
    Item: beforeItem,
  };

  try {
    await dynamoDb.put(firstDynamoParams).promise();
    refreshUploadedFiles();
  } catch (err) {
    console.error("Error putting item into DynamoDB:", err);
    return;
  }

  const s3Params = {
    Bucket: "user-pdf-storage",
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  let s3UploadData;
  try {
    s3UploadData = await s3.upload(s3Params).promise();
  } catch (s3Err) {
    console.error("Error uploading file to S3:", s3Err);
    return;
  }

  return s3UploadData;
};

export default uploadToS3;
