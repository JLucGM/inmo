import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#id" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <p className="w-4">{row.original.id}</p>
                {row.original.image && (
                    <img src={row.original.image} alt="page" className='w-14 rounded-md object-cover aspect-video' />
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

export default function Index({ auth, page, role, permission }) {
    return (
        <AuthenticatedLayout user={auth.user} permission={permission} header={
            <SectionHeader
                title="Páginas del Sitio"
                subtitle="Gestiona las páginas estáticas y contenedores de información."
            />
        }>
            <Head title="Páginas del Sitio" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={page}
                    permissions={permission}
                />
            </div>
        </AuthenticatedLayout>
    );
}
