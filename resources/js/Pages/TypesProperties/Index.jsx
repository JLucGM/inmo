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
                        <img src={`/img/typeProperties/${row.original.image}`} alt={row.original.image} className='w-40' />
                        <div className="ms-4">
                            <p>id {row.original.id}</p>
                            <p>Nombre: {row.original.name}</p>
                        </div>
                    </div>
                );
            },
        }
    ]
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">tipos de propiedades</h2>
                    <Link href={route('typesproperties.create')}
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >Crear tipo de propiedad
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Tipo De Propiedad" />

            <div className="p-6">
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