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
        expanded: (row) => (
            <div className="text-sm">
                <p><strong>Nombre:</strong> {row.original.name}</p>
                <p><strong>País:</strong> {row.original.country?.name}</p>
            </div>
        )
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="states.edit"
                    routeDestroy="states.destroy"
                    editPermission="admin.states.edit"
                    deletePermission="admin.states.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, states }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Estados" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={states}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
