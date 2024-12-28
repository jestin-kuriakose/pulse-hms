import React from "react";

const TextInput = ({
  label,
  errors,
  variant = "default",
  className = "",
  name,
  register,
  required = false,
  onChange,
  value,
  ...props
}) => {
  const baseStyles =
    "border py-2 px-3 rounded text-sm w-full font-main transition-colors duration-200";
  const variants = {
    default:
      "bg-white border-pry text-pry placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500",
    error:
      "border-red-500 text-red-900 placeholder-red-700 dark:bg-gray-800 dark:border-red-700 dark:text-red-100 dark:placeholder-red-300",
    success:
      "bg-green-50 border-green-500 text-green-900 placeholder-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-100 dark:placeholder-green-300",
  };

  const inputProps = register
    ? register(name, required )
    : { name, onChange, value, required };

  return (
    <div className={`flex flex-col w-full gap-1`}>
      {label && (
        <label className="text-sm font-semibold text-pry dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`${baseStyles} ${
          variants[errors && errors[name] ? "error" : variant || variant]
        } ${className}`}
        aria-invalid={errors && errors[name] ? "true" : "false"}
        {...inputProps}
        {...props}
      />
      {errors && errors[name] && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
