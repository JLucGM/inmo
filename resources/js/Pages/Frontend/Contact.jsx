import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

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

    </FrontedLayout>
  )
}
