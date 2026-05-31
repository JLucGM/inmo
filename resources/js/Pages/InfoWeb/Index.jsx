import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                {row.original.image ? (
                    <img src={row.original.image} alt={row.original.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100 dark:border-gray-800" loading="lazy" />
                ) : (
                    <div className="w-12 h-12 shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-[10px] text-gray-500">Sin img</div>
                )}
                <span>{row.original.name}</span>
            </div>
        )
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <DataTableRowActions
                row={row}
                routeEdit="info-web.edit"
                routeDestroy="info-web.destroy"
                editPermission="admin.info-webs.edit"
                deletePermission="admin.info-webs.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    }
];

export default function Index({ auth, infoweb }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Información web" />

            <div className="p-4">
                <DataTable
                    columns={columns}
                    data={infoweb}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}