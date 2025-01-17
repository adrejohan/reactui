import "./EditStyle.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useFetchData from "../../Utilities/useFetchDataImages";
import { getUser } from "../../Auth/AuthService";
import saveAnnotation from "./Utilities/SaveAnnotation";
import countLabels from "../../Utilities/HandleCountLabel";
import keyboardEventHandler from "./Utilities/KeyboardHandler";
import useKeyboardEvents from "./Utilities/UseKeyboardEvents";
import bboxColor from "../../Utilities/BboxColor";
import EditContainer from "./Component/EditContainer";
import useNavigationHandlers from "./Utilities/NavigationEdit";

const EditDetail = () => {
  const { name, currentImageIndex } = useParams();
  const user = getUser();
  const location = useLocation();
  const userID = user.userID;

  const { annotationList: fetchedAnnotationList, images } = useFetchData(
    userID,
    name
  );

  const [initialAnnotationList, setInitialAnnotationList] = useState(
    location.state?.state.initialAnnotationList || []
  );
  const [annotationList, setAnnotationList] = useState([]);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [scale, setScale] = useState(1);
  const [labelCounts, setLabelCounts] = useState({});
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const { handleImageChange } = useNavigationHandlers(
    annotationList,
    initialAnnotationList,
    setInitialAnnotationList,
    user,
    name,
    setAnchorEl,
    images,
    setImageLoaded
  );

  useEffect(() => {
    setAnnotationList(fetchedAnnotationList);
    if (location.state?.initialAnnotationList) {
      setInitialAnnotationList(location.state.initialAnnotationList);
    } else if (!initialAnnotationList.length) {
      const copiedList = JSON.parse(JSON.stringify(fetchedAnnotationList));
      setInitialAnnotationList(copiedList);
    }
  }, [fetchedAnnotationList, initialAnnotationList.length, location.state]);

  useEffect(() => {
    countLabels(annotationList, setLabelCounts);
  }, [annotationList, setLabelCounts]);

  useEffect(() => {
    countLabels(annotationList, setLabelCounts);
  }, [annotationList, setLabelCounts]);

  useEffect(() => {
    if (imageLoaded) {
      drawInitialAnnotations();
    }
  }, [selectedBox, currentImageIndex, scale, imageLoaded]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragging) {
        const offsetX = event.clientX - dragStart.x;
        const offsetY = event.clientY - dragStart.y;
        setDragOffset({ x: offsetX, y: offsetY });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    const handleMouseOut = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [dragging, dragStart]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.cursor = dragging ? "grabbing" : "grab";
    }
  }, [dragging]);

  const getLabelColor = (label) => bboxColor[label] || "red";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleWheelZoom = (event) => {
      event.preventDefault();
      const newScale = scale + (event.deltaY > 0 ? -0.1 : 0.1);
      setScale(Math.min(Math.max(newScale, 0.5), 5));
    };

    document.body.addEventListener("wheel", handleWheelZoom);

    return () => {
      document.body.removeEventListener("wheel", handleWheelZoom);
    };
  }, [scale]);

  const handleSliderChange = (event, newValue) => {
    setScale(newValue / 100);
  };

  const handleMouseDown = (e) => {
    if (selectedLabel) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      setStartX(x);
      setStartY(y);
      setIsDrawing(true);
    } else {
      setDragging(true);
      setDragStart({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitialAnnotations();
      context.strokeStyle = getLabelColor(selectedLabel);
      context.strokeRect(startX, startY, x - startX, y - startY);
    }
  };

  const handleMouseUp = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const img = imageRef.current;
      const scaleX = img.clientWidth / img.naturalWidth;
      const scaleY = img.clientHeight / img.naturalHeight;

      const startXAdjusted = startX / scaleX;
      const startYAdjusted = startY / scaleY;
      const mouseXAdjusted = (e.clientX - rect.left) / scale / scaleX;
      const mouseYAdjusted = (e.clientY - rect.top) / scale / scaleY;

      const xmin = Math.min(startXAdjusted, mouseXAdjusted);
      const ymin = Math.min(startYAdjusted, mouseYAdjusted);
      const xmax = Math.max(startXAdjusted, mouseXAdjusted);
      const ymax = Math.max(startYAdjusted, mouseYAdjusted);

      const newAnnotation = {
        xmin: xmin,
        ymin: ymin,
        xmax: xmax,
        ymax: ymax,
        conf: "100%",
        label: selectedLabel,
        id:
          annotationList[currentImageIndex].length > 0
            ? annotationList[currentImageIndex][
                annotationList[currentImageIndex].length - 1
              ].id + 1
            : 1,
      };
      const updatedAnnotationList = [...annotationList];
      updatedAnnotationList[currentImageIndex].push(newAnnotation);
      setAnnotationList(updatedAnnotationList);
    }

    setIsDrawing(false);
    setDragging(false);
  };

  const handleLabelClick = (label) => {
    if (selectedLabel === label) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(label);
    }
  };

  const drawInitialAnnotations = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const annotations = annotationList[currentImageIndex];
    const img = imageRef.current;

    if (annotations && img) {
      const scaleX = img.clientWidth / img.naturalWidth;
      const scaleY = img.clientHeight / img.naturalHeight;

      annotations.forEach((annotation, annotationIndex) => {
        const { xmin, ymin, xmax, ymax, label } = annotation;
        context.strokeStyle = getLabelColor(label);
        context.lineWidth = 2;
        context.strokeRect(
          xmin * scaleX,
          ymin * scaleY,
          (xmax - xmin) * scaleX,
          (ymax - ymin) * scaleY
        );
        if (annotation === selectedBox) {
          const cornerSize = 4;
          context.fillStyle = "black";

          const cornerXmin = xmin * scaleX - cornerSize / 2;
          const cornerXmax = xmax * scaleX - cornerSize / 2;
          const cornerYmin = ymin * scaleY - cornerSize / 2;
          const cornerYmax = ymax * scaleY - cornerSize / 2;

          context.fillRect(cornerXmin, cornerYmin, cornerSize, cornerSize);
          context.fillRect(cornerXmax, cornerYmin, cornerSize, cornerSize);
          context.fillRect(cornerXmin, cornerYmax, cornerSize, cornerSize);
          context.fillRect(cornerXmax, cornerYmax, cornerSize, cornerSize);
        }
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleCanvasClick = (e) => {
      const annotations = annotationList[currentImageIndex];
      const img = imageRef.current;

      if (annotations && img) {
        const scaleX = img.clientWidth / img.naturalWidth;
        const scaleY = img.clientHeight / img.naturalHeight;

        annotations.forEach((annotation) => {
          const { xmin, ymin, xmax, ymax, label } = annotation;

          const rect = canvas.getBoundingClientRect();
          const x = (e.clientX - rect.left) / scale;
          const y = (e.clientY - rect.top) / scale;

          if (
            x >= xmin * scaleX &&
            x <= xmax * scaleX &&
            y >= ymin * scaleY &&
            y <= ymax * scaleY
          ) {
            setSelectedBox(annotation);
          }
        });

        drawInitialAnnotations();
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [annotationList, currentImageIndex, scale, imageLoaded, selectedLabel]);

  useKeyboardEvents(
    (event) => {
      keyboardEventHandler(event, {
        selectedLabel,
        setSelectedLabel,
        selectedBox,
        setSelectedBox,
        canvasRef,
        annotationList,
        currentImageIndex,
        setAnnotationList,
        drawInitialAnnotations,
      });
    },
    [
      selectedLabel,
      selectedBox,
      annotationList,
      currentImageIndex,
      setAnnotationList,
    ]
  );

  const handleSave = () => {
    saveAnnotation(annotationList, user, name, setAnchorEl);
    setInitialAnnotationList(annotationList);
  };

  return (
    <div className="edit-container">
      <EditContainer
        annotationList={annotationList}
        initialAnnotationList={initialAnnotationList}
        name={name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleSave={handleSave}
        labelCounts={labelCounts}
        currentImageIndex={currentImageIndex}
        handleLabelClick={handleLabelClick}
        selectedLabel={selectedLabel}
        getLabelColor={getLabelColor}
        images={images}
        handleImageChange={handleImageChange}
        dragOffset={dragOffset}
        imageRef={imageRef}
        canvasRef={canvasRef}
        scale={scale}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleSliderChange={handleSliderChange}
      />
    </div>
  );
};

export default EditDetail;
