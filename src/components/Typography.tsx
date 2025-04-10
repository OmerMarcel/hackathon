import { FC, ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
}

const Typography: FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'primary',
  align = 'left',
  className = '',
}) => {
  const variantStyles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    body1: 'text-base',
    body2: 'text-sm',
    caption: 'text-xs',
  };

  const colorStyles = {
    primary: 'text-primary-900',
    secondary: 'text-secondary-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    danger: 'text-danger-600',
    white: 'text-white',
  };

  return (
    <div
      className={`${variantStyles[variant]} ${colorStyles[color]} text-${align} ${className}`}
    >
      {children}
    </div>
  );
};

export default Typography; 