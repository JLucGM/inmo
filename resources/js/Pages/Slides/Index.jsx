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
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <p className='me-2'>{row.original.id}</p>
                {row.original.image?.endsWith('.mp4') || row.original.image?.endsWith('.webm') || row.original.image?.endsWith('.ogg') ? (
                    <VideoCameraIcon className='size-6' />
                ) : (
                    row.original.image && <img src={row.original.image} alt="slide" className='w-14 rounded-sm object-cover aspect-video' />
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
        accessorKey: 'link',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Link" />
        ),
        cell: ({ row }) => <span className="lowercase">{row.original.link || '-'}</span>
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

export default function Index({ auth, slide, role, permission }) {
    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            {/* ... */}
            <div className='flex justify-between items-center mb-6'>
                <SectionHeader
                    title="Lista de slides"
                    subtitle="Aquí puedes ver la lista de slides principal del frontend."
                />
            </div>

            <Head title="Slide" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={slide}
                    permissions={permission}
                />
            </div>

        </AuthenticatedLayout>
    );
}
