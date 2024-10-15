import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import SwiperCustom from './SwiperCustom'
import { SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



export default function PropertySection({ data, images, amenities }) {
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {data.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={data.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {data.name}
              </a>
            </li>
          </ol>
        </nav> */}

        <SwiperCustom>

          {images.map((image, index) => (

            <SwiperSlide
              key={image.id}
              className="bg-center bg-repeat bg-cover rounded-3xl relative content-center "
              style={{
                backgroundImage: `url(/img/properties/${image.name})`,
                height: '30rem',
              }}
            >

            </SwiperSlide>
          ))}

        </SwiperCustom>
        {/* Image gallery */}
        {/* <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt={data.images[0].alt}
                            src={data.images[0].src}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={data.images[1].alt}
                                src={data.images[1].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={data.images[2].alt}
                                src={data.images[2].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            alt={data.images[3].alt}
                            src={data.images[3].src}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div> */}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">#{data.identification} - {data.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{data.price}</p>


            <h1>Formulario de contacto </h1>

          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">direccion</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{data.country.name}, {data.state.name}, {data.city.name}</p>
                <p className="text-base text-gray-900">{data.direction}</p>
              </div>
            </div>

            <div className="py-10 grid grid-cols-3 gap-4">
              <div className="flex flex-col justify-between items-center">
                <p className="text-sm font-medium text-gray-900">bedrooms</p>
                <p>{data.bedrooms}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="text-sm font-medium text-gray-900">bathrooms</p>
                <p>{data.bathrooms}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="text-sm font-medium text-gray-900">garages</p>
                <p>{data.garages}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="text-sm font-medium text-gray-900">builtMeters</p>
                <p>{data.builtMeters}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="text-sm font-medium text-gray-900">totalMeters</p>
                <p>{data.totalMeters}</p>
              </div>

            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Caracteristicas</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {amenities.map((amenity) => (
                    <li key={amenity.id} className="text-gray-400">
                      <span className="text-gray-600">{amenity.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">description</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
