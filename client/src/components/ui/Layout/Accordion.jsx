import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const Accordion = ({ 
  title, 
  isOpenByDefault = false, 
  children, 
  className = '', 
  titleClassName = '',
  contentClassName = '',
  iconClassName = '',
  disabled = false,
  onToggle = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onToggle(!isOpen);
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden dark:border-gray-700 ${className}`}>
      <div 
        className={`bg-gray-100 dark:bg-gray-800 p-3 flex justify-between items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${titleClassName}`}
        onClick={handleToggle}
      >
        <h5 className="font-semibold dark:text-white">{title}</h5>
        {isOpen ? (
          <ChevronUpIcon className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${iconClassName}`} />
        ) : (
          <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${iconClassName}`} />
        )}
      </div>
      {isOpen && (
        <div className={`p-4 dark:bg-gray-900 dark:text-white ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
