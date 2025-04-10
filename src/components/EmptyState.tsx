import { FC, ReactNode } from 'react';
import { FaInbox } from 'react-icons/fa';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  icon = <FaInbox className="h-12 w-12 text-secondary-400" />,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-2 text-sm font-medium text-primary-900">{title}</h3>
      <p className="mt-1 text-sm text-secondary-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

 