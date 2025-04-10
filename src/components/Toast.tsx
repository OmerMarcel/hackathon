import { FC, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

interface ToastProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
  duration?: number;
  className?: string;
}

const Toast: FC<ToastProps> = ({
  type = 'info',
  message,
  onClose,
  duration = 3000,
  className = '',
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      container: 'bg-success-50',
      icon: <FaCheckCircle className="h-5 w-5 text-success-400" />,
      text: 'text-success-800',
    },
    error: {
      container: 'bg-danger-50',
      icon: <FaTimesCircle className="h-5 w-5 text-danger-400" />,
      text: 'text-danger-800',
    },
    info: {
      container: 'bg-primary-50',
      icon: <FaInfoCircle className="h-5 w-5 text-primary-400" />,
      text: 'text-primary-800',
    },
    warning: {
      container: 'bg-warning-50',
      icon: <FaExclamationCircle className="h-5 w-5 text-warning-400" />,
      text: 'text-warning-800',
    },
  };

  return (
    <div
      className={`max-w-sm w-full ${styles[type].container} shadow-lg rounded-lg pointer-events-auto ${className}`}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{styles[type].icon}</div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${styles[type].text}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-secondary-400 hover:text-secondary-500 focus:outline-none"
              onClick={onClose}
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast; 