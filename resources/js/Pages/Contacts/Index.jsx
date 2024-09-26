import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Description, DialogPanel, DialogTitle, Select, Transition, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Index({ auth, contacts, properties }) {
    //console.log(contacts)
    let [isOpen, setIsOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState(null);

    const initialValues = {
        contact_id: selectedContact ? selectedContact.id : "",

        property_id: properties[0].id,
    }

    useEffect(() => {
        if (selectedContact) {
            setData('contact_id', selectedContact.id);
        }
    }, [selectedContact]);

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const crossProperty = (propertyId) => {
        setData('property_id', propertyId);
        post(route('contacts-properties.cross'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contactos</h2>
                    <Link href={route('contacts.create')}
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear contacto
                    </Link>

                </div>
            }
        >
            <Head className="capitalize" title="Contactos" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <TabGroup className={'h-screen-[-175] border'} vertical>
                            <div className="grid grid-cols-4">
                                <TabList className="flex flex-col overflow-y-auto h-screen-[-175] border-e">
                                    {
                                        contacts?.map((contact) => (
                                            <Tab
                                                key={contact.id}
                                                className="py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                                onClick={() => setSelectedContact(contact)}
                                            >
                                                {contact.name}

                                            </Tab>
                                        ))}

                                </TabList>
                                <TabPanels className="col-span-3 p-4">
                                    {
                                        contacts?.map((contact, index) => (
                                            <TabPanel key={contact.id} index={index}>
                                                {selectedContact && (
                                                    <TabGroup className={'dark:text-gray-400'}>
                                                        <div className="flex justify-between mb-4">

                                                            <p className='capitalize font-semibold'>{selectedContact.name}</p>
                                                            <div>
                                                                {/* <button onClick={() => {
                                                                    setIsOpen(true);
                                                                    setData('contact_id', contact.id); // Establecer el valor de contact_id en el objeto data
                                                                    console.log('Contact ID:', contact.id);
                                                                }} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Open dialog</button> */}
                                                                <Link
                                                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                                    href={route('contacts.edit', [contact])}>
                                                                    Editar
                                                                </Link>
                                                                <Link
                                                                    className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                    href={route('contacts.destroy', [contact])} method='delete' as="button">
                                                                    Eliminar
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <TabList className={'flex justify-between'}>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline'}>Información básica</Tab>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline'}>Demandas del inmueble</Tab>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline'}>Cruce de propiedades</Tab>
                                                        </TabList>
                                                        <TabPanels className={'p-4 '}>
                                                            <TabPanel>
                                                                <div className="grid grid-cols-3 gap-5">
                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'> Nombre:</span>
                                                                        <p> {selectedContact.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Email:</span>
                                                                        <p> {selectedContact.email}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Dirección:</span>
                                                                        <p> {selectedContact.birthdate}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Teléfono:</span>
                                                                        <p>{selectedContact.phone}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Encargado:</span>
                                                                        <p> {selectedContact.user.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>tipo de contacto:</span>
                                                                        <p>{selectedContact.typecontact.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>status de contacto:</span>
                                                                        <p> {selectedContact.statuscontact.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Medio de captacion:</span>
                                                                        <p> {selectedContact.origin.name}</p>
                                                                    </div>
                                                                </div>
                                                            </TabPanel>
                                                            <TabPanel>
                                                                <div className="grid grid-cols-3 gap-5">
                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>tipo de propiedad:</span>
                                                                        <p> {selectedContact.typeproperty.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Min budget:</span>
                                                                        <p> {selectedContact.min_budget}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Max budget:</span>
                                                                        <p> {selectedContact.max_budget}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>bedrooms:</span>
                                                                        <p> {selectedContact.bedrooms}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>bathrooms:</span>
                                                                        <p> {selectedContact.bathrooms}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Pais:</span>
                                                                        <p> {selectedContact.country.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Estado:</span>
                                                                        <p> {selectedContact.state.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Ciudad:</span>
                                                                        <p> {selectedContact.city.name}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>direction:</span>
                                                                        <p> {selectedContact.direction}</p>
                                                                    </div>
                                                                </div>

                                                                <div className='mt-4'>
                                                                    <span className='capitalize font-semibold text-lg '>description:</span>
                                                                    <p> {selectedContact.description}</p>
                                                                </div>
                                                            </TabPanel>
                                                            <TabPanel>
                                                                <Transition
                                                                    show={recentlySuccessful}
                                                                    enter="transition ease-in-out"
                                                                    enterFrom="opacity-0"
                                                                    leave="transition ease-in-out"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                                                                </Transition>
                                                                <h2>Inmuebles</h2>
                                                                <ul>
                                                                    {properties.map((property) => (
                                                                        <li key={property.id}>
                                                                            {property.name}
                                                                            <button
                                                                                className="btn btn-primary"
                                                                                onClick={() => crossProperty(property.id)}
                                                                            >
                                                                                Asignar a contacto
                                                                            </button>
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                            </TabPanel>
                                                        </TabPanels>
                                                    </TabGroup>
                                                )}
                                            </TabPanel>
                                        ))}
                                </TabPanels>
                            </div>
                        </TabGroup>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}