import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Edit({ auth, task, statuses,contacts,typetasks,properties }) {

    const initialValues = {
        name: task.name,
        start_time: task.start_time,
        end_time: task.end_time,
        description: task.description,
        contact_id: task.contact_id,
        types_tasks_id: task.types_tasks_id,
        property_id: task.property_id,
        status_contacts_id: task.status_contacts_id,
    }

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.update', task))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Actualizar pais</h2>
                    <Link href={route('countries.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear pais
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Actualizar pais" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

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
                                    <InputLabel htmlFor="start_time" value="start_time" />

                                    <TextInput
                                        id="start_time"
                                        type="date"
                                        name="start_time"
                                        value={data.start_time}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('start_time', e.target.value)}
                                    />

                                    <InputError message={errors.start_time} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_time" value="end_time" />

                                    <TextInput
                                        id="end_time"
                                        type="date"
                                        name="end_time"
                                        value={data.end_time}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('end_time', e.target.value)}
                                    />

                                    <InputError message={errors.end_time} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="descripcion" />

                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('description', e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="statuses" value="Status de tarea" />

                                    <select
                                        name="status_contacts_id"
                                        id="statuses"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.status_contacts_id} // Establecer el valor del select con el valor de status_contacts_id
                                        onChange={(e) => {
                                            setData('status_contacts_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {statuses.map((statuses) => (
                                            <option value={statuses.id} key={statuses.id}>
                                                {statuses.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.statuses} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="contacts" value="Contacto" />

                                    <select
                                        name="contact_id"
                                        id="contacts"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.contact_id} // Establecer el valor del select con el valor de contact_id
                                        onChange={(e) => {
                                            setData('contact_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {contacts.map((contacts) => (
                                            <option value={contacts.id} key={contacts.id}>
                                                {contacts.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.statuses} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="typetasks" value="tipo de tares" />

                                    <select
                                        name="property_id"
                                        id="typetasks"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.property_id} // Establecer el valor del select con el valor de property_id
                                        onChange={(e) => {
                                            setData('property_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {typetasks.map((typetasks) => (
                                            <option value={typetasks.id} key={typetasks.id}>
                                                {typetasks.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.statuses} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="properties" value="tipo de tares" />

                                    <select
                                        name="types_tasks_id"
                                        id="properties"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.types_tasks_id} // Establecer el valor del select con el valor de types_tasks_id
                                        onChange={(e) => {
                                            setData('types_tasks_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {properties.map((properties) => (
                                            <option value={properties.id} key={properties.id}>
                                                {properties.name}
                                            </option>
                                        ))}
                                    </select>
                                    </div>

                                <div className="flex justify-end p-2.5">
                                    <PrimaryButton >
                                        Guardar
                                    </PrimaryButton>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}