import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, placeholder, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md ${className}`}
        {...props}
      />
    </>
  );
});

export default Input;
