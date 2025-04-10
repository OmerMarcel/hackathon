import { FC } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium rounded-md
          ${
            currentPage === 1
              ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
              : 'bg-white text-secondary-700 hover:bg-secondary-50'
          }
        `}
      >
        <FaChevronLeft className="mr-2" />
        Précédent
      </button>

      <div className="hidden md:flex-1 md:flex md:items-center md:justify-center">
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  relative inline-flex items-center px-4 py-2 border text-sm font-medium
                  ${
                    currentPage === page
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-secondary-300 text-secondary-500 hover:bg-secondary-50'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium rounded-md
          ${
            currentPage === totalPages
              ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
              : 'bg-white text-secondary-700 hover:bg-secondary-50'
          }
        `}
      >
        Suivant
        <FaChevronRight className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination; 