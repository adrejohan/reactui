import { useState, useEffect } from "react";
import fetchData from "./fetchDataImages";

const useFetchData = (userID, name) => {
  const [annotationList, setAnnotationList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchDataFromDynamoDB = async () => {
      try {
        const data = await fetchData(userID, name);
        setAnnotationList(data.annotationList);
        setImages(data.imagesUrl);
      } catch (error) {
        console.error("Error fetching data from DynamoDB:", error);
      }
    };

    fetchDataFromDynamoDB();
  }, [userID, name]);

  return { annotationList, images };
};

export default useFetchData;
