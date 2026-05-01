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
                    routeEdit="typesBusinesses.edit"
                    routeDestroy="typesBusinesses.destroy"
                    editPermission="admin.typesBusinesses.edit"
                    deletePermission="admin.typesBusinesses.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, typesBusinesses }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Tipos de Negocio" />

            <div className="max-w-7xl p-4">

                <DataTable
                    columns={columns}
                    data={typesBusinesses}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}