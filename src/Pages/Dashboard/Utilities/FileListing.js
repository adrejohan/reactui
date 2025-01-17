import axios from "axios";

const loadAPIUrl = "LOAD API URL HERE";

const fetchUploadedFiles = async (userID) => {
  try {
    const requestConfig = {
      headers: {
        "x-api-key": "API KEY HERE",
      },
    };
    const requestData = {
      userID: userID,
    };
    const response = await axios.post(loadAPIUrl, requestData, requestConfig);
    return response.data.files;
  } catch (error) {
    console.error("Error fetching uploaded files:", error);
    return [];
  }
};

export default fetchUploadedFiles;
