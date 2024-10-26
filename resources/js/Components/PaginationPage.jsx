// Pagination.js
import React from 'react';
import ChevronLeft from "./Icon/ChevronLeft";
import ChevronRight from "./Icon/ChevronRight";

const PaginationPage = ({ currentPage, totalPages, onNext, onPrev }) => {
    return (
        <div className="flex justify-end items-center mt-8">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
            >
                <ChevronLeft className={'size-5'} />
            </button>

            <span className="text-gray-700 mx-4">
                Página {currentPage} de {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
            >
                <ChevronRight className={'size-5'} />
            </button>
        </div>
    );
};

export default PaginationPage;