import React from 'react';

const LoadingScreen = ({ message = 'Loading...', size = 'medium' }) => {
  const spinnerSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 z-50">
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${spinnerSizes[size]}`} role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
