import { FC, InputHTMLAttributes } from 'react';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Switch: FC<SwitchProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      <label className="inline-flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className="w-11 h-6 bg-secondary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </div>
        {label && (
          <span className="ml-3 text-sm text-secondary-700">{label}</span>
        )}
      </label>
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
};

export default Switch; 