import { Link } from "@inertiajs/react";

export default function ProductsList({ data, setting, onCardHover }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => {
          const firstImage = product.media && product.media.length > 0
            ? product.media[0].original_url
            : null;

          return (
            <Link
              key={product.id}
              href={route('property.show', product.slug)}
              className="group"
              onMouseEnter={() => onCardHover?.(product.id)}
              onMouseLeave={() => onCardHover?.(null)}
            >
              <div className="overflow-hidden rounded-xl bg-gray-100">
                {firstImage ? (
                  <img
                    alt={`Imagen principal de ${product.name}`}
                    src={firstImage}
                    className="aspect-square w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/img/default.jpg';
                    }}
                  />
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-xs">Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm font-bold text-gray-900 capitalize truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {product.type_business?.name || 'Tipo no disponible'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {product.country?.name || ''}{product.country?.name && product.state?.name ? ', ' : ''}{product.state?.name || ''}
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {setting?.currency?.symbol || '$'}{product.price}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
