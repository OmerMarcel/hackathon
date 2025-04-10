import { FC } from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

const DashboardCard: FC<DashboardCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
      <div>
          <p className="text-secondary-600">{title}</p>
          <h3 className="text-2xl font-bold text-green-800">{value}</h3>
        </div>
        <div className="bg-green-50 p-3 rounded-full">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      {trend && (
        <div className="mt-4">
          <span className={`text-sm ${trendUp ? 'text-success-600' : 'text-danger-600'}`}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard; 