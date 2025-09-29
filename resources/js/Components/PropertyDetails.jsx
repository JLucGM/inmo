import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Description, DialogBackdrop } from '@headlessui/react'
import { Button } from "flowbite-react";
import { Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";


export default function PropertyDetails({ datas, amenities, setting }) {

  let [isOpen, setIsOpen] = useState(false)
  const amenitiesPreview = amenities.slice(0, 9)

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

      <div className="border p-8 rounded-xl bg-gray-800 ">
        {/* aqui quiero el fondo */}
        <h3 className="capitalize text-sm font-medium text-slate-200">Características</h3>
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            {amenitiesPreview.map((amenity) => (
              <div key={amenity.id} className="flex flex-col items-start text-slate-200 border-2 border-gray-500 rounded-xl p-4">
                {amenity.icon_svg && (
                  <span
                    className="mr-2 mb-2 flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: amenity.icon_svg }}
                  />
                )}
                <span className="capitalize text-slate-200">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Botón para abrir diálogo */}
        <div className="mt-4 flex items-center justify-end">
          <Button className="flex items-center text-slate-200" color="alternative" pill onClick={() => setIsOpen(true)}>
            <Squares2X2Icon className="h-6 w-6" /> Ver todas las características
          </Button>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full space-y-4 bg-white p-6 rounded shadow-lg overflow-auto max-h-[80vh]">
            <DialogTitle className="text-lg font-bold flex items-center justify-between">
              Todas las características
              <Button
                color="alternative"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
              </Button>
            </DialogTitle>
            <Description className="text-sm text-gray-600">
              Lista completa de amenities de la propiedad.
            </Description>
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center text-gray-600">
                  {amenity.icon_svg && (
                    <span
                      className="mr-2 mb-2 flex-shrink-0"
                      dangerouslySetInnerHTML={{ __html: amenity.icon_svg }}
                    />
                  )}
                  <span className="capitalize">{amenity.name}</span>
                </div>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

    </div>
  );
}