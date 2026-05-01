import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => <p className="w-4">{row.original.id}</p>
    },
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
            
            
            header={
                <SectionHeader
                    title="Roles del sistema"
                    subtitle="Añade, edita y gestiona los roles disponibles para los usuarios."
                />
            }
        >
            <Head title="Roles" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={roles}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}