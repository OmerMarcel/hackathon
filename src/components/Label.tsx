import { FC, ReactNode } from 'react';

interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = '',
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-secondary-700 ${className}`}
    >
      {children}
      {required && <span className="text-danger-600 ml-1">*</span>}
    </label>
  );
};

export default Label; 