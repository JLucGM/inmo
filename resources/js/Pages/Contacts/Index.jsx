import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Badge } from '@/Components/ui/badge';

const columns = [
    // {
    //     accessorKey: 'id',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="#" />
    //     ),
    // },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                {(row.original.is_new === true || row.original.is_new === 1) && (
                    <span
                        className="inline-block w-2 h-2 bg-red-600 rounded-full me-2"
                        title="Cliente nuevo"
                    ></span>
                )}
                <span className="capitalize">{row.original.name}</span>
            </div>
        )
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Teléfono" />
        ),
        cell: ({ row }) => row.original.phone || '-'
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Correo" />
        ),
        cell: ({ row }) => row.original.email || '-'
    },
    {
        accessorKey: 'statuscontact.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estatus" />
        ),
        cell: ({ row }) => row.original.statuscontact?.name || '-'
    },
    // {
    //     accessorKey: 'country.name',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="País" />
    //     ),
    //     cell: ({ row }) => row.original.country?.name || '-'
    // },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeShow="contacts.show"
                    routeEdit="contacts.edit"
                    routeDestroy="contacts.destroy"
                    editPermission="admin.contactos.edit"
                    deletePermission="admin.contactos.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default function Index({ auth, contacts, statuses = [], statusFilter = 'all', newContactsCount = 0 }) {
    const handleStatusChange = (value) => {
        router.get(route('contacts.index'),
            { status: value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title="Lista de contactos"
                        subtitle="Aquí puedes gestionar los contactos de clientes. Clientes nuevos se marcarán con un punto rojo."
                    />
                </div>
            }
        >
            <Head className="capitalize" title="Lista de Contactos" />

            <div className="p-4 space-y-6">
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
                                key={status.id} 
                                value={status.slug}
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 gap-2"
                            >
                                {status.name}
                                {status.slug === 'nuevo' && newContactsCount > 0 && (
                                    <Badge variant="secondary" className="px-1.5 py-0 min-w-5 h-5 justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400">
                                        {newContactsCount}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <DataTable
                    columns={columns}
                    data={contacts}
                />
            </div>

        </AuthenticatedLayout>
    );
}
