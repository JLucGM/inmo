import { Link } from "@inertiajs/react";

export default function ProductsList({ data, setting }) {
  console.log(data);
  return (
    <div className="my-10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Propiedades</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => {
            // Obtener la primera imagen del array media
            const firstImage = product.media && product.media.length > 0 
              ? product.media[0].original_url 
              : null; // O puedes usar un placeholder como '/img/default.jpg'

            return (
              <Link 
                key={product.id} 
                href={route('property.show', product.slug)} // Corregido: usar product.slug en lugar de product completo
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-3xl bg-gray-200 lg:aspect-none lg:h-80 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-110">
                  {firstImage ? (
                    <img
                      alt={`Imagen principal de ${product.name}`}
                      src={firstImage}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-lg"
                      loading="lazy"
                      onError={(e) => { // Opcional: manejar errores de carga de imagen
                        e.target.src = '/img/default.jpg'; // Placeholder si falla (ajusta la ruta según tu proyecto)
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-lg">
                      <span className="text-gray-500 text-sm">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="p-2 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p className="capitalize font-medium">
                        {product.name}
                      </p>
                      <p className="capitalize font-medium">
                        {product.type_business?.name || 'Tipo no disponible'}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.country?.name || 'País no disponible'}, {product.state?.name || 'Estado no disponible'}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {setting?.currency?.symbol || '$'}{product.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
