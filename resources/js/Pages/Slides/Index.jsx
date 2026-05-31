import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
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
                {row.original.image?.endsWith('.mp4') || row.original.image?.endsWith('.webm') || row.original.image?.endsWith('.ogg') ? (
                    <VideoCameraIcon className='size-10 p-2 bg-muted rounded aspect-video' />
                ) : (
                    row.original.image && <img src={row.original.image} alt="slide" className='w-14 h-14 rounded-sm object-cover aspect-square' /> 
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
            const isActive = row.original.status === "1";
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
                routeEdit="slides.edit"
                routeDestroy="slides.destroy"
                editPermission="admin.slides.edit"
                deletePermission="admin.slides.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    }
];

export default function Index({ auth, slide }) {
    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Slide" />

            <div className="p-4">
                <DataTable
                    columns={columns}
                    data={slide}
                    
                />
            </div>

        </AuthenticatedLayout>
    );
}
