import { useEffect, useState } from "react";

const useMouseFunctions = (initialScale) => {
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(initialScale); // Added scale state

  const handleMouseDown = (event) => {
    setDragging(true);
    setDragStart({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  };

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

  const handleWheelZoom = (event) => {
    event.preventDefault();
    const newScale = scale + (event.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(newScale, 0.5), 5));
  };

  useEffect(() => {
    const handleMouseOut = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseout", handleMouseOut);
    document.body.addEventListener("wheel", handleWheelZoom); // Added wheel event listener

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("wheel", handleWheelZoom); // Clean up wheel event listener
    };
  }, [dragging, scale]); // Added scale as a dependency

  useEffect(() => {
    if (dragging) {
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.cursor = "grab";
    }
  }, [dragging]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    dragging,
    dragOffset,
    scale, // Expose scale state
    setScale, // Expose setScale function
  };
};

export default useMouseFunctions;
