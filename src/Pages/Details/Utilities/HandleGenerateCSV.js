const generateCSV = (images, labelCounts) => {
  let csvContent = "";

  images.forEach((imageUrl, index) => {
    const imageLabelCounts = labelCounts[index] || {};
    csvContent += `Page ${index + 1}\nLabel,Count\n`;

    Object.entries(imageLabelCounts).forEach(([label, count]) => {
      csvContent += `${label},${count}\n`;
    });

    csvContent += "\n";
  });

  return csvContent;
};

const handleExportToCSV = (images, labelCounts, name) => {
  const nameWithoutExtension = name.replace(/\.[^/.]+$/, "");
  const csvContent = generateCSV(images, labelCounts);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const fileName = `${nameWithoutExtension}_results.csv`;
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export { generateCSV, handleExportToCSV };
