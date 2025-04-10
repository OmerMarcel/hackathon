import { FC } from 'react';

interface HelperTextProps {
  text: string;
  error?: boolean;
  className?: string;
}

const HelperText: FC<HelperTextProps> = ({
  text,
  error = false,
  className = '',
}) => {
  return (
    <p
      className={`text-sm ${
        error ? 'text-danger-600' : 'text-secondary-500'
      } ${className}`}
    >
      {text}
    </p>
  );
};

export default HelperText; 