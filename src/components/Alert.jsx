import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../store/alertSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { isVisible, message, type } = useSelector((state) => state.alert);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 3000); // Alert will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const alertColors = {
    success: "border-green-500",
    error: "border-red-500",
    info: "border-blue-500",
    warning: "border-yellow-500",
  };

  return (
    <div
      className={`h-12 md:h-12 md:fixed md:top-16 md:right-0 max-w-sm min-w-full sm:max-w-xs p-4 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out bg-gray-900 text-white flex items-center z-50 border-2 ${alertColors[type]} ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <p className="text-sm sm:text-base flex-1">{message}</p>
    </div>
  );
};

export default Alert;
