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
                className={`px-4 py-2 rounded ${currentPage === 1 ? ' text-slate-500' : ' text-black'}`}
            >
                <ChevronLeft className={'size-5'} />
            </button>

            <span className="text-gray-700 mx-4">
                Página {currentPage} de {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? ' text-slate-500' : ' text-black'}`}
            >
                <ChevronRight className={'size-5'} />
            </button>
        </div>
    );
};

export default PaginationPage;