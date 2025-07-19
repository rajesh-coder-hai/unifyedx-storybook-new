import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import "./Pagination.css";

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 15, 20],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show current page and surrounding pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");

    // Always show last page if different from first
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const startIndex = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-left">
        <div className="pagination-select-container">
          <label htmlFor="items-per-page" className="pagination-select-label">
            Rows per page:
          </label>
          <select
            id="items-per-page"
            className="pagination-select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            aria-label="Items per page"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="pagination-info">
          {startIndex}-{endIndex} of {totalItems}
        </span>
      </div>
      <div className="pagination-right">
        <button
          className="pagination-button pagination-nav-button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          className="pagination-button pagination-nav-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-number-button ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          className="pagination-button pagination-nav-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
        <button
          className="pagination-button pagination-nav-button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};
