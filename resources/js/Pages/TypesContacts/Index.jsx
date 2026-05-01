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
                    routeEdit="typesContacts.edit"
                    routeDestroy="typesContacts.destroy"
                    editPermission="admin.typesContacts.edit"
                    deletePermission="admin.typesContacts.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, typesContacts, role, permission }) {
    return (
        <AuthenticatedLayout user={auth.user} permission={permission} roles={role}>
            <Head title="Tipos de Contactos" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={typesContacts}
                    permissions={permission}
                />
            </div>
        </AuthenticatedLayout>
    );
}