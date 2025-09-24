import { Transition, Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import InputError from './InputError';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { Alert } from 'flowbite-react';
import PropertyDetails from './PropertyDetails';
import PropertyGallery from './PropertyGallery'; // Nueva importación
// Imports para el modal (Swiper solo aquí)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PropertySection({ datas, images, amenities, setting }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // Estado para el modal

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
  };

  const { data, setData, errors, post, reset, recentlySuccessful } = useForm(initialValues);

  // useEffect: Resetear formulario en éxito
  useEffect(() => {
    if (recentlySuccessful) {
      reset();
    }
  }, [recentlySuccessful, reset]);

  const submit = (e) => {
    e.preventDefault();
    post(route('storeContact.store', { property: datas }));
  };

  const handleDismissAlert = () => {
    // Opcional: lógica para cerrar alert manualmente
  };

  // Parsear images si es string (de tu JSON ejemplo)
  const parsedImages = typeof images === 'string' ? JSON.parse(images || '[]') : images;

  return (
    <div className="bg-white relative">
      {/* Alert Flotante en la parte superior */}
      <Transition
        show={recentlySuccessful}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-[-100%]"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-100%]"
      >
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert
            color="success"
            onDismiss={handleDismissAlert}
            className="border-0 shadow-lg"
          >
            <span className="font-medium">¡Éxito!</span> Mensaje creado exitosamente.
          </Alert>
        </div>
      </Transition>

      <div className="pt-6">
        {/* Nueva Galería de Imágenes (reemplaza SwiperCustom) */}
        <PropertyGallery images={parsedImages} onOpenGallery={() => setIsGalleryOpen(true)} />

        {/* Product info - Header con título, tipo y precio + Grid principal */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Header: Título y precio (span 2 columnas) */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 grid grid-cols-3 mb-8 lg:mb-0">
            <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl col-span-2">
              #{datas.identification} - {datas.name}
            </h1>
            <div className="text-end">
              <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {datas.type_business.name}
              </h1>
              <p className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {setting.currency.symbol}{datas.price}
              </p>
            </div>
          </div>

          {/* Formulario de Contacto - Columna derecha (sticky) */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <h2 className="capitalize text-lg font-medium text-gray-900 mb-4">Contactanos</h2>
            <p className="text-sm font-medium text-gray-900 mb-6">
              Si esta interesado con la propiedad, escribenos y el agente inmobiliario de contactara.
            </p>
            <div className="sticky top-6"> {/* Sticky corregido */}
              <div className="flex flex-col items-center mb-6">
                <img src={`${datas.user.avatar}`} alt={datas.user.name} className="w-40 rounded-full" />
                <h2 className="mt-2 font-medium">{datas.user.name}</h2>
              </div>
              <form onSubmit={submit}>
                <div className="space-y-4">
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
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel htmlFor="phone" value="Teléfono" />
                    <TextInput
                      id="phone"
                      type="tel"
                      name="phone"
                      value={data.phone}
                      className="mt-1 block w-full"
                      onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel htmlFor="description" value="Descripción" />
                    <TextInput
                      id="description"
                      type="textarea" // Asumiendo que TextInput soporta textarea
                      name="description"
                      value={data.description}
                      className="mt-1 block w-full h-24"
                      onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                  </div>

                  <div className="flex justify-end pt-4">
                    <PrimaryButton>Enviar</PrimaryButton>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Detalles de la Propiedad - Span 2 columnas abajo */}
          <PropertyDetails datas={datas} amenities={amenities} setting={setting} />
        </div>
      </div>

      {/* Modal con Carousel Full-Screen (todas las imágenes) */}
      <Dialog open={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} className="relative z-50">
        <Transition appear show={isGalleryOpen} as={Dialog.Fragment}>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Dialog.Panel}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full max-w-6xl max-h-[90vh] transform overflow-hidden rounded-2xl">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="h-[80vh] lg:h-[90vh]"
                    loop={true} // Loop infinito para mejor UX
                  >
                    {parsedImages.map((img) => (
                      <SwiperSlide key={img.id}>
                        <div className="h-full flex items-center justify-center bg-black rounded-2xl">
                          <img
                            src={img.name}
                            alt={`Imagen ${img.id}`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition>
      </Dialog>
    </div>
  );
}
