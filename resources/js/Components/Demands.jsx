import React from 'react';
import SectionHeader from '@/Components/SectionHeader'; // Nueva importación

export default function Demands({ selectedContact }) {
    return (
        <>
            {/* Título y subtítulo extraídos al componente */}
            <SectionHeader 
                title="Demandas del cliente" 
                subtitle="Muestra de los requisitos del cliente para la propiedad." 
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                    <span className="capitalize font-semibold">Tipo de propiedad:</span>
                    <p className="capitalize">{selectedContact.typeproperty?.name ? selectedContact.typeproperty.name : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Presupuesto:</span>
                    <p className="capitalize">
                        {selectedContact.min_budget ? selectedContact.min_budget : 'no disponible'} -{' '}
                        {selectedContact.max_budget ? selectedContact.max_budget : 'no disponible'}
                    </p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Habitaciones:</span>
                    <p className="capitalize">{selectedContact.bedrooms ? selectedContact.bedrooms : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Baños:</span>
                    <p className="capitalize">{selectedContact.bathrooms ? selectedContact.bathrooms : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">País:</span>
                    <p className="capitalize">{selectedContact.country?.name ? selectedContact.country.name : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Estado:</span>
                    <p className="capitalize">{selectedContact.state?.name ? selectedContact.state.name : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Ciudad:</span>
                    <p className="capitalize">{selectedContact.city?.name ? selectedContact.city.name : 'no disponible'}</p>
                </div>

                <div className="col-span-2">
                    <span className="capitalize font-semibold">Dirección:</span>
                    <p className="capitalize">{selectedContact.direction ? selectedContact.direction : 'no disponible'}</p>
                </div>

                <div className="col-span-full">
                    <span className="capitalize font-semibold">Descripción:</span>
                    <p>{selectedContact.description ? selectedContact.description : 'no disponible'}</p>
                </div>
            </div>
        </>
    );
}
