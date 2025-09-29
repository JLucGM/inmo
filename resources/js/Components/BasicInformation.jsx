import React from 'react';
import SectionHeader from './SectionHeader';

export default function BasicInformation({ selectedContact }) {
    return (
        <>
            <SectionHeader
                title="Información del cliente"
                subtitle="Muestra de los datos del cliente."
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                    <span className="capitalize font-semibold">Nombre:</span>
                    <p className="capitalize">{selectedContact.name ? selectedContact.name : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Email:</span>
                    <p className="capitalize">{selectedContact.email ? selectedContact.email : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Fecha de nacimiento:</span>
                    <p className="capitalize">{selectedContact.birthdate ? selectedContact.birthdate : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Teléfono:</span>
                    <p className="capitalize">{selectedContact.phone ? selectedContact.phone : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Encargado:</span>
                    <p className="capitalize">{selectedContact?.user?.name || 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Tipo de contacto:</span>
                    <p className="capitalize">{selectedContact.typecontact?.name ? selectedContact.typecontact.name : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Status de contacto:</span>
                    <p className="capitalize">{selectedContact.statuscontact?.name ? selectedContact.statuscontact.name : 'no disponible'}</p>
                </div>

                <div>
                    <span className="capitalize font-semibold">Medio de captación:</span>
                    <p className="capitalize">{selectedContact.origin?.name ? selectedContact.origin.name : 'no disponible'}</p>
                </div>
            </div>
        </>
    );
}
