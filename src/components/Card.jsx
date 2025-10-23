import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
