import React, { useMemo } from "react";
import InputMask from "react-input-mask";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { countries } from "../../../features/Registration/data/countries";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const PhoneNumberInput = ({
  label,
  name,
  control,
  errors,
  required,
  className = "",
  onChange,
  value,
  ...rest
}) => {
  const { isDarkMode } = useDarkMode();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      borderColor:
        errors && errors[name]
          ? isDarkMode
            ? "rgb(248, 113, 113)"
            : "rgb(239, 68, 68)"
          : state.isFocused
          ? isDarkMode
            ? "rgb(113, 145, 255)"
            : "rgb(71, 112, 255)"
          : isDarkMode
          ? "rgb(75, 85, 99)"
          : "#080D58",
      boxShadow: state.isFocused
        ? `0 0 0 2px ${isDarkMode ? "rgb(113, 145, 255)" : "rgb(71, 112, 255)"}`
        : "none",
      "&:hover": {
        borderColor: isDarkMode ? "rgb(155, 178, 255)" : "rgb(113, 145, 255)",
      },
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
      minHeight: "38px",
      height: "38px",
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
    input: (provided) => ({
      ...provided,
      color: isDarkMode ? "rgb(243, 244, 246)" : "rgb(17, 24, 39)",
      margin: "0px",
      borderColor: "#080D58",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "38px",
      padding: "0 6px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "38px",
    }),
  };

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: country.dial_code,
        label: `${country.dial_code}`,
      })),
    []
  );

  const defaultCountryIndex = useMemo(
    () => countryOptions.findIndex((option) => option.value === "+971"),
    [countryOptions]
  );
  console.log(defaultCountryIndex);
  const renderPhoneInput = (field) => (
    <InputMask
      {...field}
      mask="99-999-9999"
      placeholder="52-123-4567"
      className={`w-full p-2 rounded-md border ${
        errors && errors[name]
          ? "border-red-500 text-red-900 placeholder-red-700 dark:border-red-700 dark:text-red-100 dark:placeholder-red-300"
          : "border-gray-300 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500"
      } bg-white border-pry dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      style={{
        height: "38px",
      }}
      {...rest}
    />
  );

  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-pry dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex mt-1">
        <div className="w-1/4">
          {control ? (
            <Controller
              name="countryCode"
              control={control}
              // defaultValue={countryOptions[defaultCountryIndex]}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countryOptions}
                  styles={customStyles}
                  isSearchable={false}
                />
              )}
            />
          ) : (
            <Select
              options={countryOptions}
              styles={customStyles}
              isSearchable={false}
              onChange={(option) =>
                onChange && onChange({ countryCode: option })
              }
              value={value && value.countryCode}
              defaultValue={countryOptions[defaultCountryIndex]}
            />
          )}
        </div>
        <div className="w-3/4">
          {control ? (
            <Controller
              name={name}
              control={control}
              rules={required}
              render={({ field }) => renderPhoneInput(field)}
            />
          ) : (
            renderPhoneInput({
              onChange: (e) => onChange && onChange({ [name]: e.target.value }),
              value: value && value[name],
            })
          )}
        </div>
      </div>
      {errors && errors[name] && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
