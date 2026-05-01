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
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <span className="font-medium">{row.original.id}</span>
                {row.original.image && (
                    <img
                        src={`${row.original.image}`}
                        alt="Preview"
                        className="h-10 w-10 rounded-full object-cover shadow-sm"
                    />
                )}
            </div>
        )
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
                    routeEdit="typesproperties.edit"
                    routeDestroy="typesproperties.destroy"
                    editPermission="admin.typesProperties.edit"
                    deletePermission="admin.typesProperties.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, typesproperties }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Tipos de Propiedades" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={typesproperties}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}