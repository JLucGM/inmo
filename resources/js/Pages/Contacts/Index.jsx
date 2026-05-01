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
            <DataTableColumnHeader column={column} title="#" />
        ),
    },
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
    {
        accessorKey: 'country.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="País" />
        ),
        cell: ({ row }) => row.original.country?.name || '-'
    },
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

export default function Index({ auth, contacts, role, permission }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
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

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={contacts}
                    permissions={permission}
                />
            </div>

        </AuthenticatedLayout>
    );
}
