import bboxColor from "../../../Utilities/BboxColor";

const loadAnnotatedImages = async (
  images,
  annotationList,
  selectedLabel,
  setAnnotatedImages
) => {
  const annotatedImagesPromises = images.map(async (imageUrl, index) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = imageUrl;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const annotations = annotationList[index];
        annotations.forEach((annotation) => {
          if (!selectedLabel || annotation.label === selectedLabel) {
            const { xmin, ymin, xmax, ymax } = annotation;
            const x = xmin * (canvas.width / image.width);
            const y = ymin * (canvas.height / image.height);
            const width = (xmax - xmin) * (canvas.width / image.width);
            const height = (ymax - ymin) * (canvas.height / image.height);
            const color = bboxColor[annotation.label] || "red";
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            ctx.strokeRect(x, y, width, height);
          }
        });

        resolve(canvas.toDataURL("image/jpeg"));
      };

      image.onerror = () => {
        resolve("");
      };
    });
  });

  const annotatedImagesUrls = await Promise.all(annotatedImagesPromises);
  setAnnotatedImages(annotatedImagesUrls.filter((url) => url !== ""));
};

export default loadAnnotatedImages;
