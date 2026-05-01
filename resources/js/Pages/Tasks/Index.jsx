import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        header: '#id',
        accessorKey: 'id',
        cell: ({ row }) => <p className="w-4">{row.original.id}</p>
    },
    {
        header: 'Tarea',
        accessorKey: 'name',
        expanded: (row) => (
            <div className="py-2 space-y-2 ml-4 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-1 sm:space-y-0 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4" />
                        <span><span className='font-semibold'>Inicio:</span> {row.original.start_time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4" />
                        <span><span className='font-semibold'>Fin:</span> {row.original.end_time || row.original.start_time}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-gray-100 dark:border-gray-800">
                    <p><span className='font-medium'>Contacto:</span> {row.original.contact?.name || 'N/A'}</p>
                    <p><span className='font-medium'>Propiedad:</span> {row.original.property?.name || 'N/A'}</p>
                </div>
                {row.original.description && (
                    <div className="pt-2">
                        <p className="font-medium">Descripción:</p>
                        <p className="text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-2 rounded mt-1">{row.original.description}</p>
                    </div>
                )}
            </div>
        )
    },
    {
        header: 'Agente',
        accessorKey: 'user.name',
        cell: ({ row }) => row.original.user?.name || 'N/A'
    },
    {
        header: 'Tipo',
        accessorKey: 'type_task.name',
        cell: ({ row }) => {
            const typeName = row.original.type_task?.name || 'Otro';
            return (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                    {typeName}
                </Badge>
            );
        }
    },
    {
        header: 'Estado',
        accessorKey: 'status_contact.name',
        cell: ({ row }) => {
            const statusName = row.original.status_contact?.name || 'Desconocido';
            return (
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border-0">
                    {statusName}
                </Badge>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="tasks.edit"
                    routeDestroy="tasks.destroy"
                    editPermission="admin.tasks.edit"
                    deletePermission="admin.tasks.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    }
];

export default function Index({ auth, tasks }) {
    return (
        <AuthenticatedLayout user={auth.user} >
            <div className='flex justify-between items-center mb-6'>
                <SectionHeader
                    title="Tareas"
                    subtitle="Gestiona las actividades, seguimientos y tareas programadas."
                />
            </div>

            <Head title="Tareas" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={tasks}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
