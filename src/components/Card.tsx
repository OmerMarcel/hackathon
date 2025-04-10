import { FC, ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-primary-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card; 