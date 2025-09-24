export default function PropertyGallery({ images, onOpenGallery }) {
  // Parsear si images es string JSON (de tu backend)
  const parsedImages = typeof images === 'string' ? JSON.parse(images || '[]') : images;
  const totalImages = parsedImages.length;
  const mainImage = parsedImages[0]; // Primera imagen como principal
  const secondaryImages = parsedImages.slice(1, 3); // Siguiente 2 como secundarias
  const hasMoreImages = totalImages > 3; // Mostrar botón si >3 imágenes

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Imagen Principal - Ocupa 2 columnas en desktop */}
        <div className="lg:col-span-2">
          <div className="aspect-[3/2] w-full overflow-hidden rounded-2xl relative group cursor-pointer">
            {mainImage ? (
              <>
                <img
                  src={mainImage.name}
                  alt="Imagen principal de la propiedad"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-2xl text-sm text-gray-500">
                Sin imagen principal
              </div>
            )}
          </div>
        </div>

        {/* Columna de Imágenes Secundarias - 1 columna, apiladas verticalmente */}
        <div className="space-y-4 lg:space-y-6">
          {secondaryImages.map((img, index) => {
            const isLastSecondary = index === 1; // La segunda (inferior) para el botón
            return (
              <div
                key={img.id}
                className="aspect-square w-full overflow-hidden rounded-2xl relative group cursor-pointer"
              >
                <img
                  src={img.name}
                  alt={`Imagen secundaria ${index + 1}`}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay con botón "View all photos" - Solo en la imagen inferior si hay más */}
                {hasMoreImages && isLastSecondary && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button
                      onClick={onOpenGallery}
                      className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>View all photos</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Placeholders si hay menos de 2 secundarias */}
          {secondaryImages.length < 2 && (
            Array.from({ length: 2 - secondaryImages.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="aspect-square w-full bg-gray-200 rounded-2xl" />
            ))
          )}
        </div>
      </div>

      {/* Indicador de número total de fotos (opcional, como en Wander) */}
      {totalImages > 0 && (
        <div className="text-center text-sm text-gray-500 mt-4">
          {totalImages} photo{totalImages !== 1 ? 's' : ''} • {hasMoreImages ? 'Click to view all' : 'All photos shown'}
        </div>
      )}
    </div>
  );
}
