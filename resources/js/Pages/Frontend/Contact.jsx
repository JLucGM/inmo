import CoverPage from "@/Components/CoverPage";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Transition } from "@headlessui/react";
import { AtSymbolIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Head, useForm, Link } from "@inertiajs/react";
import InstagramPosts from '@/Components/InstagramPosts';
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Contact({ auth, setting, pages }) {

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
    status_contacts_id: 1,
    types_contacts_id: 1,
    types_properties_id: 1,
    origin_id: 2,
    country_id: 1,
    state_id: 1,
    city_id: 1,
  }

  const { data, setData, errors, post, reset, recentlySuccessful, processing } = useForm(initialValues)

    useEffect(() => {
      if (recentlySuccessful) {
        reset();
      }
    }, [recentlySuccessful, reset]);

  const submit = (e) => {
    e.preventDefault();
    post(route('ContactPage.store'));
  }

  return (
    <FrontedLayout auth={auth} setting={setting} pages={pages}>
      <Head title="Contacto" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <div className="space-y-8">
            <CoverPage
                title={setting.titleContact}
                image={setting.portadaContact}
            />
            
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border dark:border-gray-800 space-y-6">
                <h3 className="text-xl font-bold italic">Información de contacto</h3>
                <div className="space-y-4">
                    <p className="flex items-start gap-3">
                        <MapPinIcon className="size-6 text-blue-600 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{setting.direction}</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <PhoneIcon className="size-6 text-blue-600" />
                        <span className="text-gray-600 dark:text-gray-400">{setting.phone}</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <AtSymbolIcon className="size-6 text-blue-600" />
                        <span className="text-gray-600 dark:text-gray-400">{setting.email}</span>
                    </p>
                </div>
            </div>
        </div>

        <div className="content-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 italic">Envíanos un mensaje</h2>
            <p className="text-gray-500 dark:text-gray-400">{setting.descriptionContact}</p>
          </div>

          <form className="space-y-5 relative" onSubmit={submit}>
            <Transition
              show={recentlySuccessful}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="mb-6">
                <Alert className="bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                  <AlertTitle className="text-emerald-800 dark:text-emerald-400 font-bold">¡Éxito!</AlertTitle>
                  <AlertDescription className="text-emerald-700 dark:text-emerald-500">
                    Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
                  </AlertDescription>
                </Alert>
              </div>
            </Transition>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="+1 234 567 890"
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Mensaje</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="min-h-[120px]"
                    required
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="pt-2">
              <Button className="w-full md:w-auto px-8" disabled={processing} type="submit">
                {processing ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {setting.status_instagram_posts == 1 && (
        <InstagramPosts setting={setting} />
      )}

    </FrontedLayout>
  )
}
