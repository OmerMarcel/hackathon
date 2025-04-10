import { FC, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2 rounded-lg border
          ${error
            ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500'
            : 'border-secondary-200 focus:ring-primary-500 focus:border-primary-500'
          }
          focus:outline-none focus:ring-2
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={`text-sm ${error ? 'text-danger-600' : 'text-secondary-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select; 