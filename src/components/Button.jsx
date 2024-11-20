import React from "react";
function Button({ children, type = "button", className = "", ...props }) {
  return (
    <div className="flex items-center justify-center pt-6">
      <button
        type={type}
        className={` px-6 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold rounded-md shadow-md hover:bg-gradient-to-l hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300 ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
