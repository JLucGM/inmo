import React, { useEffect, useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import BasicInformation from '@/Components/BasicInformation';
import Demands from '@/Components/Demands';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/Components/ui/badge';
import PDFOpenButton from '@/Components/PDF/PDFOpenButton';
import DataTable from '@/Components/DataTable';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';

import { Dialog as HeadlessDialog, DialogPanel as HeadlessDialogPanel, DialogTitle as HeadlessDialogTitle, DialogBackdrop as HeadlessDialogBackdrop } from '@headlessui/react';

export default function Show({ auth, contact, properties, setting }) {
    const [contactProperties, setContactProperties] = useState([]);
    const [reload, setReload] = useState(false);

    // Property preview
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const initialValues = {
        contact_id: contact.id,
        property_id: "",
    };

    const { data, setData, post, recentlySuccessful } = useForm(initialValues);

    const updateContactProperties = () => {
        axios.get(route('contacts.get-contact-properties', [contact.id]))
            .then(response => {
                setContactProperties(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        updateContactProperties();
    }, [contact, reload]);

    const matchingColumns = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Propiedad" />
            ),
            cell: ({ row }) => {
                const property = row.original;
                return (
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedProperty(property);
                            setIsPreviewOpen(true);
                        }}
                        className="capitalize font-medium text-blue-600 dark:text-blue-400 hover:underline text-left outline-none"
                    >
                        #{property.identification || property.id} - {property.name}
                    </button>
                );
            }
        },
        {
            id: 'actions',
            header: () => <div className="text-right px-4">Acciones</div>,
            cell: ({ row }) => {
                const property = row.original;
                const isAssigned = contactProperties.find(cp => cp.property_id === property.id);
                return (
                    <div className="flex justify-end items-center gap-2">
                        {isAssigned ? (
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(property.id)}
                            >
                                Remover
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                onClick={() => crossProperty(property.id)}
                            >
                                Asignar
                            </Button>
                        )}
                        <PDFOpenButton property={property} setting={setting} />
                    </div>
                );
            }
        }
    ];

    const crossProperty = (propertyId) => {
        post(route('contacts-properties.cross', { contact_id: contact.id, property_id: propertyId }), {
            preserveScroll: true,
            onSuccess: () => {
                setReload(!reload);
                updateContactProperties();
            }
        });
    };

    const handleDelete = (propertyId) => {
        // Since Inertia doesn't natively support easy DELETE via basic JS fetch, 
        // we can use axios if the original was a Link or just inertiao post with _method=DELETE
        // The original used Link as="button" method="delete". Let's use Inertia router or axios.
        axios.delete(route('contacts-properties.delete', [contact.id, propertyId]))
            .then(() => {
                setReload(!reload);
                updateContactProperties();
            })
            .catch((err) => console.error(err));
    };

    const assignedIds = useMemo(
        () => new Set(contactProperties.map(cp => cp.property_id)),
        [contactProperties]
    );

    const matchesDemands = (property) => {
        // Tipo de propiedad: coincidencia exacta (categórico)
        if (contact.types_properties_id && property.types_properties_id !== contact.types_properties_id) return false;

        // Precio: rango con 20% de tolerancia
        const price = Number(property.price) || 0;
        const minBudget = Number(contact.min_budget) || 0;
        const maxBudget = Number(contact.max_budget) || 0;
        if (minBudget && maxBudget) {
            const tolerance = (maxBudget - minBudget) * 0.2;
            if (price < minBudget - tolerance || price > maxBudget + tolerance) return false;
        } else if (minBudget && price < minBudget * 0.8) return false;
        else if (maxBudget && price > maxBudget * 1.2) return false;

        // Habitaciones: ±1
        const beds = Number(property.bedrooms) || 0;
        const wantedBeds = Number(contact.bedrooms) || 0;
        if (wantedBeds && (beds < wantedBeds - 1 || beds > wantedBeds + 1)) return false;

        // Baños: ±1
        const baths = Number(property.bathrooms) || 0;
        const wantedBaths = Number(contact.bathrooms) || 0;
        if (wantedBaths && (baths < wantedBaths - 1 || baths > wantedBaths + 1)) return false;

        // Ubicación: jerárquico estricto (país → estado → ciudad)
        if (contact.country_id && property.country_id !== contact.country_id) return false;
        if (contact.state_id && property.state_id !== contact.state_id) return false;
        if (contact.city_id && property.city_id !== contact.city_id) return false;

        return true;
    };

    const sortedProperties = useMemo(() => {
        const matching = [];
        const others = [];
        for (const prop of properties) {
            if (assignedIds.has(prop.id)) continue;
            if (matchesDemands(prop)) matching.push(prop);
            else others.push(prop);
        }
        return [...matching, ...others];
    }, [properties, contact, assignedIds]);

    const matchColumn = {
        id: 'match',
        header: '',
        cell: ({ row }) => {
            const isMatching = matchesDemands(row.original);
            return (
                <div className="flex items-center justify-center">
                    {isMatching && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 text-xs whitespace-nowrap">
                            Coincide
                        </Badge>
                    )}
                </div>
            );
        }
    };

    const extendedColumns = [matchColumn, ...matchingColumns];

    const assignedProperties = useMemo(() => {
        return contactProperties
            .map(cp => properties.find(p => p.id === cp.property_id))
            .filter(Boolean);
    }, [contactProperties, properties]);

    const assignedColumns = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Propiedad" />
            ),
            cell: ({ row }) => (
                <button
                    type="button"
                    onClick={() => {
                        setSelectedProperty(row.original);
                        setIsPreviewOpen(true);
                    }}
                    className="capitalize font-medium text-blue-600 dark:text-blue-400 hover:underline text-left"
                >
                    #{row.original.identification || row.original.id} - {row.original.name}
                </button>
            ),
        },
        // {
        //     accessorKey: 'price',
        //     header: ({ column }) => (
        //         <DataTableColumnHeader column={column} title="Precio" />
        //     ),
        //     cell: ({ row }) => <span>${Number(row.original.price).toLocaleString()}</span>,
        // },
        {
            id: 'actions',
            header: () => <div className="text-right">Acción</div>,
            cell: ({ row }) => (
                <div className="flex justify-end gap-2">
                    <PDFOpenButton property={row.original} setting={setting} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
                        Remover
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}


            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title={`Contacto: ${contact.name}`}
                        subtitle="Detalles completos e información del cliente."
                    />
                    <div className="space-x-3">
                        <Link href={route('contacts.index')}
                            className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Volver
                        </Link>
                        <Link href={route('contacts.edit', contact.id)}
                            className="capitalize py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-full border border-blue-600 hover:bg-blue-700"
                        >
                            Editar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head className="capitalize" title={`Contacto: ${contact.name}`} />

            <div className="p-4 space-y-4 flex flex-col items-center sm:items-stretch h-full">
                {recentlySuccessful && (
                    <Alert className="border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Cruce modificado exitosamente!</AlertDescription>
                    </Alert>
                )}

                {/* Main Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <div className="col-span-full lg:col-span-2 space-y-4">
                        <ContainerTitle
                            title="Cruce de Propiedades"
                            subtitle="Aquí puedes asignar los inmuebles ideales basados en las demandas del cliente."
                        >
                            <div className="flex flex-col gap-4">
                                <DataTable
                                    columns={extendedColumns}
                                    data={sortedProperties}
                                />
                            </div>
                        </ContainerTitle>

                        <ContainerTitle
                            title="Propiedades Asignadas"
                            subtitle="Propiedades que han sido asignadas a este contacto."
                        >
                            {assignedProperties.length > 0 ? (
                                <DataTable
                                    columns={assignedColumns}
                                    data={assignedProperties}
                                />
                            ) : (
                                <p className="text-sm text-gray-500">Aún no hay propiedades asignadas a este contacto.</p>
                            )}
                        </ContainerTitle>
                    </div>

                    <div className="space-y-6 w-full col-span-full lg:col-span-1">
                        <ContainerTitle
                            title="Información de Contacto"
                            subtitle="Detalles completos del contacto."
                        >
                            <BasicInformation selectedContact={contact} />
                        </ContainerTitle>

                        <ContainerTitle
                            title="Demandas del Contacto"
                            subtitle="Las necesidades y preferencias del contacto."
                        >
                            <Demands selectedContact={contact} />
                        </ContainerTitle>
                    </div>
                </div>
            </div>

            {/* PREVIEW MODAL (Used the fallback headless UI to guarantee styles won't conflict with Shadcn's inner Dialogs) */}
            <HeadlessDialog open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} className="relative z-100">
                <HeadlessDialogBackdrop className="fixed inset-0 bg-black/60 transition-opacity" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <HeadlessDialogPanel className="w-full max-w-4xl max-h-[85vh] overflow-y-auto space-y-4 border bg-white p-6 md:p-8 dark:border-gray-700 dark:bg-gray-900 shadow-2xl rounded-2xl">
                        {selectedProperty ? (
                            <>
                                <HeadlessDialogTitle className="font-bold text-2xl text-gray-900 dark:text-white capitalize">
                                    #{selectedProperty.identification || 'no disponible'}, {selectedProperty.name || 'no disponible'}
                                </HeadlessDialogTitle>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
                                    <div className="md:col-span-1">
                                        {selectedProperty.media && selectedProperty.media.length > 0 ? (
                                            <img
                                                src={selectedProperty.media[0].original_url}
                                                alt={selectedProperty.name}
                                                className='w-full h-auto aspect-square object-cover rounded-xl shadow-sm border border-gray-100 dark:border-gray-800'
                                                onError={(e) => { e.target.src = '/img/placeholder-property.jpg'; }}
                                            />
                                        ) : (
                                            <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                                <span className="text-gray-400">Sin imagen</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="md:col-span-2 text-gray-700 dark:text-gray-300">
                                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                                            <p><strong className="dark:text-white">Precio:</strong> {selectedProperty.price || 'N/A'}</p>
                                            <p className="capitalize"><strong className="dark:text-white">Tipo:</strong> {selectedProperty.typeproperty?.name || 'N/A'}</p>
                                            <p><strong className="dark:text-white">Baños:</strong> {selectedProperty.bathrooms || 'N/A'}</p>
                                            <p><strong className="dark:text-white">Habitaciones:</strong> {selectedProperty.bedrooms || 'N/A'}</p>
                                            <p><strong className="dark:text-white">M. Totales:</strong> {selectedProperty.totalMeters || 'N/A'}</p>
                                            <p><strong className="dark:text-white">M. Construidos:</strong> {selectedProperty.builtMeters || 'N/A'}</p>
                                            <p><strong className="dark:text-white">Garajes:</strong> {selectedProperty.garages || 'N/A'}</p>
                                            <div className="col-span-full mt-2">
                                                <strong className="dark:text-white">Dirección:</strong> {selectedProperty.direction}, {selectedProperty.city?.name}, {selectedProperty.state?.name}, {selectedProperty.country?.name}
                                            </div>
                                        </div>
                                        {selectedProperty.amenities?.length > 0 && (
                                            <>
                                                <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 pb-1 border-b dark:border-gray-700'>Comodidades</h4>
                                                <ul className="list-disc pl-5 grid grid-cols-2 gap-1 text-sm">
                                                    {selectedProperty.amenities.map((amenity, idx) => (
                                                        <li key={`amenity-${amenity.id || idx}`}>{amenity.name}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center py-4">Cargando...</p>
                        )}
                        <div className="flex justify-end mt-6 pt-4 border-t dark:border-gray-800">
                            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                                Cerrar Previsualización
                            </Button>
                        </div>
                    </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>

        </AuthenticatedLayout>
    );
}
