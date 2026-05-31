import React from 'react';

export default function Demands({ selectedContact }) {
    return (
        <>            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold">Tipo de propiedad:</span>
                    <p className="capitalize">{selectedContact.typeproperty?.name ? selectedContact.typeproperty.name : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold">Presupuesto:</span>
                    <p className="capitalize">
                        {selectedContact.min_budget ? selectedContact.min_budget : 'no disponible'} -{' '}
                        {selectedContact.max_budget ? selectedContact.max_budget : 'no disponible'}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold">Habitaciones:</span>
                    <p className="capitalize">{selectedContact.bedrooms ? selectedContact.bedrooms : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold">Baños:</span>
                    <p className="capitalize">{selectedContact.bathrooms ? selectedContact.bathrooms : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="capitalize font-semibold">Dirección:</span>
                    <p className="capitalize">{selectedContact.country?.name ? selectedContact.country.name : 'no disponible'}, {selectedContact.state?.name ? selectedContact.state.name : 'no disponible'}, {selectedContact.city?.name ? selectedContact.city.name : 'no disponible'}, {selectedContact.direction ? selectedContact.direction : 'no disponible'}</p>
                </div>

                <div className="col-span-full">
                    <span className="capitalize font-semibold">Descripción:</span>
                    <p>{selectedContact.description ? selectedContact.description : 'no disponible'}</p>
                </div>
            </div>
        </>
    );
}
