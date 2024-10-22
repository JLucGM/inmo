import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, typesproperties }) {
    // console.log(typesproperties)

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
                    <div className='flex'>
                        <img src={`${row.original.image}`} alt={row.original.image} className='w-40 rounded-3xl' />
                        <div className="ms-4">
                            <p>id {row.original.id}</p>
                            <p>Nombre: {row.original.name}</p>
                        </div>
                    </div>
                );
            },
        }
    ]

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de tipo de propiedades',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tipos De Propiedades</h2>
                    <Link href={route('typesproperties.create')}
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >Crear
                    </Link>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Tipo De Propiedad" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">

                                <DataTable
                                    columns={columns}
                                    data={typesproperties}
                                    routeEdit={'typesproperties.edit'}
                                    routeDestroy={'typesproperties.destroy'}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}