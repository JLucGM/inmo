import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';
import { Badge } from '@/Components/ui/badge';
import { Link } from '@inertiajs/react';
import { formatDate } from '@/lib/formatDate';

const statusStyles = {
    active: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
    expired: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400',
    terminated: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels = {
    active: 'Activo',
    pending: 'Pendiente',
    expired: 'Vencido',
    terminated: 'Terminado',
};

export const columns = [
    {
        accessorKey: 'property.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Propiedad" />
        ),
        cell: ({ row }) => {
            const property = row.original.property;
            const firstImage = property?.media?.[0]?.original_url || null;
            return (
                <div className="flex items-center gap-3">
                    {firstImage ? (
                        <img
                            src={firstImage}
                            alt={property?.name}
                            className="w-14 h-14 object-cover rounded-lg shadow-sm shrink-0"
                            loading="lazy"
                            onError={(e) => { e.target.src = '/img/default.jpg'; }}
                        />
                    ) : (
                        <div className="w-14 h-14 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-[10px] text-gray-400 border border-gray-200 dark:border-gray-700">
                            No img
                        </div>
                    )}
                    <Link
                        href={route('rentals.show', row.original.id)}
                        className="hover:underline underline-offset-4 font-medium"
                    >
                        {property?.name || '---'}
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: 'tenant.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Inquilino" />
        ),
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.tenant?.name || '---'}</span>
                <span className="text-xs text-gray-500">{row.original.tenant?.email}</span>
            </div>
        ),
    },
    {
        accessorKey: 'monthly_rent',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Renta Mensual" />
        ),
        cell: ({ row }) => (
            <span className="font-medium">${Number(row.original.monthly_rent).toLocaleString()}</span>
        ),
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Inicio" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(row.original.start_date)}
            </span>
        ),
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fin" />
        ),
        cell: ({ row }) => (
            <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(row.original.end_date)}
            </span>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge className={statusStyles[status] || ''}>
                    {statusLabels[status] || status}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <DataTableRowActions
                row={row}
                routeShow="rentals.show"
                routeEdit="rentals.edit"
                routeDestroy="rentals.destroy"
                editPermission="admin.rentals.edit"
                deletePermission="admin.rentals.delete"
                permissions={table.options.meta?.permissions}
            />
        ),
    },
];
