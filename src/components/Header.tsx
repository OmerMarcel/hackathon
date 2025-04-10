import { FC } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';

interface HeaderProps {
  userName: string;
  notifications?: number;
}

const Header: FC<HeaderProps> = ({ userName, notifications = 0 }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-semibold text-primary-900">Tableau de bord</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-secondary-600 hover:text-primary-600 focus:outline-none">
                <FaBell className="text-xl" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-danger-600 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <FaUser className="text-primary-600" />
              </div>
              <span className="text-secondary-700">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 