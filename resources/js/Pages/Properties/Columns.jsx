import { LinkIcon } from "@heroicons/react/24/outline";
import { Badge } from "flowbite-react";

const columns = [
    {
        header: "#id",
        cell: ({ row }) => {
            return (
                <>
                    <div className="flex items-center">
                        <p className='me-2'>{row.original.id}</p>
                        <img src={`${row.original.main}`} alt={row.original.main} className='w-14 mx-auto rounded-lg' />
                    </div>
                </>
            )
        },
    },
    {
        header: "Nombre",
        accessorKey: "name",
        expanded: (row) => {
            // Aquí puedes agregar la información adicional que deseas mostrar
            return (

                <div className="ms-4 space-y-1">
                    {/* <p>Creado: {row.original.created_at}</p> */}
                    <p>Agente encargado: {row.original.user.name}</p>
                    <p>Dirección: {row.original.direction}.{row.original.country.name}, {row.original.state.name}, {row.original.city.name}</p>
                    <a
                        href={route('property.show', row.original.slug)}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="flex items-start justify-start underline underline-offset-4 text-blue-500 hover:text-blue-400"
                    >
                        <LinkIcon className='size-4 me-2' /> {route('posts.show', row.original.slug)}
                    </a>
                </div>
            );
        },
    },
    {
        header: "Precio",
        accessorKey: "price",
    },
    {
        header: "Estado fisico",
        accessorKey: "phy_state.name",
    },
    {
        header: "Negocio",
        accessorKey: "type_business.name",
    },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ row }) => {
            return (
                <Badge color={` ${row.original.status === "1" ? 'success' : 'warning'}`}>
                    {row.original.status === "1" ? 'Activo' : 'Inactivo'}
                </Badge>
            )
        },
    },
]

export default columns;