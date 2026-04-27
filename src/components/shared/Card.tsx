import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
      {title && <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 dark:border-gray-700">{title}</h2>}
      {children}
    </div>
  );
};
