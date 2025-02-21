// columns.js
import { Badge } from 'flowbite-react';
import React from 'react';

const columns = [
    {
        header: "#id",
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <p className='me-2'>{row.original.id}</p>
                    <img src={`${row.original.avatar}`} alt={row.original.avatar} className='w-11 h-11 rounded-full object-cover' />
                </div>
            );
        },
    },
    {
        header: "Nombre",
        accessorKey: "name",
    },
    {
        header: "Correo",
        accessorKey: "email",
    },
    {
        header: "Telefono",
        accessorKey: "phone",
    },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ row }) => {
            return (
                <Badge color={`${row.original.status === "1" ? 'success' : 'warning'}`} className='rounded-full'>
                    {row.original.status === "1" ? 'Activo' : 'Inactivo'}
                </Badge>
            );
        },
    },
];

export default columns;