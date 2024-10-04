import Badge from '@/Components/Badge';
import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, faqs }) {
    console.log(faqs)
    const columns = [
        {
            header: "#id",
            accessorKey: "id",
        },
        {
            header: "Nombre",
            accessorKey: "name",
        },
        {
            header: "Estado",
            accessorKey: "status",
            cell: ({ row }) => {
                return (
                    <Badge className={` ${row.original.status === "1" ? 'bg-green-600' : 'bg-red-600'}`}>
                        {row.original.status === "1" ? 'Activo' : 'Inactivo'}
                    </Badge>
                )
            },
        },
    ]
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Faqs</h2>
                    <Link href={route('faqs.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear Faqs
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Faqs" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">

                            <DataTable
                                    columns={columns}
                                    data={faqs}
                                    routeEdit={'faqs.edit'}
                                    routeDestroy={'faqs.destroy'}
                                />
                                {/* <table className="w-full border-collapse border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hover:border-collapse">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="capitalize border-slate-300 border px-6 py-3">
                                                pregunta
                                            </th>
                                            <th scope="col" className="capitalize border-slate-300 border px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="capitalize border-slate-300 border px-6 py-3">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            faqs?.map((faqs) => (

                                                <tr key={faqs.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {faqs.title}
                                                    </th> 
                                                    <th className="border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {faqs.status == 0 ? (
                                                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                                                                Inactivo
                                                            </span>
                                                        ) : (
                                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                                                Activo
                                                            </span>
                                                        )}
                                                    </th>                                                   
                                                    <td className="border border-slate-200 px-6 py-4">
                                                        <div className='space-x-4'>
                                                            <Link
                                                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                                href={route('faqs.edit', [faqs])}>
                                                                Editar
                                                            </Link>
                                                            <Link
                                                                className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                href={route('faqs.destroy', [faqs])} method='delete' as="button">
                                                                Eliminar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}