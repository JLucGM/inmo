import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
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
    }
];

export default function Index({ auth, categoryPost, role, permission }) {
    // Definimos las acciones fuera del array de columnas para tener acceso a los permisos si fuera necesario, 
    // pero el patrón es incluirlas en el array.
    const columnsWithActions = [
        ...columns,
        {
            id: 'actions',
            cell: ({ row, table }) => (
                <div className="text-right">
                    <DataTableRowActions
                        row={row}
                        routeEdit="category-post.edit"
                        routeDestroy="category-post.destroy"
                        editPermission="admin.categoriesPost.edit"
                        deletePermission="admin.categoriesPost.delete"
                        permissions={table.options.meta?.permissions}
                    />
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user} permission={permission} roles={role}>
            <div className='flex justify-between items-center mb-6'>
                <SectionHeader
                    title="Categorías de Publicaciones"
                    subtitle="Gestiona las categorías de tus posts para el blog."
                />

            </div>

            <Head title="Categorías de Publicaciones" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columnsWithActions}
                    data={categoryPost}
                    permissions={permission}
                />
            </div>
        </AuthenticatedLayout>
    );
}
