import { Transition } from '@headlessui/react'; // Removido Dialog, mantenido Transition para Alert
import { useEffect } from 'react'; // Removido useState ya que no se usa el modal
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import InputError from './InputError';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { Alert } from 'flowbite-react';
import PropertyDetails from './PropertyDetails';
import PropertyGallery from './PropertyGallery'; // Asegúrate de que exista y exporte default
// Removidos todos los imports de Swiper ya que no se usa el modal

export default function PropertySection({ datas, amenities, setting, pages }) { // Removido 'images'; amenities ahora de prop o datas.amenities
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
    status_contacts_id: 1,
    types_contacts_id: 1,
    types_properties_id: 1,
    user_id: datas?.user?.id || 1, // Fallback si datas.user no existe
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

  // Procesamiento de imágenes directamente desde datas.media (sin prop images)
  let parsedImages = datas?.media || []; // Fallback directo a datas.media

  // Ordenar por order_column si existe (para mostrar en orden correcto)
  if (parsedImages.length > 0 && parsedImages[0].order_column !== undefined) {
    parsedImages = [...parsedImages].sort((a, b) => a.order_column - b.order_column);
  }

  // Verificación extra: si parsedImages no es array, hazlo vacío
  if (!Array.isArray(parsedImages)) {
    parsedImages = [];
  }

  // Amenities: usa prop o fallback a datas.amenities si lo cargas en la relación
  const finalAmenities = amenities || datas?.amenities || [];

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
            className="border-0 shadow-lg"
          >
            <span className="font-medium">¡Éxito!</span> Mensaje creado exitosamente.
          </Alert>
        </div>
      </Transition>

      <div className="pt-6">
        {/* Nueva Galería de Imágenes (sin modal full-screen) */}
        <PropertyGallery images={parsedImages} /> {/* Removida onOpenGallery ya que no hay modal */}

        {/* Product info - Header con título, tipo y precio + Grid principal */}
        <div className="mx-auto grid max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Header: Título y precio (span 2 columnas) */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 grid grid-cols-3 mb-8 lg:mb-0">
            <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl col-span-2">
              #{datas?.identification || 'N/A'} - {datas?.name || 'Propiedad sin nombre'}
            </h1>
            <div className="text-end">
              <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {datas?.type_business?.name || 'Tipo no disponible'} {/* Nota: en datos es type_business */}
              </h1>
              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {setting?.currency?.symbol || '$'}{datas?.price || '0'}
              </p>
            </div>
          </div>

          {/* Formulario de Contacto - Columna derecha (sticky) */}
          <div className="mt-4 lg:row-span-3 lg:mt-0 ">
            <h2 className="sr-only">Product information</h2>
            <h2 className="capitalize text-lg font-medium text-gray-900 mb-4">Contactanos</h2>
            <p className="text-sm font-medium text-gray-900 mb-6">
              Si esta interesado con la propiedad, escribenos y el agente inmobiliario de contactara.
            </p>
            <div className="sticky top-6">
              <div className="flex flex-col items-center mb-6">
                <img 
                  src={datas?.user?.avatar || '/img/default-avatar.jpg'} 
                  alt={datas?.user?.name || 'Agente'} 
                  className="w-40 rounded-full" 
                  onError={(e) => { e.target.src = '/img/default-avatar.jpg'; }} // Fallback para avatar
                />
                <h2 className="mt-2 font-medium">{datas?.user?.name || 'Agente no asignado'}</h2>
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
          <PropertyDetails datas={datas} amenities={finalAmenities} setting={setting} />
        </div>
      </div>
    </div>
  );
}
