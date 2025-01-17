import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import saveAnnotation from "./SaveAnnotation";

const useNavigationHandlers = (
  annotationList,
  initialAnnotationList,
  setInitialAnnotationList,
  user,
  name,
  setAnchorEl,
  images,
  setImageLoaded
) => {
  const history = useHistory();

  const navigateToNewImage = (index) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex > images.length - 1) {
      newIndex = 0;
    }

    history.replace(`/edit/${name}/page/${newIndex}`, {
      state: { newIndex, initialAnnotationList: initialAnnotationList },
    });
    setImageLoaded(false);
  };

  const handleImageChange = (index) => {
    if (
      JSON.stringify(annotationList) !== JSON.stringify(initialAnnotationList)
    ) {
      Swal.fire({
        title: "変更があります。保存しますか？",
        text: "保存しない場合、変更は失われます。",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "保存",
        cancelButtonText: "キャンセル",
        dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          saveAnnotation(annotationList, user, name, setAnchorEl);
          setInitialAnnotationList(annotationList);
          navigateToNewImage(index);
        }
      });
    } else {
      navigateToNewImage(index);
    }
  };

  const handleBeforeUnload = (event) => {
    if (
      JSON.stringify(annotationList) !== JSON.stringify(initialAnnotationList)
    ) {
      event.preventDefault();
      event.returnValue = "行った変更が保存されない可能性があります？";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [annotationList, initialAnnotationList]);

  return {
    handleImageChange,
  };
};

export default useNavigationHandlers;
