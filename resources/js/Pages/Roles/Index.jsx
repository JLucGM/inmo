import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre del rol" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="roles.edit"
                    routeDestroy="roles.destroy"
                    editPermission="admin.role.edit"
                    deletePermission="admin.role.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, roles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Roles" />

            <div className="p-4">
                <DataTable
                    columns={columns}
                    data={roles}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}