import React from "react";
import { GrNext } from "react-icons/gr";
import ArrowRight from "../assets/images/arrowRightDouble.svg";
import ArrowRight1 from "../assets/images/arrowRight.svg";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, setItemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex gap-8 text-[#545454] justify-center space-x-2 mt-4">
      <div>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="bg-[#F0F0F0] rounded-lg px-2 py-1"
        >
          {[5, 10, 15, 20, 25, 30].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Item range display */}
      <div className="flex items-center ">
        <span>
          {startItem} -  {endItem} of {totalItems}
        </span>
      </div>

      {/* Page navigation buttons */}
      <div className="flex space-x-2">
        {/* First page button */}
        <button
          className={`py-1 pr-3 ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <img className="h-[15px] rotate-180" draggable="false" src={ArrowRight} />
        </button>

        {/* Previous page button */}
        <button
          className={`py-1 pr-3 ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img className="h-[15px] rotate-180" draggable="false" src={ArrowRight1} />
        </button>

        {/* Next page button */}
        <button
          className={`py-1 pr-3 ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img className="h-[15px]" draggable="false" src={ArrowRight1} />
        </button>

        {/* Last page button */}
        <button
          className={`py-1 pr-3 ${currentPage === totalPages ? " cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <img className="h-[15px]" draggable="false" src={ArrowRight} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
