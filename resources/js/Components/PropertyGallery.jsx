import { useState } from 'react';
// Imports para el carrusel en el modal
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

export default function PropertyGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false); // Estado local para el modal

  // Asume images ya ordenado por order_column desde el padre
  const parsedImages = Array.isArray(images) ? images : [];
  const totalImages = parsedImages.length;
  const mainImage = parsedImages[0]; // Primera como principal
  const secondaryImages = parsedImages.slice(1, 3); // Hasta 2 secundarias (como en Wander)
  const hasMoreImages = totalImages > 3; // Botón si >3 totales

  // Función helper para renderizar imagen con fallback
  const renderImage = (img, altText, className = "h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]") => {
    if (!img || !img.original_url) {
      return (
        <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-2xl text-sm text-gray-500">
          Sin imagen
        </div>
      );
    }

    return (
      <img
        src={img.original_url}
        alt={altText}
        className={className}
        loading="lazy"
        onError={(e) => {
          e.target.src = '/img/default-property.jpg'; // Ajusta a tu placeholder
          e.target.alt = 'Imagen no disponible';
        }}
      />
    );
  };

  // Función para cerrar el modal
  const closeModal = () => setIsOpen(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Imagen Principal - Ocupa 2 columnas en desktop (como hero en Wander) */}
        <div className="lg:col-span-2">
          <div className="aspect-[3/2] w-full overflow-hidden rounded-2xl relative group cursor-pointer">
            {renderImage(
              mainImage,
              `Imagen principal de ${parsedImages[0]?.file_name || 'la propiedad'}`
            )}
            {/* Overlay sutil al hover (degradado como en Wander) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Columna de Imágenes Secundarias - Apiladas verticalmente (1 columna) */}
        <div className="space-y-4 lg:space-y-6">
          {secondaryImages.map((img, index) => {
            const isLastSecondary = index === secondaryImages.length - 1; // Última para overlay si hay más
            return (
              <div
                key={img.id || index}
                className="aspect-square w-full h-64 overflow-hidden rounded-2xl relative group cursor-pointer"
              >
                {renderImage(
                  img,
                  `Imagen secundaria ${index + 1} de la propiedad`
                )}
                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay con "+X more photos" - Solo en la última si hay más (como en Wander) */}
                {hasMoreImages && isLastSecondary && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button
                      className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 shadow-md"
                      onClick={() => setIsOpen(true)} // Abre el modal
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                      <span>+{totalImages - 3} imágenes más</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Placeholders si hay menos de 2 secundarias (mantiene layout como en Wander) */}
          {secondaryImages.length < 2 && (
            Array.from({ length: 2 - secondaryImages.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="aspect-square w-full bg-gray-200 rounded-2xl flex items-center justify-center text-sm text-gray-500">
                Sin imagen
              </div>
            ))
          )}
        </div>
      </div>

      {/* Indicador de número total de fotos (exacto como en Wander) */}
      {totalImages > 0 && (
        <div className="text-center text-sm text-gray-500 mt-4">
          {totalImages} imagen{totalImages !== 1 ? 'es' : ''} - {hasMoreImages ? ' Ver todas las fotos' : 'Todas las fotos mostradas'}
        </div>
      )}

      {/* Main modal - Full-screen adaptado */}
      <div 
        id="gallery-modal" 
        className={`fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden ${isOpen ? '' : 'hidden'}`}
        aria-hidden={!isOpen}
        tabindex="-1"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80" 
          onClick={closeModal}
        />
        
        {/* Modal content - Full-screen */}
        <div className="relative w-full h-full max-w-none p-0 flex items-center justify-center">
          <div className="relative bg-black/50 rounded-none w-full h-full shadow-none">
            {/* Modal header - Simplificado con solo botón cerrar en esquina */}
            <div className="absolute top-4 right-4 z-10 flex items-center justify-end p-4">
              <button 
                type="button" 
                className="text-white bg-transparent hover:bg-gray-800 hover:text-white rounded-lg text-sm w-10 h-10 ms-auto inline-flex justify-center items-center"
                onClick={closeModal}
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body - Swiper full-height */}
            <div className="p-0 h-full w-full flex items-center justify-center ">
              <div className="relative h-[90vh] w-full max-w-6xl mx-auto">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={true}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="h-full"
                  loop={true}
                >
                  {parsedImages.length > 0 ? (
                    parsedImages.map((img, index) => (
                      <SwiperSlide key={img.id || index}>
                        <div className="h-full flex items-center justify-center bg-black/0">
                          {renderImage(
                            img,
                            `Imagen ${index + 1} de ${totalImages} de la propiedad`,
                            "max-h-full max-w-full object-contain"
                          )}
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="h-full flex items-center justify-center bg-gray-800">
                        <span className="text-white text-lg">No hay imágenes disponibles</span>
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
            </div>

            {/* Sin footer para full-screen */}
          </div>
        </div>
      </div>
    </div>
  );
}
