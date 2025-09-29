import React from 'react';
import HeaderSection from './HeaderSection';

export default function TestimonialSection({ datas = [], headerTitle = "Loved by community", subtitle = "Harum quae dolore corrupti aut temporibus pariatur." }) {
  const anonymousFallbackImage = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  return (
    <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">

      <HeaderSection
        title={headerTitle}
        description={subtitle}
      />

      {/* Grid de Testimonios (Masonry Style) */}
      {datas.length > 0 ? (
        <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {datas.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-black p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar || anonymousFallbackImage}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    const target = e.target;
                    target.onerror = null;
                    target.src = anonymousFallbackImage;
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  {/* Si agregas 'title' a tus datos, descomenta: <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p> */}
                </div>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No hay testimonios disponibles.</p>
      )}
    </div>
  );
}
