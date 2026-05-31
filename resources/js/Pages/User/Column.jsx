import React from 'react';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                {row.original.avatar ? (
                    <img
                        src={row.original.avatar}
                        alt={row.original.name}
                        className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                ) : (
                    <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400 shrink-0">
                        NA
                    </div>
                )}
                <span>{row.original.name}</span>
            </div>
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
