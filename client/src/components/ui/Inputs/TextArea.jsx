import React from "react";

const TextArea = ({
  label,
  name,
  register,
  errors,
  variant = "default",
  size = "medium",
  className = "",
  required = false,
  ...props
}) => {
  const baseStyles = "w-full font-main rounded transition-colors duration-200";
  const variants = {
    default:
      "bg-white border border-pry text-pry placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500",
    error:
      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-100 dark:placeholder-red-300",
    success:
      "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-100 dark:placeholder-green-300",
  };
  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const inputProps = register ? register(name, required) : { name, required };

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label
          className="text-sm font-semibold text-pry dark:text-gray-300"
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        aria-invalid={errors[name] ? "true" : "false"}
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

export default TextArea;
