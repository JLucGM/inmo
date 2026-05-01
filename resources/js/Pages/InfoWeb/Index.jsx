import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#id" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center space-x-3">
                <p className="w-5 text-gray-500">{row.original.id}</p>
                {row.original.image ? (
                    <img src={row.original.image} alt={row.original.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100 dark:border-gray-800" loading="lazy" />
                ) : (
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-[10px] text-gray-400">Sin img</div>
                )}
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre de la entrada" />
        ),
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
            
            header={
                <SectionHeader
                    title="Información web"
                    subtitle="Administra la información estática mostrada en la página web."
                />
            }
        >
            <Head title="Información web" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={infoweb}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}