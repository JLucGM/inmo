import Breadcrumb from '@/Components/Breadcrumb';
import ExclamationCircle from '@/Components/Icon/ExclamationCircleIcon';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Description, DialogPanel, DialogTitle, Select, Transition, TabGroup, TabList, Tab, TabPanels, TabPanel, DialogBackdrop, Button } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from '@/Components/PDF/PDF';
import Demands from '@/Components/Demands';
import BasicInformation from '@/Components/BasicInformation';
import { Alert } from 'flowbite-react';
import SectionHeader from '@/Components/SectionHeader';

export default function Index({ auth, contacts, properties, role, permission, setting }) {
    // console.log(contacts)
    let [isOpen, setIsOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactProperties, setContactProperties] = useState([]);
    const [reload, setReload] = useState(false);
    // console.log(selectedProperty)
    const initialValues = {
        contact_id: selectedContact ? selectedContact.id : "",
        property_id: "",
    }

    useEffect(() => {
        if (selectedContact) {
            axios.get(route('contacts.get-contact-properties', [selectedContact.id]))
                .then(response => {
                    setContactProperties(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [selectedContact]);

    useEffect(() => {
        if (selectedContact) {
            //console.log('selectedContact:', selectedContact);

            setData('contact_id', selectedContact.id);
        }
    }, [selectedContact]);

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const crossProperty = (propertyId) => {
        //console.log(propertyId)
        post(route('contacts-properties.cross', { contact_id: data.contact_id, property_id: propertyId }));
        setReload(!reload); // Update the state to trigger a re-render
        setTimeout(() => {
            updateContactProperties(); // Llama a la función para actualizar la lista de propiedades
        }, 1000);
    };

    const handleDelete = (contactId, propertyId) => {
        setReload(!reload); // Update the state to trigger a re-render
        setTimeout(() => {
            updateContactProperties(); // Llama a la función para actualizar la lista de propiedades
        }, 1000);
    };

    const updateContactProperties = () => {
        axios.get(route('contacts.get-contact-properties', [selectedContact.id]))
            .then(response => {
                setContactProperties(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de contactos',
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
                    <SectionHeader 
                        title="Lista de contactos"
                        subtitle="Aquí puedes gestionar los contactos de clientes."
                    />
                    {/* <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Lista de contactos</h2> */}
                    {permission.some(perm => perm.name === 'admin.contactos.create') && (
                        <Link href={route('contacts.create')}
                            className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Crear contactos
                        </Link>
                    )}
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Contactos" />

            <div className="">
                <div className="max-w-7xl mx-auto p-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <TabGroup className={'rounded-lg md:h-screen-[-175] border'} vertical>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <TabList className="flex flex-col overflow-y-auto rounded-lg h-44 md:h-screen-[-175] md:border-b md:flex-rowf md:overflow-hidden border-e">
                                    {
                                        contacts?.length > 0 ? (
                                            contacts.map((contact) => (
                                                <Tab
                                                    key={contact.id}
                                                    className="py-5 bg-white border-b capitalize text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 data-[selected]:bg-blue-500 data-[selected]:text-white"
                                                    onClick={() => setSelectedContact(contact)}
                                                >
                                                    {contact.name}
                                                </Tab>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center p-4 text-gray-700 dark:text-gray-400">
                                                <ExclamationCircle className="size-8" />
                                                <p> No hay contactos creados.</p>
                                            </div>
                                        )
                                    }
                                </TabList>
                                <TabPanels className="col-span-3 p-4">
                                    {
                                        contacts?.map((contact, index) => (
                                            <TabPanel key={contact.id} index={index}>
                                                {selectedContact && (
                                                    <TabGroup className={'dark:text-gray-400'}>
                                                        <div className="flex justify-between mb-4">

                                                            <p className='capitalize font-semibold'>{selectedContact.name ? selectedContact.name : 'no disponible'}</p>
                                                            <div className='space-x-4'>
                                                                <Link
                                                                    className="py-2.5 px-5 text-sm font-medium text-gray-900  bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                                    href={route('contacts.edit', [contact])}>
                                                                    Editar
                                                                </Link>
                                                                <Link
                                                                    className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 rounded-full text-sm font-medium text-white dark:text-gray-200 Capitalize tracking-widest hover:bg-gray-700 dark:hover:bg-red-400 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2'
                                                                    href={route('contacts.destroy', [contact])} method='delete' as="button">
                                                                    Eliminar
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <TabList className={'flex justify-between'}>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline capitalize'}>Información</Tab>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline capitalize'}>Demandas</Tab>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline capitalize'}>Cruce</Tab>
                                                        </TabList>
                                                        <TabPanels className={'p-4 '}>
                                                            <TabPanel>
                                                                <BasicInformation selectedContact={selectedContact} />
                                                            </TabPanel>
                                                            <TabPanel>
                                                                <Demands selectedContact={selectedContact} />
                                                            </TabPanel>
                                                            <TabPanel>
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
                                                                            <span className="font-medium">¡Guardado exitosamente!</span>
                                                                        </Alert>
                                                                    </div>
                                                                </Transition>
                                                                <SectionHeader
                                                                    title="Cruces de propiedades - clientes"
                                                                    subtitle="Puedes asignar las propiedades más relevantes para el contacto."
                                                                />
                                                                <ul className='overflow-y-auto max-h-96'>
                                                                    <table className="table-auto w-full">
                                                                        <thead className=''>
                                                                            <tr className='border dark:border-gray-700'>
                                                                                <th className="px-4 py-2">Nombre de la propiedad</th>
                                                                                <th className="px-4 py-2">Acciones</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {properties.length > 0 ? (
                                                                                properties.map((property) => (
                                                                                    <tr key={property.id} className='bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-900'>
                                                                                        <td className="px-4 py-2">
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setIsOpen(true);
                                                                                                    setSelectedProperty(property);
                                                                                                }}
                                                                                                className="capitalize text-white font-bold"
                                                                                            >
                                                                                                {property.name}
                                                                                            </button>
                                                                                        </td>
                                                                                        <td className="px-4 py-2 flex justify-center space-x-4">
                                                                                            {contactProperties.find((cp) => cp.property_id === property.id) ? (
                                                                                                <Link
                                                                                                    className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                                                    href={route('contacts-properties.delete', [selectedContact.id, property.id])}
                                                                                                    method='delete'
                                                                                                    as="button"
                                                                                                    onClick={() => handleDelete(selectedContact.id, property.id)}
                                                                                                >
                                                                                                    Eliminar
                                                                                                </Link>
                                                                                            ) : (
                                                                                                <PrimaryButton
                                                                                                    onClick={() => crossProperty(property.id)}
                                                                                                >
                                                                                                    Asignar
                                                                                                </PrimaryButton>
                                                                                            )}

                                                                                            <PDFDownloadLink document={<PDF data={property} setting={setting} />} fileName='propiedad.pdf'>
                                                                                                <Button
                                                                                                    className='inline-flex items-center px-4 py-2 bg-orange-800 dark:bg-orange-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                                                >
                                                                                                    PDF
                                                                                                </Button>
                                                                                            </PDFDownloadLink>

                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ) : (
                                                                                <tr>
                                                                                    <td colSpan="2" className="text-center py-4">No hay propiedades creadas</td>
                                                                                </tr>
                                                                            )}
                                                                        </tbody>
                                                                    </table>
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



            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/40" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-[55rem] max-h-[80vh] overflow-y-auto space-y-4 border bg-white text-white p-8 dark:bg-gray-800 dark:text-gray-400 rounded-2xl">
                        {selectedProperty ? (
                            <>
                                <DialogTitle className="font-bold text-xl">#{selectedProperty.identification || 'no disponible'}, {selectedProperty.name || 'no disponible'}</DialogTitle>
                                {/* <Description>#{selectedProperty.identification || 'no disponible'}, {selectedProperty.name || 'no disponible'}</Description> */}
                                <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-4 items-center">

                                    <div className="xs:col-span-1 md:col-span-1">
                                        {/* Imagen principal: Primera de media */}
                                        {selectedProperty.media && selectedProperty.media.length > 0 ? (
                                            <img
                                                src={selectedProperty.media[0].original_url}
                                                alt={selectedProperty.name || 'Imagen principal de propiedad'}
                                                className='w-full max-w-sm h-64 object-cover rounded-lg mb-4'
                                                onError={(e) => { // Fallback si falla
                                                    e.target.src = '/img/placeholder-property.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full max-w-sm h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                                                <span className="text-gray-500">Sin imagen disponible</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="xs:col-span-1 md:col-span-2">
                                        <div className="grid grid-cols-2 gap-1 mb-2">

                                            <p className='capitalize'>Precio: {selectedProperty.price || 'no disponible'}</p>
                                            <p className='capitalize'>Tipo de propiedad: {selectedProperty.typeproperty.name || 'no disponible'}</p>
                                            <p className='capitalize'>Baños: {selectedProperty.bathrooms || 'no disponible'}</p>
                                            <p className='capitalize'>Metros totales: {selectedProperty.totalMeters || 'no disponible'}</p>
                                            <p className='capitalize'>Metros construidos: {selectedProperty.builtMeters || 'no disponible'}</p>
                                            <p className='capitalize'>Habitaciones: {selectedProperty.bedrooms || 'no disponible'}</p>
                                            <p className='capitalize'>Garajes: {selectedProperty.garages || 'no disponible'}</p>
                                            <p className='capitalize col-span-full'>Dirección: {selectedProperty.direction || 'no disponible'}, {selectedProperty.country.name}, {selectedProperty.state.name}, {selectedProperty.city.name}</p>
                                        </div>
                                        <p className='text-lg'>Comodidades</p>
                                        <ul className="ms-5 list-disc">
                                            {selectedProperty.amenities.map((amenity, index) => (
                                                <li key={index}>{amenity.name}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="col-span-full">
                                    </div>
                                    <div className="col-span-full">
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>No se ha seleccionado ninguna propiedad</p>
                        )}
                        <div className="flex justify-end">
                            <button onClick={() => setIsOpen(false)}>Cerrar</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </AuthenticatedLayout>
    )
}