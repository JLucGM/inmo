import Badge from '@/Components/Badge';
import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, posts, role, permission }) {

    const columns = [
        {
            header: "#id",
            accessorKey: "id",
            cell: ({ row }) => {
                return (
                    <>
                        <div className="flex items-center">

                            <p>{row.original.id}</p>
                            <img src={`${row.original.image}`} alt={row.original.image} className='w-14 mx-auto' />
                        </div>
                    </>
                )
            },
        },
        {
            header: "Nombre",
            accessorKey: "name",

            expanded: (row) => {
                // Aquí puedes agregar la información adicional que deseas mostrar
                return (

                    <div className="ms-4 space-y-1">
                        <p>Extracto: {row.original.extract}</p>
                        <a
                            href={route('posts.show', row.original.slug)}
                            target='_blank'
                            rel='noopener noreferrer'
                            className="flex items-start justify-start underline underline-offset-4 text-blue-500 hover:text-blue-400"
                        >
                            <LinkIcon className='size-4 me-2' /> {route('posts.show', row.original.slug)}
                        </a>
                    </div>
                );
            },
        },
        {
            header: "Estado",
            accessorKey: "status",
            cell: ({ row }) => {
                return (
                    <Badge className={` ${row.original.status === 1 ? 'bg-green-600' : 'bg-red-600'}`}>
                        {row.original.status === 1 ? 'Activo' : 'Inactivo'}
                    </Badge>
                )
            },
        },

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
            name: 'Lista de publicaciones',
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
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Publicaciones</h2>
                    {permission.some(perm => perm.name === 'admin.posts.create') && (
                    <Link href={route('post.create')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear
                    </Link>
                    )}
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Publicaciones" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto">
                                <DataTable
                                    columns={columns}
                                    data={posts}
                                    routeEdit={'post.edit'}
                                    routeDestroy={'post.destroy'}
                                    editPermission={'admin.posts.edit'} // Pasa el permiso de editar
                                    deletePermission={'admin.posts.delete'} // Pasa el permiso de eliminar
                                    // downloadPdfPermission={'downloadPdfPermission'} // Pasa el permiso de descargar PDF
                                    permissions={permission}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}