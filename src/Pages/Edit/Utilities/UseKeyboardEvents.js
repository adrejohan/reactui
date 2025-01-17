import { useEffect } from "react";

const useKeyboardEvents = (callback, dependencies) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      callback(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, dependencies);
};

export default useKeyboardEvents;
