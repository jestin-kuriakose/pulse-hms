import React from "react";

const DateInput = ({
  label,
  register,
  errors,
  name,
  required,
  className = "",
  onChange,
  value,
  ...rest
}) => {
  const baseStyles = "w-full font-main rounded transition-colors duration-200";
  const inputStyles = `${baseStyles} p-2 block border 
    ${
      errors && errors[name]
        ? "border-red-500 text-red-900 dark:border-red-700 dark:text-red-100"
        : "border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-200"
    }
    bg-white dark:bg-gray-800 
    focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
    ${className}`;

  const inputProps = register
    ? register(name, { required })
    : { name, onChange, value, required };

  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        id={name}
        className={inputStyles}
        aria-invalid={errors && errors[name] ? "true" : "false"}
        {...inputProps}
        {...rest}
      />
      {errors && errors[name] && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default DateInput;
