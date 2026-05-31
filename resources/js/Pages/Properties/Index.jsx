import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';

const columns = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        cell: ({ row }) => {
            const firstImage = row.original.media && row.original.media.length > 0
                ? row.original.media[0].original_url
                : null;
            return (
                <div className="flex items-center gap-3">
                    {firstImage ? (
                        <img
                            src={firstImage}
                            alt={`Imagen de ${row.original.name}`}
                            className="w-14 h-14 object-cover rounded-lg shadow-sm shrink-0"
                            loading="lazy"
                            onError={(e) => { e.target.src = '/img/default.jpg'; }}
                        />
                    ) : (
                        <div className="w-14 h-14 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-[10px] text-gray-400 border border-gray-200 dark:border-gray-700">
                            No img
                        </div>
                    )}
                    <a
                        href={route('property.show', row.original.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                    >
                        {row.original.name}
                    </a>
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
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Precio" />
        ),
        cell: ({ row }) => <span className="font-medium">${Number(row.original.price).toLocaleString()}</span>
    },
    {
        accessorKey: 'user.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Agente" />
        ),
        cell: ({ row }) => <span>{row.original.user?.name || '---'}</span>
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
            <DataTableRowActions
                row={row}
                routeEdit="properties.edit"
                routeDestroy="properties.destroy"
                editPermission="admin.properties.edit"
                deletePermission="admin.properties.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    },
];

export default function Index({ auth, properties, statuses = [], statusFilter = 'all' }) {
    const handleStatusChange = (value) => {
        router.get(route('properties.index'),
            { status: value },
            { preserveState: true, replace: true }
        );
    };
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

            <div className=" p-4 space-y-6">
                <Tabs value={statusFilter} onValueChange={handleStatusChange} className="w-full">
                    <TabsList className="bg-transparent h-auto p-0 flex-wrap gap-2 border-b rounded-none w-full justify-start">
                        <TabsTrigger
                            value="all"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                        >
                            Todos
                        </TabsTrigger>
                        {statuses.map((status) => (
                            <TabsTrigger
                                key={status.slug}
                                value={status.slug}
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                            >
                                {status.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <DataTable
                    columns={columns}
                    data={properties}
                />
            </div>
        </AuthenticatedLayout>
    );
}
