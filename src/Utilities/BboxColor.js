const bboxColor = {
  human_sensor: "#FF5733", // Orange
  r_circuit_1: "#33FF57", // Green
  r_circuit_2: "#3366FF", // Blue
  r_circuit_3: "#FF33FF", // Pink
  r_circuit_k1: "#FF3333", // Red
  r_circuit_k2: "#33FFFF", // Cyan
  r_circuit_k3: "#8A2BE2", // BlueViolet
  rg_circuit_1: "#9932CC", // DarkOrchid
  rg_circuit_2: "#FFD700", // Gold
  rg_circuit_k1: "#FF69B4", // HotPink
  rg_circuit_k2: "#33FF99", // Teal
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getClassColor = (className) => {
  if (!bboxColor[className]) {
    bboxColor[className] = generateRandomColor();
  }
  return bboxColor[className];
};

export default bboxColor;
