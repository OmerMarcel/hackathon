import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
  underline?: boolean;
  className?: string;
}

const Link: FC<LinkProps> = ({
  to,
  children,
  color = 'primary',
  underline = true,
  className = '',
}) => {
  const colorStyles = {
    primary: 'text-primary-600 hover:text-primary-700',
    secondary: 'text-secondary-600 hover:text-secondary-700',
    success: 'text-success-600 hover:text-success-700',
    warning: 'text-warning-600 hover:text-warning-700',
    danger: 'text-danger-600 hover:text-danger-700',
    white: 'text-white hover:text-white/80',
  };

  return (
    <RouterLink
      to={to}
      className={`${colorStyles[color]} ${underline ? 'underline' : ''} ${className}`}
    >
      {children}
    </RouterLink>
  );
};

export default Link; 