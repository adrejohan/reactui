import axios from "axios";
import Swal from "sweetalert2";
import { getUser } from "../../../Auth/AuthService";
import uploadToS3 from "./UploadToS3";
import confirmDialog from "../Component/ConfirmDialog";

const uploadAPIUrl = "UPLOAD API URL HERE";
const processAPIUrl = "PROCESS API URL HERE";

const uploadFiles = async (files, uploadedFiles, refreshUploadedFiles) => {
  const user = getUser();

  const droppedFiles = Array.from(files);
  console.log("Dropped files:", droppedFiles);

  try {
    const requestConfig = {
      headers: {
        "x-api-key": "API KEY HERE",
      },
    };

    if (droppedFiles.length > 5) {
      await Swal.fire({
        icon: "error",
        text: "アップロードで最大5ファイルまで！！！",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: "#5270ff",
      });
      return;
    }

    for (const file of droppedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        await Swal.fire({
          icon: "error",
          text: `ファイル '${file.name}' は10MBを超えています。アップロードできません。`,
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: "#5270ff",
        });
        continue;
      }

      const action = await confirmFile(file, uploadedFiles);

      if (action === "replace") {
        await uploadAndProcessFile(
          file,
          user,
          refreshUploadedFiles,
          requestConfig
        );
      } else if (action === "change") {
        await handleRename(file, user, refreshUploadedFiles, requestConfig);
      }
    }
  } catch (err) {
    console.error("Error uploading files:", err);
    await Swal.fire({
      icon: "error",
      text: "ファイルをアップロードする際にエラーが発生しました。",
      timer: 3000,
      timerProgressBar: true,
      confirmButtonColor: "#5270ff",
    });
  }
};

const confirmFile = async (file, uploadedFiles) => {
  const user = getUser();
  const fileExists = uploadedFiles.some(
    (uploadedFile) => uploadedFile.fileName === file.name
  );
  if (fileExists) {
    return await confirmDialog(
      `'${file.name}'ファイルはもう既にデータベース保存しています、 上書きしますか?`
    );
  } else {
    return "replace";
  }
};

const uploadAndProcessFile = async (
  file,
  user,
  refreshUploadedFiles,
  requestConfig
) => {
  await uploadToS3(
    file,
    user.userID + "_" + file.name,
    user.userID,
    file.name,
    refreshUploadedFiles
  );
  const requestData = {
    userID: user.userID,
    fileName: file.name,
    type: file.type,
    s3ObjectUrl: user.userID + "_" + file.name,
  };
  const response = await axios.post(uploadAPIUrl, requestData, requestConfig);
  console.log("File uploaded:", requestData);
  refreshUploadedFiles();
  const processResponse = await axios.post(
    processAPIUrl,
    response.data,
    requestConfig
  );
  refreshUploadedFiles();
};

const handleRename = async (
  file,
  user,
  refreshUploadedFiles,
  requestConfig
) => {
  const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
  let newNameConfirmed = false;
  while (!newNameConfirmed) {
    const { value: newFileName, dismiss } = await Swal.fire({
      title: "新しいファイル名を入力してください",
      input: "text",
      inputValue: fileNameWithoutExtension,
      inputValidator: (value) => {
        if (!value.trim()) {
          return "ファイル名を入力してください！！！";
        }
      },
      showCancelButton: true,
      confirmButtonText: "保存",
      cancelButtonText: "キャンセル",
    });
    if (dismiss === Swal.DismissReason.cancel) {
      break;
    }
    const newFileNamewithExte = newFileName + ".pdf";
    if (newFileName === null) {
      break;
    } else {
      newNameConfirmed = true;
      await uploadToS3(
        file,
        user.userID + "_" + newFileNamewithExte,
        user.userID,
        newFileNamewithExte,
        refreshUploadedFiles
      );
      const requestData = {
        userID: user.userID,
        fileName: newFileNamewithExte,
        type: file.type,
        s3ObjectUrl: user.userID + "_" + newFileNamewithExte,
      };
      const response = await axios.post(
        uploadAPIUrl,
        requestData,
        requestConfig
      );
      console.log("File uploaded:", requestData);
      refreshUploadedFiles();
      const processResponse = await axios.post(
        processAPIUrl,
        response.data,
        requestConfig
      );
      refreshUploadedFiles();
    }
  }
};

export default uploadFiles;
