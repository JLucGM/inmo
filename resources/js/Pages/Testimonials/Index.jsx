import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
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
                {row.original.avatar && (
                    <img src={row.original.avatar} alt="avatar" className='w-12 h-12 rounded-full object-cover' />
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
            <DataTableRowActions
                row={row}
                routeEdit="testimonial.edit"
                routeDestroy="testimonial.destroy"
                editPermission="admin.testimonials.edit"
                deletePermission="admin.testimonials.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    }
];

export default function Index({ auth, testimonial }) {
    return (
        <AuthenticatedLayout user={auth.user} >
            <SectionHeader
                title="Testimonios"
                subtitle="Gestiona los testimonios y opiniones de los clientes."
            />

            <Head title="Testimonios" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={testimonial}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}