import React from 'react';
import { Badge } from '@/Components/ui/badge';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/Components/ui/button';

const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#" />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tarea" />
        ),
        expanded: (row) => {
            return (
                <div className="ms-4 py-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex space-x-4">
                        <p><span className='font-bold'>Inicio:</span> {row.original.start_time}</p>
                        <p><span className='font-bold'>Fin:</span> {row.original.end_time || row.original.start_time}</p>
                    </div>
                    <p className='capitalize'><span className='font-bold'>Contacto:</span> {row.original.contact?.name || 'N/A'}</p>
                    <p className='capitalize'><span className='font-bold'>Propiedad:</span> {row.original.property?.name || 'N/A'}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "user.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Agente" />
        ),
    },
    {
        accessorKey: "type_task.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tipo de tarea" />
        ),
        cell: ({ row }) => {
            return (
                <Badge variant="outline" className="capitalize">
                    {row.original.type_task?.name || 'N/A'}
                </Badge>
            )
        },
    },
    {
        accessorKey: "status_contact.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estatus" />
        ),
        cell: ({ row }) => {
            return (
                <Badge variant="secondary" className="capitalize">
                    {row.original.status_contact?.name || 'N/A'}
                </Badge>
            )
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
                    routeEdit="tasks.edit"
                    routeDestroy="tasks.destroy"
                    editPermission="admin.tasks.edit"
                    deletePermission="admin.tasks.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    },
]

export default columns;
