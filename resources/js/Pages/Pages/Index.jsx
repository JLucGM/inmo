import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                {row.original.image ? (
                    <img src={row.original.image} alt="page" className='w-14 h-14 rounded-md object-cover aspect-square shrink-0' />
                ) : (
                    <div className="w-14 h-14 rounded-md flex items-center justify-center text-[10px] text-gray-500">Sin img</div>
                )}
                <span>{row.original.name}</span>
            </div>
        )
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const isActive = row.original.status === "1" || row.original.status === 1;
            return (
                <Badge variant={isActive ? "default" : "destructive"}>
                    {isActive ? 'Activo' : 'Inactivo'}
                </Badge>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <DataTableRowActions
                row={row}
                routeEdit="pages.edit"
                routeDestroy="pages.destroy"
                editPermission="admin.pages.edit"
                deletePermission="admin.pages.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    }
];

export default function Index({ auth, page }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Páginas del Sitio" />

            <div className="p-4">
                <DataTable
                    columns={columns}
                    data={page}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
