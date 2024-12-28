import React from "react";
import ButtonSpinner from "../Feedback/ButtonSpinner";

const Button = ({
  children,
  isLoading,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseStyles = "font-main font-medium rounded transition duration-300";
  const variants = {
    primary:
      "bg-pry text-white hover:bg-pry-light dark:bg-sec-500 dark:hover:bg-sec-600",
    secondary:
      "bg-sec-200 text-pry hover:bg-sec-300 dark:bg-sec-700 dark:text-white dark:hover:bg-sec-800",
    outline:
      "bg-transparent border border-pry text-pry hover:bg-pry hover:text-white dark:border-sec-300 dark:text-sec-300 dark:hover:bg-sec-700 dark:hover:text-white",
    accent:
      "bg-accent text-pry hover:bg-accent-light dark:bg-accent-dark dark:text-white dark:hover:bg-accent",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ButtonSpinner /> : children}
    </button>
  );
};

export default Button;
