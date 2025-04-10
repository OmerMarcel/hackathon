import { FC } from 'react';

interface ErrorProps {
  message: string;
  className?: string;
}

const Error: FC<ErrorProps> = ({ message, className = '' }) => {
  return (
    <p className={`text-sm text-danger-600 ${className}`}>
      {message}
    </p>
  );
};

export default Error; 