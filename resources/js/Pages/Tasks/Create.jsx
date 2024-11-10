import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Select, Textarea } from '@headlessui/react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Create({ auth, statuses, contacts, typetasks, properties, role, permission }) {

    const initialValues = {
        name: "",
        start_time: "",
        end_time: "",
        description: "",
        contact_id: contacts.length > 0 ? contacts[0].id : "",
        types_tasks_id: typetasks.length > 0 ? typetasks[0].id : "",
        property_id: properties.length > 0 ? properties[0].id : "",
        status_contacts_id: statuses.length > 0 ? statuses[0].id : "",
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'))
        // console.log(data)
    }

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de tareas',
            href: 'tasks.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear de tarea',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },

    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear
                    </h2>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear tarea" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                        <div className='col-span-2'>
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

                                        <div className='col-span-2'>
                                            <InputLabel htmlFor="description" value="descripcion" />

                                            <Textarea
                                                name="description"
                                                value={data.description}
                                                rows={10}
                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                onChange={(e) => setData('description', e.target.value)}>

                                            </Textarea>

                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                    </ContainerTitle>

                                    <ContainerTitle title={'Datos secundaria'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                        <div className='col-span-1'>
                                            <InputLabel htmlFor="start_time" value="Fecha de inicio" />

                                            <TextInput
                                                id="start_time"
                                                type="datetime-local"
                                                name="start_time"
                                                value={data.start_time}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('start_time', e.target.value)}
                                            />

                                            <InputError message={errors.start_time} className="mt-2" />
                                        </div>

                                        <div className='col-span-1'>
                                            <InputLabel htmlFor="end_time" value="Fecha de culminación" />

                                            <TextInput
                                                id="end_time"
                                                type="datetime-local"
                                                name="end_time"
                                                value={data.end_time}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('end_time', e.target.value)}
                                            />

                                            <InputError message={errors.end_time} className="mt-2" />
                                        </div>

                                        <div className='col-span-full'>
                                            <InputLabel htmlFor="statuses" value="Status de tarea" />

                                            <Select
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
                                            </Select>

                                            <InputError message={errors.statuses} className="mt-2" />
                                        </div>

                                        <div className='col-span-full'>
                                            <div className="flex justify-between">
                                                <InputLabel htmlFor="contacts" value="Contacto" />
                                                {permission.some(perm => perm.name === 'admin.tasks.index') && (
                                                    <Link className='text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4' href={route('contacts.create')}>Crear</Link>
                                                )}
                                            </div>

                                            <Select
                                                name="contact_id"
                                                id="contacts"
                                                className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                value={data.contact_id} // Establecer el valor del select con el valor de contact_id
                                                onChange={(e) => {
                                                    setData('contact_id', parseInt(e.target.value));
                                                }}
                                            >
                                                {contacts.length === 0 ? (
                                                    <option value="" disabled>
                                                        No contacts created
                                                    </option>
                                                ) : (
                                                    contacts.map((contact) => (
                                                        <option value={contact.id} key={contact.id}>
                                                            {contact.name}
                                                        </option>
                                                    ))
                                                )}
                                            </Select>

                                            <InputError message={errors.statuses} className="mt-2" />
                                        </div>

                                        <div className='col-span-full'>
                                            <InputLabel htmlFor="typetasks" value="tipo de tarea" />

                                            <Select
                                                name="types_tasks_id"
                                                id="typetasks"
                                                value={data.types_tasks_id} // Establecer el valor del select con el valor de types_tasks_id
                                                className={'mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm '}
                                                onChange={(e) => {
                                                    setData('types_tasks_id', parseInt(e.target.value));
                                                }}                                >
                                                {typetasks.map((typetasks) => (
                                                    <option value={typetasks.id} key={typetasks.id}>
                                                        {typetasks.name}
                                                    </option>
                                                ))}
                                            </Select>

                                            <InputError message={errors.statuses} className="mt-2" />
                                        </div>

                                        <div className='col-span-full'>
                                            <div className="flex justify-between">
                                                <InputLabel htmlFor="properties" value="propiedades" />
                                                {permission.some(perm => perm.name === 'admin.tasks.index') && (
                                                    <Link className='text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4' href={route('properties.create')}>Crear</Link>
                                                )}
                                            </div>

                                            <Select
                                                name="property_id"
                                                id="properties"
                                                className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                value={data.property_id} // Establecer el valor del select con el valor de property_id
                                                onChange={(e) => {
                                                    setData('property_id', parseInt(e.target.value));
                                                }}
                                            >
                                                {properties.length === 0 ? (
                                                    <option value="" disabled>
                                                        No properties created
                                                    </option>
                                                ) : (
                                                    properties.map((property) => (
                                                        <option value={property.id} key={property.id}>
                                                            {property.name}
                                                        </option>
                                                    ))
                                                )}
                                            </Select>

                                            <InputError message={errors.statuses} className="mt-2" />
                                        </div>

                                    </ContainerTitle>

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