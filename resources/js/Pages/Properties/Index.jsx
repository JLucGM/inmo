import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { LinkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';
import { Button } from '@/Components/ui/button';

const columns = [
    {
        id: 'image',
        header: 'img',
        cell: ({ row }) => {
            const firstImage = row.original.media && row.original.media.length > 0
                ? row.original.media[0].original_url
                : null;
            return (
                <div className="flex items-center">
                    {firstImage ? (
                        <img
                            src={firstImage}
                            alt={`Imagen de ${row.original.name}`}
                            className="w-14 h-14 object-cover mx-auto rounded-lg shadow-sm"
                            loading="lazy"
                            onError={(e) => { e.target.src = '/img/default.jpg'; }}
                        />
                    ) : (
                        <div className="w-14 h-14 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-[10px] text-gray-400 border border-gray-200 dark:border-gray-700">
                            No img
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'identification',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Identificación" />
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        expanded: (row) => (
            <div className="ms-4 py-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="font-semibold">Agente encargado:</span> {row.original.user?.name || '---'}</p>
                <p><span className="font-semibold">Dirección:</span> {row.original.direction}, {row.original.city?.name || '-'}, {row.original.state?.name || '-'}, {row.original.country?.name || '-'}</p>
                <div className="pt-2">
                    <a
                        href={route('property.show', row.original.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-start text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline underline-offset-4"
                    >
                        <LinkIcon className="w-4 h-4 me-1.5" /> Ver propiedad en sitio público
                    </a>
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Precio" />
        ),
        cell: ({ row }) => <span className="font-medium">${Number(row.original.price).toLocaleString()}</span>
    },
    {
        accessorKey: 'country.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="País" />
        ),
        cell: ({ row }) => row.original.country?.name || '-'
    },
    {
        accessorKey: 'phyState.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado fisico" />
        ),
        cell: ({ row }) => (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                {row.original.phyState?.name || 'N/A'}
            </Badge>
        )
    },
    {
        accessorKey: 'typeBusiness.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Negocio" />
        ),
        cell: ({ row }) => (
            <span className="text-gray-600 dark:text-gray-400">{row.original.typeBusiness?.name || 'N/A'}</span>
        )
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const isActive = row.original.status === '1';
            return (
                <Badge className={isActive ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50'}>
                    {isActive ? 'Activo' : 'Inactivo'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => row.toggleExpanded()}
                >
                    {row.getIsExpanded()
                        ? <MinusIcon className="size-4" />
                        : <PlusIcon className="size-4" />}
                </Button>
                <DataTableRowActions
                    row={row}
                    routeEdit="properties.edit"
                    routeDestroy="properties.destroy"
                    editPermission="admin.properties.edit"
                    deletePermission="admin.properties.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, properties }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            
            header={
                <SectionHeader
                    title="Propiedades"
                    subtitle="Explora y administra el catálogo de inmuebles del sistema."
                />
            }
        >
            <Head title="Propiedades" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={properties}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
