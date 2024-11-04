import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Select, Textarea } from '@headlessui/react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';
import { useRef } from 'react';
import TextAreaRich from '@/Components/TextAreaRich';

export default function Create({ auth, contacts, properties, users }) {

    const initialValues = {
        name: "",
        body: "",
        status: "0",
        contact_id: contacts.length > 0 ? contacts[0].id : "",
        property_id: properties.length > 0 ? properties[0].id : "",
        user_id: users.length > 0 ? users[0].id : "",
    }

    const { data, setData, errors, post } = useForm(initialValues)
    const textAreaRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        post(route('documents.store'))
        console.log(data)
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
            name: 'Lista de documentos',
            href: 'documents.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear documento',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },

    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear documentos
                    </h2>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear documentos" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

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


                                    <div>
                                        <InputLabel htmlFor="contacts" value="Contacto" />

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

                                        <InputError message={errors.contact_id} className="mt-2" />
                                    </div>



                                    <div>
                                        <InputLabel htmlFor="properties" value="propiedades" />

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

                                        <InputError message={errors.property_id} className="mt-2" />
                                    </div>


                                    <div>
                                        <InputLabel htmlFor="users" value="Agente" />

                                        <select
                                            name="user_id"
                                            id="users"
                                            className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                            value={data.user_id} // Establecer el valor del select con el valor de user_id
                                            onChange={(e) => {
                                                setData('user_id', parseInt(e.target.value));
                                            }}
                                        >
                                            {users.map((users) => (
                                                <option value={users.id} key={users.id}>
                                                    {users.name}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError message={errors.users} className="mt-2" />
                                    </div>

                                    <div className='md:col-span-2 lg:col-span-1'>
                                        <InputLabel htmlFor="status" value="Publicar" />

                                        <select
                                            name="status"
                                            id="status"
                                            value={data.status}
                                            className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-full shadow-sm"
                                            onChange={(e) => setData('status', e.target.value)}
                                        >
                                            <option value={0}>Nuevo</option>
                                            <option value={1}>Revisión</option>
                                            <option value={2}>Archivado</option>
                                            <option value={3}>Finalizado</option>
                                        </select>

                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    
                                    <div className='col-span-2'>
                                        <InputLabel htmlFor="body" value="descripcion" />

                                        {/* <Textarea
                                            name="body"
                                            value={data.body}
                                            rows={10}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                            onChange={(e) => setData('body', e.target.value)}>

                                        </Textarea> */}

                                        <TextAreaRich

initialValue={data.body}
ref={textAreaRef}
name="body"
onChange={(newText) => setData('body', newText)}
/>

                                        <InputError message={errors.body} className="mt-2" />
                                    </div>

                                </ContainerTitle>
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