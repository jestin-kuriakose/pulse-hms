import React from 'react';

const RadioGroup = ({ name, options, value, onChange, label, error, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default RadioGroup;
