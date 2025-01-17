import dynamoDb from "../../../Utilities/awsConfig";
import Swal from "sweetalert2";

const saveAnnotation = async (annotationList, user, name, setAnchorEl) => {
  setAnchorEl(null);
  const newAnnotationList = annotationList;
  const params = {
    TableName: "upload-database",
    Key: {
      userID: user.userID,
      fileName: name,
    },
    UpdateExpression: "set annotationList = :annotationList",
    ExpressionAttributeValues: {
      ":annotationList": newAnnotationList,
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    await dynamoDb.update(params).promise();

    Swal.fire({
      icon: "success",
      title: "保存しました",
      text: "アノテーションが正常に保存されました。",
      timer: 3000,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "保存に失敗しました",
      text: "アノテーションの保存中にエラーが発生しました。再試行してください。",
      timer: 3000,
    });
  }
};

export default saveAnnotation;
