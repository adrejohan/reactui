import React from "react";

const LabelCountsTable = ({
  labelCounts,
  currentImageIndex,
  handleLabelClick,
  selectedLabel,
  getLabelColor,
}) => {
  return (
    <div>
      {labelCounts[currentImageIndex] && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            padding: "1rem",
            marginTop: "1rem",
            fontSize: "1.2rem",
          }}
        >
          <tbody>
            {labelCounts[currentImageIndex] &&
              Object.entries(labelCounts[currentImageIndex]).map(
                ([label, count]) => (
                  <tr
                    key={`${currentImageIndex}-${label}`}
                    onClick={() => handleLabelClick(label)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        label === selectedLabel ? "#f0f0f0" : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          backgroundColor: getLabelColor(label),
                          margin: "0 auto",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {count}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LabelCountsTable;
