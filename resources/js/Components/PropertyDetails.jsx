export default function PropertyDetails({ datas, amenities, setting }) {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
      {/* Dirección */}
      <div>
        <h3 className="sr-only">Dirección</h3>
        <div className="space-y-1">
          <p className="capitalize text-base text-gray-900">{datas.phy_state.name}</p>
          <p className="capitalize text-base text-gray-900">
            {datas.country.name}, {datas.state.name}, {datas.city.name}
          </p>
          <p className="text-base text-gray-900">{datas.direction}</p>
        </div>
      </div>

      {/* Grid de Detalles (Estado, bedrooms, etc.) */}
      <div className="py-10 grid grid-cols-3 gap-4">
        <div className="flex flex-col justify-between items-center border rounded-lg p-4">
          <p className="capitalize text-sm font-medium text-gray-900">Estado</p>
          <p className="capitalize text-sm text-gray-600">{datas.phy_state.name}</p>
        </div>
        <div className="flex flex-col justify-between items-center border rounded-lg p-4">
          <p className="capitalize text-sm font-medium text-gray-900">Dormitorios</p>
          <p className="text-sm text-gray-600">{datas.bedrooms}</p>
        </div>
        <div className="flex flex-col justify-between items-center border rounded-lg p-4">
          <p className="capitalize text-sm font-medium text-gray-900">Baños</p>
          <p className="text-sm text-gray-600">{datas.bathrooms}</p>
        </div>
        <div className="flex flex-col justify-between items-center border rounded-lg p-4">
          <p className="capitalize text-sm font-medium text-gray-900">Garages</p>
          <p className="text-sm text-gray-600">{datas.garages}</p>
        </div>
        <div className="flex flex-col justify-between items-center border rounded-lg p-4">
          <p className="capitalize text-sm font-medium text-gray-900">Metros construidos</p>
          <p className="text-sm text-gray-600">{datas.builtMeters}</p>
        </div>
        <div className="flex flex-col justify-between items-center border rounded-lg p-4">
          <p className="capitalize text-sm font-medium text-gray-900">Metros totales</p>
          <p className="text-sm text-gray-600">{datas.totalMeters}</p>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <h2 className="capitalize text-sm font-medium text-gray-900">Descripción</h2>
        <div className=" space-y-6">
          <div className="" dangerouslySetInnerHTML={{ __html: datas.description }} />
        </div>
      </div>

      {/* Características (Amenities) */}
      <div className="">
        <h3 className="capitalize text-sm font-medium text-gray-900">Características</h3>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            {amenities.map((amenity) => (
              <li key={amenity.id} className="text-gray-400">
                <span className="capitalize text-gray-600">{amenity.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
