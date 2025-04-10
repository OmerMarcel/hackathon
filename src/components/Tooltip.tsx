import { FC, ReactNode, useState } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 translate-y-2',
    left: 'right-0 top-1/2 transform -translate-y-1/2 -translate-x-2',
    right: 'left-0 top-1/2 transform -translate-y-1/2 translate-x-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`
            absolute z-10 px-3 py-2 text-sm text-white bg-secondary-900 rounded-lg shadow-lg
            ${positionStyles[position]}
            ${className}
          `}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip; 