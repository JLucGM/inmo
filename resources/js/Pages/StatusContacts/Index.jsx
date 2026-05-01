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
                    routeEdit="statuscontacts.edit"
                    routeDestroy="statuscontacts.destroy"
                    editPermission="admin.statuscontacts.edit"
                    deletePermission="admin.statuscontacts.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, statuscontacts }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Estatus de Contacto" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={statuscontacts}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
