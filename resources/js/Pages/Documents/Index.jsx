import Badge from '@/Components/Badge';
import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, documents }) {

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
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    const columns = [
        {
            header: "#id",
            accessorKey: "id",
        },
        {
            header: "Nombre",
            accessorKey: "name",
            expanded: (row) => {
                // Aquí puedes agregar la información adicional que deseas mostrar
                return (
                    <div>
                        <p className='capitalize'>Contacto: {row.original.contact.name}</p>
                        <p className='capitalize'>Agente: {row.original.user.name}</p>
                        <p className='capitalize'>Propiedad: {row.original.property.name}</p>
                        
                    </div>
                );
            },
        },
        {
            header: "Estado",
            accessorKey: "status",
            cell: ({row}) => {
                let badgeClass = '';
                let badgeText = '';
    
                switch (row.original.status) {
                    case 0:
                        badgeClass = 'bg-green-600';
                        badgeText = 'Nuevo';
                        break;
                    case 1:
                        badgeClass = 'bg-orange-600';
                        badgeText = 'Revisión';
                        break;
                    case 2:
                        badgeClass = 'bg-gray-600';
                        badgeText = 'Archivado';
                        break;
                    case 3:
                        badgeClass = 'bg-blue-600';
                        badgeText = 'Finalizado';
                        break;
                    default:
                        badgeClass = 'bg-red-600';
                        badgeText = 'Desconocido';
                }
    
                return (
                    <Badge className={` ${badgeClass}`}>
                        {badgeText}
                    </Badge>
                );
            }, 
        }, 
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Documentos</h2>
                    <Link href={route('documents.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear
                    </Link>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Documentos" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">
                                {Array.isArray(documents) && documents.length > 0 ? (
                                    <DataTable
                                        columns={columns}
                                        data={documents}
                                        routeEdit={'documents.edit'}
                                        routeDestroy={'documents.destroy'}
                                    />
                                ) : (
                                    <p className='text-sm'>No hay documentos disponibles.</p>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}