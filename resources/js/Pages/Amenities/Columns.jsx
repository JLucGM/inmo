import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

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
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <div className="text-right">
                <DataTableRowActions
                    row={row}
                    routeEdit="amenities.edit"
                    routeDestroy="amenities.destroy"
                    editPermission="admin.amenities-checks.edit"
                    deletePermission="admin.amenities-checks.delete"
                    permissions={table.options.meta?.permissions}
                />
            </div>
        ),
    }
]

export default columns;
