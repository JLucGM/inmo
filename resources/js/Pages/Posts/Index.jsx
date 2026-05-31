import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
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
                {row.original.image && (
                    <img src={row.original.image} alt="post" className='w-14 h-14 rounded-md object-cover aspect-square' />
                )}
                <span>{row.original.name}</span>
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const isActive = row.original.status === 1 || row.original.status === "1";
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
                routeEdit="post.edit"
                routeDestroy="post.destroy"
                editPermission="admin.posts.edit"
                deletePermission="admin.posts.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    }
];

export default function Index({ auth, posts }) {
    return (
        <AuthenticatedLayout user={auth.user} >

            <Head title="Publicaciones" />

            <div className="max-w-7xl p-4">
                <DataTable
                        columns={columns}
                        data={posts}
                        
                    />
            </div>
        </AuthenticatedLayout>
    );
}
