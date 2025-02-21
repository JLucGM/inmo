// columns.js
import { Badge } from 'flowbite-react';
import React from 'react';

const columns = [
    {
        header: "#id",
        accessorKey: "id",
    },
    {
        header: "Tarea",
        accessorKey: "name",
        expanded: (row) => {
            // Aquí puedes agregar la información adicional que deseas mostrar
            return (
                <div>
                    <div className="flex space-x-2">
                        <p><span className='font-bold'>Inicio:</span> {row.original.start_time}</p>
                        <p><span className='font-bold'>Fin:</span> {row.original.start_time}</p>
                    </div>
                    <p className='capitalize'>Contacto: {row.original.contact.name}</p>
                    <p className='capitalize'>Propiedad: {row.original.property.name}</p>
                </div>
            );
        },
    },
    {
        header: "Agente",
        accessorKey: "user.name",
    },
    {
        header: "Tipo de tarea",
        accessorKey: "type_task.name",
        cell: ({ row }) => {
            return (
                <Badge className={` ${row.original.type_task.name}`}>
                    {row.original.type_task.name}
                </Badge>
            )
        },
    },
    {
        header: "Status de tarea",
        accessorKey: "status_contact.name",
        cell: ({ row }) => {
            return (
                <Badge className={` ${row.original.status_contact.name}`}>
                    {row.original.status_contact.name}
                </Badge>
            )
        },
    },
]

export default columns;