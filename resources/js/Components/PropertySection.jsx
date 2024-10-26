import { Transition } from '@headlessui/react'
import SwiperCustom from './SwiperCustom'
import { SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import InputError from './InputError';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';


export default function PropertySection({ datas, images, amenities, setting }) {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
    status_contacts_id: 1,
    types_contacts_id: 1,
    types_properties_id: 1,
    user_id: datas.user.id,
    origin_id: 2,
    country_id: 1,
    state_id: 1,
    city_id: 1,

  }

  const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

  const submit = (e) => {
    e.preventDefault();
    post(route('storeContact.store', { property: datas }));
  }

  return (
    <div className="bg-white">
      <div className="pt-6">


        <SwiperCustom>

          {images.map((image, index) => (

            <SwiperSlide
              key={image.id}
              className="bg-center bg-repeat bg-cover rounded-3xl relative content-center "
              style={{
                backgroundImage: `url(${image.name})`,
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
                            alt={datas.images[0].alt}
                            src={datas.images[0].src}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={datas.images[1].alt}
                                src={datas.images[1].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={datas.images[2].alt}
                                src={datas.images[2].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            alt={datas.images[3].alt}
                            src={datas.images[3].src}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div> */}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 grid grid-cols-3">
            <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl col-span-2">#{datas.identification} - {datas.name}</h1>
            <div className="text-end">

              <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl ">{datas.type_business.name}</h1>
              <p className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{setting.currency.symbol}{datas.price}</p>
            </div>

          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <h2 className="capitalize text-lg font-medium text-gray-900">Contactanos</h2>
            <p className=" text-sm font-medium text-gray-900">Si esta interesado con la propiedad, escribenos y el agente inmobiliario de contactara.</p>
            <div className="mt-4 ">
              <div className="flex flex-col items-center">

                <img src={`/img/profile/${datas.user.avatar}`} alt={datas.user.avatar} className='w-40' />
                <h2 className="">{datas.user.name}</h2>
              </div>
              <form onSubmit={submit}>
                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                </Transition>
                <div>
                  <InputLabel htmlFor="name" value="Nombre" />

                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="email" value="email" />

                  <TextInput
                    id="email"
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                  <InputLabel htmlFor="phone" value="phone" />

                  <TextInput
                    id="phone"
                    type="text"
                    name="phone"
                    value={data.phone}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('phone', e.target.value)}
                  />

                  <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="description" value="description" />

                  <TextInput
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('description', e.target.value)}
                  />

                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="flex justify-end p-2.5">
                  <PrimaryButton >
                    Guardar
                  </PrimaryButton>
                </div>
              </form>

            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">direccion</h3>

              <div className="space-y-4 ">
                <p className="capitalize text-base text-gray-900">{datas.phy_state.name}</p>
                <p className="capitalize text-base text-gray-900">{datas.country.name}, {datas.state.name}, {datas.city.name}</p>
                <p className="text-base text-gray-900"> {datas.direction}</p>
              </div>
            </div>

            <div className="py-10 grid grid-cols-3 gap-4">
              <div className="flex flex-col justify-between items-center">
                <p className="capitalize text-sm font-medium text-gray-900">Estado</p>
                <p className='capitalize text-sm text-gray-600'>{datas.phy_state.name}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="capitalize text-sm font-medium text-gray-900">bedrooms</p>
                <p className='text-sm text-gray-600'>{datas.bedrooms}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="capitalize text-sm font-medium text-gray-900">bathrooms</p>
                <p className='text-sm text-gray-600'>{datas.bathrooms}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="capitalize text-sm font-medium text-gray-900">garages</p>
                <p className='text-sm text-gray-600'>{datas.garages}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="capitalize text-sm font-medium text-gray-900">builtMeters</p>
                <p className='text-sm text-gray-600'>{datas.builtMeters}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="capitalize text-sm font-medium text-gray-900">totalMeters</p>
                <p className='text-sm text-gray-600'>{datas.totalMeters}</p>
              </div>

            </div>

            <div className="mt-10">
              <h2 className="capitalize text-sm font-medium text-gray-900">description</h2>

              <div className="mt-4 space-y-6">
                {/* <p className="text-sm text-gray-600">{datas.description}</p> */}
                <div className="pb-6" dangerouslySetInnerHTML={{ __html: datas.description }} />

              </div>
            </div>

            <div className="mt-10">
              <h3 className="capitalize text-sm font-medium text-gray-900">Caracteristicas</h3>

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
        </div>
      </div>
    </div>
  )
}
