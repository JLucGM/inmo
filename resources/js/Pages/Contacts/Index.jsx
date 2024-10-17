import Breadcrumb from '@/Components/Breadcrumb';
import ExclamationCircle from '@/Components/Icon/ExclamationCircleIcon';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, Description, DialogPanel, DialogTitle, Select, Transition, TabGroup, TabList, Tab, TabPanels, TabPanel, DialogBackdrop, Button } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from '@/Components/PDF/PDF';

export default function Index({ auth, contacts, properties }) {
    console.log(contacts)
    let [isOpen, setIsOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactProperties, setContactProperties] = useState([]);
    const [reload, setReload] = useState(false);

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
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Contactos</h2>
                    <Link href={route('contacts.create')}
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear
                    </Link>

                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Contactos" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <TabGroup className={'rounded-lg h-screen-[-175] border'} vertical>
                            <div className="grid grid-cols-4">
                                <TabList className="flex flex-col overflow-y-auto rounded-lg h-screen-[-175] border-e">
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
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline capitalize'}>Información básica</Tab>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline capitalize'}>Demandas del cliente</Tab>
                                                            <Tab className={'p-4 rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline capitalize'}>Cruce de propiedades</Tab>
                                                        </TabList>
                                                        <TabPanels className={'p-4 '}>
                                                            <TabPanel>
                                                                <div className="grid grid-cols-3 gap-5">
                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'> Nombre:</span>
                                                                        <p className='capitalize'> {selectedContact.name ? selectedContact.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Email:</span>
                                                                        <p className='capitalize'> {selectedContact.email ? selectedContact.email : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Fecha de nacimiento:</span>
                                                                        <p className='capitalize'>{selectedContact.birthdate ? selectedContact.birthdate : 'no disponible'}                                                                        </p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Teléfono:</span>
                                                                        <p className='capitalize'>{selectedContact.phone ? selectedContact.phone : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
    <span className='capitalize font-semibold text-lg'>Encargado:</span>
    <p className='capitalize'>{selectedContact?.user?.name || 'no disponible'}</p>
</div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>tipo de contacto:</span>
                                                                        <p className='capitalize'>{selectedContact.typecontact.name ? selectedContact.typecontact.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>status de contacto:</span>
                                                                        <p className='capitalize'> {selectedContact.statuscontact.name ? selectedContact.statuscontact.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Medio de captacion:</span>
                                                                        <p className='capitalize'> {selectedContact.origin.name ? selectedContact.origin.name : 'no disponible'}</p>
                                                                    </div>
                                                                </div>
                                                            </TabPanel>
                                                            <TabPanel>
                                                                <div className="grid grid-cols-3 gap-5">
                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>tipo de propiedad:</span>
                                                                        <p className='capitalize'> {selectedContact.typeproperty.name ? selectedContact.typeproperty.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>budget:</span>
                                                                        <p className='capitalize'> {selectedContact.min_budget ? selectedContact.min_budget : 'no disponible'} - {selectedContact.max_budget ? selectedContact.max_budget : ' no disponible'}</p>
                                                                    </div>



                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>bedrooms:</span>
                                                                        <p className='capitalize'> {selectedContact.bedrooms ? selectedContact.bedrooms : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>bathrooms:</span>
                                                                        <p className='capitalize'> {selectedContact.bathrooms ? selectedContact.bathrooms : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Pais:</span>
                                                                        <p className='capitalize'> {selectedContact.country.name ? selectedContact.country.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Estado:</span>
                                                                        <p className='capitalize'> {selectedContact.state.name ? selectedContact.state.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>Ciudad:</span>
                                                                        <p className='capitalize'> {selectedContact.city.name ? selectedContact.city.name : 'no disponible'}</p>
                                                                    </div>

                                                                    <div>
                                                                        <span className='capitalize font-semibold text-lg'>direction:</span>
                                                                        <p className='capitalize'> {selectedContact.direction ? selectedContact.direction : 'no disponible'}</p>
                                                                    </div>
                                                                    <div className='col-span-full'>
                                                                        <span className='capitalize font-semibold text-lg '>description:</span>
                                                                        <p> {selectedContact.description ? selectedContact.description : 'no disponible'}</p>
                                                                    </div>
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
                                                                                                className=" text-white font-bold"
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

                                                                                            <PDFDownloadLink document={<PDF data={property} />} fileName='pfdprueba1.pdf'>

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
                    <DialogPanel className="w-[50rem] space-y-4 border bg-white text-white p-8 dark:bg-gray-800 dark:text-gray-400 rounded-2xl">
                        {selectedProperty ? (
                            <>
                                <DialogTitle className="font-bold text-xl">{selectedProperty.name ? selectedContact.name : 'no disponible'}</DialogTitle>
                                <Description>Información de la propiedad</Description>
                                <div className="xs:grid md:grid xs:grid-cols-1 md:grid-cols-3 gap-4">

                                    <div className="xs:col-span-1 md:col-span-1">
                                        <img src={`/img/properties/${selectedProperty.main}`} alt={selectedProperty.main} className='w-auto mb-4 rounded-lg' />
                                    </div>

                                    <div className="xs:col-span-1 md:col-span-2">
                                        <p className='capitalize'>N. Identification: {selectedProperty.identification ? selectedContact.identification : 'no disponible'}</p>
                                        <p className='capitalize'>Nombre: {selectedProperty.name ? selectedContact.name : 'no disponible'}</p>
                                        <p className='capitalize'>Precio: {selectedProperty.price ? selectedContact.price : 'no disponible'}</p>
                                        <p className='capitalize'>typeproperty: {selectedProperty.typeproperty.name ? selectedContact.typeproperty.name : 'no disponible'}</p>
                                        <p className='capitalize'>bathrooms: {selectedProperty.bathrooms ? selectedContact.bathrooms : 'no disponible'}</p>
                                        <p className='capitalize'>totalMeters: {selectedProperty.totalMeters ? selectedContact.totalMeters : 'no disponible'}</p>
                                        <p className='capitalize'>builtMeters: {selectedProperty.builtMeters ? selectedContact.builtMeters : 'no disponible'}</p>
                                        <p className='capitalize'>bedrooms: {selectedProperty.bedrooms ? selectedContact.bedrooms : 'no disponible'}</p>
                                        <p className='capitalize'>garages: {selectedProperty.garages ? selectedContact.garages : 'no disponible'}</p>
                                        <p className='capitalize'>Dirección: {selectedProperty.direction ? selectedContact.direction : 'no disponible'}, {selectedProperty.country.name}, {selectedProperty.state.name}, {selectedProperty.city.name}</p>
                                    </div>

                                    <div className="col-span-full">
                                        <p className='text-lg'>Comodidades</p>
                                        {selectedProperty.amenities.map((amenity, index) => (
                                            <p key={index}>{amenity.name}</p>
                                        ))}
                                    </div>
                                    <div className="col-span-full">
                                        <p className='capitalize'>description: {selectedProperty.description ? selectedContact.description : 'no disponible'}</p>

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