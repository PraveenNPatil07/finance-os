import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-muted">
        Showing <span className="font-medium text-primary">{startItem}-{endItem}</span> of <span className="font-medium text-primary">{totalItems}</span> results
      </div>
      
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:bg-surface2 hover:text-primary disabled:opacity-50 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="hidden sm:flex items-center gap-1.5">
          {getPages().map((page, i) => (
            page === '...' ? (
              <span key={`ellipsis-${i}`} className="w-9 text-center text-sm text-muted">...</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg
                  ${currentPage === page 
                    ? 'bg-brand text-white shadow-[0_2px_8px_rgba(124,58,237,0.4)]' 
                    : 'text-muted hover:bg-surface2 hover:text-primary'
                  }
                `}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        {/* Mobile plain text indicator */}
        <span className="sm:hidden text-sm font-medium text-primary px-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:bg-surface2 hover:text-primary disabled:opacity-50 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
