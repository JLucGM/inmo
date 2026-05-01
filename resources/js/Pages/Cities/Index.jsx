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
                <p><strong>Estado:</strong> {row.original.state?.name}</p>
            </div>
        )
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="cities.edit"
                    routeDestroy="cities.destroy"
                    editPermission="admin.cities.edit"
                    deletePermission="admin.cities.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, cities, role, permission }) {
    return (
        <AuthenticatedLayout user={auth.user} permission={permission} roles={role}>
            <Head title="Ciudades" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={cities}
                    permissions={permission}
                />
            </div>
        </AuthenticatedLayout>
    );
}
