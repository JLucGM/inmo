import { LinkIcon } from "@heroicons/react/24/outline";
import { Badge } from "flowbite-react";

const columns = [
    {
        header: "d",
        cell: ({ row }) => {
            // Obtener la primera imagen del array media
            const firstImage = row.original.media && row.original.media.length > 0 
                ? row.original.media[0].original_url 
                : null; // O puedes usar un placeholder como '/img/default.jpg'

            return (
                <>
                    <div className="flex items-center">
                        {firstImage ? (
                            <img 
                                src={firstImage} 
                                alt={`Imagen principal de ${row.original.name}`} 
                                className='w-14 mx-auto rounded-lg' 
                                loading="lazy"
                                onError={(e) => { // Opcional: manejar errores de carga de imagen
                                    e.target.src = '/img/default.jpg'; // Placeholder si falla (ajusta la ruta)
                                }}
                            />
                        ) : (
                            <div className="w-14 h-14 mx-auto bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                Sin imagen
                            </div>
                        )}
                    </div>
                </>
            );
        },
    },
    {
        header: "Identificación",
        accessorKey: "identification",
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
                    <p>Dirección: {row.original.direction}, {row.original.country.name}, {row.original.state.name}, {row.original.city.name}</p>
                    <a
                        href={route('property.show', row.original.slug)}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="flex items-start justify-start underline underline-offset-4 text-blue-500 hover:text-blue-400"
                    >
                        <LinkIcon className='size-4 me-2' /> Ver propiedad
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
                <Badge color={`${row.original.status === "1" ? 'success' : 'warning'}`}>
                    {row.original.status === "1" ? 'Activo' : 'Inactivo'}
                </Badge>
            );
        },
    },
];

export default columns;
