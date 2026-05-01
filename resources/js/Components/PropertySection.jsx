import { Transition } from '@headlessui/react';
import { useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import PropertyDetails from './PropertyDetails';
import PropertyGallery from './PropertyGallery';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function PropertySection({ datas, amenities, setting }) {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
    status_contacts_id: 1,
    types_contacts_id: 1,
    types_properties_id: 1,
    user_id: datas?.user?.id || 1,
    origin_id: 2,
    country_id: 1,
    state_id: 1,
    city_id: 1,
    property_id: datas?.id || null,
  };

  const { data, setData, errors, post, reset, recentlySuccessful, processing } = useForm(initialValues);

  useEffect(() => {
    if (recentlySuccessful) {
      reset();
    }
  }, [recentlySuccessful, reset]);

  const submit = (e) => {
    e.preventDefault();
    post(route('storeContact.store', { property: datas }));
  };

  let parsedImages = datas?.media || [];

  if (parsedImages.length > 0 && parsedImages[0].order_column !== undefined) {
    parsedImages = [...parsedImages].sort((a, b) => a.order_column - b.order_column);
  }

  if (!Array.isArray(parsedImages)) {
    parsedImages = [];
  }

  const finalAmenities = amenities || datas?.amenities || [];

  return (
    <div className="bg-white dark:bg-gray-950 relative">
      <Transition
        show={recentlySuccessful}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-[-100%]"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-100%]"
      >
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert className="bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 shadow-xl">
            <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
            <AlertTitle className="text-emerald-800 dark:text-emerald-400 font-bold">¡Enviado!</AlertTitle>
            <AlertDescription className="text-emerald-700 dark:text-emerald-500">
              Tu mensaje ha sido enviado correctamente. El agente se contactará contigo.
            </AlertDescription>
          </Alert>
        </div>
      </Transition>

      <div className="pt-6">
        <PropertyGallery images={parsedImages} />

        <div className="mx-auto grid max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-10 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 dark:lg:border-gray-800 lg:pr-8 grid grid-cols-1 md:grid-cols-3 mb-8 lg:mb-0">
            <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl col-span-2">
              #{datas?.identification || 'N/A'} - {datas?.name || 'Propiedad sin nombre'}
            </h1>
            <div className="md:text-end mt-4 md:mt-0">
              <h2 className="capitalize text-xl font-semibold tracking-tight text-blue-600 dark:text-blue-400 sm:text-2xl italic">
                {datas?.type_business?.name || 'Tipo no disponible'}
              </h2>
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl mt-1">
                {setting?.currency?.symbol || '$'}{new Intl.NumberFormat().format(datas?.price || 0)}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-10 border dark:border-gray-800 p-6 rounded-3xl bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <header className="mb-6 text-center">
                    <div className="relative inline-block mb-3">
                        <img 
                            src={datas?.user?.avatar || '/img/default-avatar.jpg'} 
                            alt={datas?.user?.name || 'Agente'} 
                            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md ring-2 ring-blue-500/20" 
                            onError={(e) => { e.target.src = '/img/default-avatar.jpg'; }}
                        />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white italic">{datas?.user?.name || 'Agente no asignado'}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Agente Inmobiliario</p>
                </header>

                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">Contactar ahora</h4>
                
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs">Nombre</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="bg-white dark:bg-gray-800"
                    />
                    {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="correo@ejemplo.com"
                      required
                      className="bg-white dark:bg-gray-800"
                    />
                    {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      placeholder="+1 234 567"
                      className="bg-white dark:bg-gray-800"
                    />
                    {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs">Mensaje</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Estoy interesado en esta propiedad..."
                      className="min-h-[100px] bg-white dark:bg-gray-800"
                    />
                    {errors.description && <p className="text-[10px] text-red-500">{errors.description}</p>}
                  </div>

                  <Button className="w-full pt-2" disabled={processing} type="submit">
                    {processing ? 'Enviando...' : 'Enviar consulta'}
                  </Button>
                </form>
            </div>
          </div>

          <PropertyDetails datas={datas} amenities={finalAmenities} setting={setting} />
        </div>
      </div>
    </div>
  );
}
