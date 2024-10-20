import CardPost from "./Cardpost";
import { useState } from 'react';
import ChevronLeft from "./Icon/ChevronLeft";
import ChevronRight from "./Icon/ChevronRight";

export default function PostSection({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; // Cambia esto según cuántos posts quieres mostrar por página

  // Calcular el índice de los posts a mostrar
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Total de páginas
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {currentPosts.map((post) => (

            <CardPost
              key={post.id}  // Clave única aquí
              data={post}
            />
          ))}
          
        </div>

        {/* Controles de Paginación */}
        <div className="flex justify-end items-center mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-3000 text-gray-500' : 'bg-blue-5000 text-blue-500'}`}
          >
            <ChevronLeft 
            className={'size-5'}
            />
          </button>

          {/* Texto de Paginación */}
          <span className="text-gray-700 mx-4">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-3000 text-gray-500' : 'bg-blue-5000 text-blue-500'}`}
          >
            <ChevronRight 
            className={'size-5'}
            />
          </button>
        </div>
      </div>
    </div>
  );
}