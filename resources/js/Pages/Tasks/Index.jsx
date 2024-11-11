import Badge from '@/Components/Badge';
import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, tasks, role, permission }) {
    // console.log(tasks)
    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de tareas',
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
            header: "Tarea",
            accessorKey: "name",
            expanded: (row) => {
                // Aquí puedes agregar la información adicional que deseas mostrar
                return (
                    <div>
                        <div className="flex space-x-2">
                            <p><span className='font-bold'>Inicio:</span> {row.original.start_time}</p>
                            <p><span className='font-bold'>Fin:</span> {row.original.start_time}</p>
                        </div>
                        <p className='capitalize'>Contacto: {row.original.contact.name}</p>
                        <p className='capitalize'>Propiedad: {row.original.property.name}</p>
                    </div>
                );
            },
        },
        {
            header: "Agente",
            accessorKey: "user.name",
        },
        {
            header: "Tipo de tarea",
            accessorKey: "type_task.name",
            cell: ({ row }) => {
                return (
                    <Badge className={` ${row.original.type_task.name}`}>
                        {row.original.type_task.name}
                    </Badge>
                )
            },
        },
        {
            header: "Status de tarea",
            accessorKey: "status_contact.name",
            cell: ({ row }) => {
                return (
                    <Badge className={` ${row.original.status_contact.name}`}>
                        {row.original.status_contact.name}
                    </Badge>
                )
            },
        },
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listas de tareas</h2>
                    {permission.some(perm => perm.name === 'admin.tasks.create') && (
                    <Link href={route('tasks.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear
                    </Link>
                    )}
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Tasks" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto">
                                <DataTable
                                    columns={columns}
                                    data={tasks}
                                    routeEdit={'tasks.edit'}
                                    routeDestroy={'tasks.destroy'}
                                    editPermission={'admin.tasks.edit'} // Pasa el permiso de editar
                                    deletePermission={'admin.tasks.delete'} // Pasa el permiso de eliminar
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