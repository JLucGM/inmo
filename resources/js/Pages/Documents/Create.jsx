import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import TextAreaRich from '@/Components/TextAreaRich';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';

export default function Create({ auth, contacts, properties, users }) {

    const initialValues = {
        name: "",
        body: "",
        status: "0",
        contact_id: contacts?.length > 0 ? contacts[0].id.toString() : "",
        property_id: properties?.length > 0 ? properties[0].id.toString() : "",
        user_id: users?.length > 0 ? users[0].id.toString() : "",
    };

    const { data, setData, errors, post } = useForm(initialValues);
    const textAreaRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        post(route('documents.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Crear documento" subtitle="Redacta un nuevo documento legal o informativo." />
                    <Link href={route('documents.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Crear documento" />

            <div className="max-w-7xl mx-auto p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Principal - 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Datos principales">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nombre / Título del documento</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            autoFocus
                                            className="mt-1"
                                        />
                                        {errors.name && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.name}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <Label htmlFor="body">Cuerpo / Contenido</Label>
                                        <div className="mt-1 rounded-md overflow-hidden bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800">
                                            <TextAreaRich
                                                initialValue={data.body}
                                                ref={textAreaRef}
                                                name="body"
                                                onChange={(newText) => setData('body', newText)}
                                            />
                                        </div>
                                        {errors.body && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.body}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* Columna Secundaria - 1/3 */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Relaciones y Estado">
                                <div className="space-y-4">
                                    
                                    <div>
                                        <Label htmlFor="contact_id">Contacto asociado</Label>
                                        {contacts?.length === 0 ? (
                                             <div className="text-sm text-gray-500 italic mt-1 bg-gray-50 dark:bg-gray-800 p-2 rounded pt-2 pb-2">No hay contactos creados</div>
                                        ) : (
                                            <ShadcnSelect value={data.contact_id} onValueChange={(val) => setData('contact_id', val)}>
                                                <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar contacto" /></SelectTrigger>
                                                <SelectContent>
                                                    {contacts?.map(contact => (
                                                        <SelectItem value={contact.id.toString()} key={contact.id}>{contact.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </ShadcnSelect>
                                        )}
                                        {errors.contact_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.contact_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="property_id">Propiedad asociada</Label>
                                        {properties?.length === 0 ? (
                                            <div className="text-sm text-gray-500 italic mt-1 bg-gray-50 dark:bg-gray-800 p-2 rounded pt-2 pb-2">No hay propiedades creadas</div>
                                        ) : (
                                            <ShadcnSelect value={data.property_id} onValueChange={(val) => setData('property_id', val)}>
                                                <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar propiedad" /></SelectTrigger>
                                                <SelectContent>
                                                    {properties?.map(property => (
                                                        <SelectItem value={property.id.toString()} key={property.id}>{property.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </ShadcnSelect>
                                        )}
                                        {errors.property_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.property_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="user_id">Agente asignado</Label>
                                        <ShadcnSelect value={data.user_id} onValueChange={(val) => setData('user_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar agente" /></SelectTrigger>
                                            <SelectContent>
                                                {users?.map(user => (
                                                    <SelectItem value={user.id.toString()} key={user.id}>{user.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </ShadcnSelect>
                                        {errors.user_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.user_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="status">Estado</Label>
                                        <ShadcnSelect value={data.status} onValueChange={(val) => setData('status', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Nuevo</SelectItem>
                                                <SelectItem value="1">Revisión</SelectItem>
                                                <SelectItem value="2">Archivado</SelectItem>
                                                <SelectItem value="3">Finalizado</SelectItem>
                                            </SelectContent>
                                        </ShadcnSelect>
                                        {errors.status && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.status}</AlertDescription></Alert>}
                                    </div>

                                </div>
                            </ContainerTitle>
                        </div>

                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar documento</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}