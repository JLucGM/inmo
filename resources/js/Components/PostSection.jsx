import CardPost from "./Cardpost";
import { useState } from 'react';
import ChevronLeft from "./Icon/ChevronLeft";
import ChevronRight from "./Icon/ChevronRight";
import PaginationPage from "./PaginationPage";

export default function PostSection({ posts, setting }) {
  const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

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

  return (
    <div className="bg-white py-24 sm:py-30">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{setting.titleBlog}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          {setting.descriptionBlog}
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

        {/* Usar el componente de Paginación */}
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
        />

      </div>
    </div>
  );
}