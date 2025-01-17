const countLabels = (annotationList, setLabelCounts) => {
  const labelCountsArray = annotationList.map((imageAnnotations, index) => {
    const counts = {};
    if (Array.isArray(imageAnnotations)) {
      imageAnnotations.forEach((annotation) => {
        const { label } = annotation;
        counts[label] = (counts[label] || 0) + 1;
      });
    }
    return counts;
  });

  labelCountsArray.forEach((counts, index) => {
    setLabelCounts((prevCounts) => ({
      ...prevCounts,
      [index]: counts,
    }));
  });
};

export default countLabels;
