import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const SelectInput = ({
  label,
  name,
  options,
  defaultValue,
  required,
  control,
  errors,
  className = "",
  onChange,
  value,
  isMulti = false,
  ...rest
}) => {
  const { isDarkMode } = useDarkMode();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      borderColor: errors ? errors[name]
        ? isDarkMode
          ? "rgb(248, 113, 113)"
          : "rgb(239, 68, 68)"
        : state.isFocused
        ? isDarkMode
          ? "rgb(113, 145, 255)"
          : "rgb(71, 112, 255)"
        : isDarkMode
        ? "rgb(75, 85, 99)"
        : "#080D58": "#080D58",
      boxShadow: state.isFocused
        ? `0 0 0 2px ${isDarkMode ? "rgb(113, 145, 255)" : "rgb(71, 112, 255)"}`
        : "none",
      "&:hover": {
        borderColor: isDarkMode ? "rgb(155, 178, 255)" : "rgb(113, 145, 255)",
      },
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? isDarkMode
          ? "rgb(113, 145, 255)"
          : "rgb(71, 112, 255)"
        : state.isFocused
        ? isDarkMode
          ? "rgb(55, 65, 81)"
          : "rgb(239, 244, 255)"
        : isDarkMode
        ? "#1f2937"
        : "white",
      color: state.isSelected
        ? "white"
        : isDarkMode
        ? "rgb(243, 244, 246)"
        : "rgb(17, 24, 39)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? "rgb(55, 65, 81)" : "rgb(229, 231, 235)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
      "&:hover": {
        backgroundColor: isDarkMode
          ? "rgb(113, 145, 255)"
          : "rgb(71, 112, 255)",
        color: "white",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
    }),
  };

  const selectProps = {
    options,
    defaultValue,
    isMulti,
    isSearchable: true,
    placeholder: `Select ${label}`,
    className: "react-select-container",
    classNamePrefix: "react-select",
    styles: customStyles,
    theme: (theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: isDarkMode ? "rgb(113, 145, 255)" : "rgb(71, 112, 255)",
        primary25: isDarkMode ? "rgb(55, 65, 81)" : "rgb(239, 244, 255)",
        neutral0: isDarkMode ? "#1f2937" : "white",
        neutral80: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
      },
    }),
    ...rest,
  };

  const renderSelect = (field) => (
    <Select
      {...selectProps}
      {...field}
      onChange={(option) => {
        field.onChange(isMulti ? option : option.value);
        if (onChange) onChange(option);
      }}
      value={options?.find((option) => option.value === field.value)}
    />
  );

  return (
    <div className={`flex flex-col w-full gap-1  ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-pry dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={required}
          render={({ field }) => renderSelect(field)}
        />
      ) : (
        renderSelect({ onChange, value, name })
      )}
      {errors && errors[name] && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
