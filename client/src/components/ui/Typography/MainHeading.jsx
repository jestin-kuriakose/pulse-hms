import React from 'react';

const MainHeading = ({ title, className = "" }) => {
  return (
    <h2 className={`
      text-2xl
      font-bold
      font-main
      text-pry
      dark:text-white
      border-b-2
      border-pry
      dark:border-sec-300
      pb-2
      mb-4
      transition-colors
      duration-300
      ${className}
    `}>
      {title}
    </h2>
  );
};

export default MainHeading;
