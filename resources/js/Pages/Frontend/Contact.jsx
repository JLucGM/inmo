import CoverPage from "@/Components/CoverPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Transition } from "@headlessui/react";
import { AtSymbolIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import InstagramPosts from '@/Components/InstagramPosts';

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

  const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

  const submit = (e) => {
    e.preventDefault();
    post(route('ContactPage.store'));
  }

  return (
    <FrontedLayout auth={auth} setting={setting} pages={pages}>
      <Head title="Contact" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20">


        <CoverPage
          title={setting.titleContact}
          image={setting.portadaContact}
        />

        <div className="px-10 content-center">
          {setting.descriptionContact}

          <form className="space-y-2" onSubmit={submit}>
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

          <div className=" space-y-4">
            <p className="flex">
              <MapPinIcon className="size-6" />
              {setting.direction}
            </p>
            <p className="flex">
              <PhoneIcon className="size-6" />
              {setting.phone}
            </p>
            <p className="flex">
              <AtSymbolIcon className="size-6" />
              {setting.email}
            </p>
          </div>
        </div>
      </div>

      {setting.status_instagram_posts == 1 && (
                    
                        <InstagramPosts setting={setting} />
                    
                )}

    </FrontedLayout>
  )
}
