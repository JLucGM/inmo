import { Link } from "@inertiajs/react";

export default function ProductsList({ data, setting }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <Link key={product.id} href={route('property.show', product)} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.main}
                  src={`/img/properties/${product.main}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-lg"
                />
              </div>
              <div className="p-2 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <p
                      className="capitalize font-medium	"
                      href={product.href}>
                      {product.name}
                    </p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.country.name}, {product.state.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{setting.currency.symbol}{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
