// columns.js
import React from 'react';

const columns = [
    {
        header: "#id",
        cell: ({ row }) => {
            return (
                <>
                    <div className="flex items-center">
                        <p className='me-2'>{row.original.id}</p>
                        <img src={`${row.original.image}`} alt={row.original.image} className='w-14' />
                    </div>
                </>
            )
        },
    },
    {
        header: "Nombre",
        accessorKey: "name",
    }
]

export default columns;