import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
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
                {row.original.avatar ? (
                    <img src={row.original.avatar} alt="avatar" className='w-12 h-12 rounded-full object-cover shrink-0' />
                ) : (
                    <div className="w-14 h-14 rounded-full shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] text-gray-500">Sin img</div>
                )}
                <span>{row.original.name}</span>
            </div>
        )
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