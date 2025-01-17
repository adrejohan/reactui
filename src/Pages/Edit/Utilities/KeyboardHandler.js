const keyboardEventHandler = (
  event,
  {
    selectedLabel,
    setSelectedLabel,
    selectedBox,
    setSelectedBox,
    canvasRef,
    annotationList,
    currentImageIndex,
    setAnnotationList,
    drawInitialAnnotations,
  }
) => {
  if (event.key === "Escape") {
    if (selectedLabel !== null) {
      setSelectedLabel(null);
    }
    if (selectedBox !== null) {
      console.log(selectedBox);
      setSelectedBox(null);
      console.log(selectedBox);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitialAnnotations();
    }
  } else if (event.key === "Delete" && selectedBox) {
    const updatedAnnotationList = [...annotationList];
    const index = updatedAnnotationList[currentImageIndex].findIndex(
      (annotation) => annotation === selectedBox
    );
    if (index !== -1) {
      updatedAnnotationList[currentImageIndex].splice(index, 1);
      setAnnotationList(updatedAnnotationList);
      setSelectedBox(null);
    }
  }
};

export default keyboardEventHandler;
