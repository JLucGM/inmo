import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { LinkIcon } from '@heroicons/react/24/outline';
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
                    <img src={row.original.image} alt="post" className='w-14 rounded-md object-cover aspect-video' />
                )}
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        expanded: (row) => (
            <div className="ml-4 space-y-2 py-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Extracto:</span> {row.original.extract || 'Sin extracto'}
                </p>
                <a
                    href={route('posts.show', row.original.slug)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:underline underline-offset-4"
                >
                    <LinkIcon className='size-4 mr-1.5' /> Ver publicación pública
                </a>
            </div>
        )
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

export default function Index({ auth, posts, role, permission }) {
    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <SectionHeader
                    title="Publicaciones"
                    subtitle="Gestiona los artículos y noticias del blog."
                />
                
            </div>

            <Head title="Publicaciones" />

            <div className="max-w-7xl p-4">
                <DataTable
                        columns={columns}
                        data={posts}
                        permissions={permission}
                    />
            </div>
        </AuthenticatedLayout>
    );
}
