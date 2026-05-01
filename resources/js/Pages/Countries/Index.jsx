import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#" />
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="countries.edit"
                    routeDestroy="countries.destroy"
                    editPermission="admin.countries.edit"
                    deletePermission="admin.countries.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, countries }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Países" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={countries}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
