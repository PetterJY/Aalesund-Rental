import React from 'react';
import './PaginationControls.css';
import '../App.css';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-controls">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default PaginationControls;