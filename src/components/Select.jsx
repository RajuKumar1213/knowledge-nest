import React, { forwardRef, useId } from 'react';

const Select = forwardRef(
  (
    {
      control,
      label,
      name,
      defaultValue = "",
      options,
      className = "",
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          name={name}
          defaultValue={defaultValue}
          className={`w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 ${className}`}
          {...props}
        >
          {options?.map((option) => (
            <option
              value={option}
              key={option}
              className="bg-gray-800 text-gray-200"
            >
              {option}
            </option>
          ))}
        </select>
      </>
    );
  }
);

export default Select;
