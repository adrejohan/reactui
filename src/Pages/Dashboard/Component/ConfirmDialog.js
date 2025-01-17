import Swal from "sweetalert2";

const confirmDialog = async (message) => {
  const { value } = await Swal.fire({
    html: `<div style="text-align: left;">${message}</div>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "はい",
    cancelButtonText: "別の名で保存する",
  });

  return value ? "replace" : "change";
};

export default confirmDialog;
