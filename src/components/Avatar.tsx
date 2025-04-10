import { FC } from 'react';
import { FaUser } from 'react-icons/fa';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const initials = alt
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`relative ${sizeStyles[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="h-full w-full rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-600 font-medium">
            {initials || <FaUser className="h-1/2 w-1/2" />}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatar; 