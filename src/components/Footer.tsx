import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-white border-t border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-secondary-600">
            © 2024 AI4CKD. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-secondary-600 hover:text-primary-600">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-secondary-600 hover:text-primary-600">
              Politique de confidentialité
            </a>
            <a href="#" className="text-secondary-600 hover:text-primary-600">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 