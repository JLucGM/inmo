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
                    routeEdit="phyStates.edit"
                    routeDestroy="phyStates.destroy"
                    editPermission="admin.phyStates.edit"
                    deletePermission="admin.phyStates.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, phyStates }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Estados Físicos" />

            <div className="max-w-7xl p-4">

                <DataTable
                    columns={columns}
                    data={phyStates}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}