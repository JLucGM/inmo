import React from 'react';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <p className='me-2'>{row.original.id}</p>
                <img src={`${row.original.avatar}`} alt={row.original.avatar} className='w-11 h-11 rounded-full object-cover' />
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Correo" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Teléfono" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const isActive = row.original.status === "1";
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
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="user.edit"
                    routeDestroy="user.destroy"
                    editPermission="admin.user.edit"
                    deletePermission="admin.user.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
];

export default columns;
