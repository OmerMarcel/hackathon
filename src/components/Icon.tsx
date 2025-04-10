import { FC } from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
  className?: string;
}

const Icon: FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorStyles = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    danger: 'text-danger-600',
    white: 'text-white',
  };

  return (
    <IconComponent
      className={`${sizeStyles[size]} ${colorStyles[color]} ${className}`}
    />
  );
};

export default Icon; 