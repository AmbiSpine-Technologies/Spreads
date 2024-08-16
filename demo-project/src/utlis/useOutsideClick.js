import { useEffect } from "react";

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listeners for mouse down and mouse wheel
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousewheel", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousewheel", handleClickOutside);
    };
  }, [ref, callback]);
};
