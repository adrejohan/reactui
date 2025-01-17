import jsPDF from "jspdf";

const handleSaveAsPDF = (annotatedImages, name) => {
  const pdf = new jsPDF();

  const loadImages = annotatedImages.map((imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => resolve(img);
    });
  });

  Promise.all(loadImages).then((loadedImages) => {
    loadedImages.forEach((image, index) => {
      const imgWidth = image.width;
      const imgHeight = image.height;

      const a4Width = 595;
      const a4Height = 842;

      let scale = Math.min(a4Width / imgWidth, a4Height / imgHeight);
      let width = imgWidth * scale;
      let height = imgHeight * scale;

      let orientation = width > height ? "l" : "p";

      pdf.setPage(index + 1);
      pdf.internal.pageSize.width = width;
      pdf.internal.pageSize.height = height;

      pdf.addImage(image.src, "JPEG", 0, 0, width, height);

      if (index < loadedImages.length - 1) {
        pdf.addPage();
      }
    });

    pdf.save(`${name}`);
  });
};

export default handleSaveAsPDF;
