import dynamoDb from "./awsConfig";

const fetchData = async (userID, fileName) => {
  const params = {
    TableName: "upload-database",
    Key: {
      userID: userID,
      fileName: fileName,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    throw new Error(error);
  }
};

export default fetchData;
