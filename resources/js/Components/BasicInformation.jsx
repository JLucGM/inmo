import React from 'react';

export default function BasicInformation({ selectedContact }) {
    return (
        <>            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Nombre:</span>
                    <p className="capitalize">{selectedContact.name ? selectedContact.name : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Fecha de nacimiento:</span>
                    <p className="capitalize">{selectedContact.birthdate ? selectedContact.birthdate : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Email:</span>
                    <p>{selectedContact.email ? selectedContact.email : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Teléfono:</span>
                    <p className="capitalize">{selectedContact.phone ? selectedContact.phone : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Encargado:</span>
                    <p className="capitalize">{selectedContact?.user?.name || 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Tipo de contacto:</span>
                    <p className="capitalize">{selectedContact.typecontact?.name ? selectedContact.typecontact.name : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Estado de contacto:</span>
                    <p className="capitalize">{selectedContact.statuscontact?.name ? selectedContact.statuscontact.name : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Medio de captación:</span>
                    <p className="capitalize">{selectedContact.origin?.name ? selectedContact.origin.name : 'no disponible'}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <span className="capitalize font-semibold">Dirección actual:</span>
                    <p className="capitalize">{selectedContact.country?.name || 'no disponible'}, {selectedContact.state?.name || 'no disponible'}, {selectedContact.city?.name || 'no disponible'}, {selectedContact.direction || 'no disponible'}</p>
                </div>
               
            </div>
        </>
    );
}
