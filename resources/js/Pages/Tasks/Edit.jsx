import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { usePermissions } from '@/hooks/use-permissions';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, task, statuses, contacts, typetasks, properties }) {
    const { can } = usePermissions();

    const initialValues = {
        name: task.name || "",
        start_time: task.start_time || "",
        end_time: task.end_time || "",
        description: task.description || "",
        contact_id: task.contact_id?.toString() || "",
        types_tasks_id: task.types_tasks_id?.toString() || "",
        property_id: task.property_id?.toString() || "",
        status_contacts_id: task.status_contacts_id?.toString() || "",
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.update', task), {
            onError: (error) => console.log(error)
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar tarea" subtitle="Modifica los detalles, horarios y asignaciones de la tarea." />
                    <Link href={route('tasks.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Actualizar tarea" />

            <div className="max-w-7xl mx-auto p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Tarea actualizada exitosamente!</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Principal - 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Detalles de la tarea">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Título de la tarea</Label>
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
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="start_time">Fecha y hora de inicio</Label>
                                            <Input
                                                id="start_time"
                                                type="datetime-local"
                                                value={data.start_time}
                                                onChange={(e) => setData('start_time', e.target.value)}
                                                className="mt-1"
                                            />
                                            {errors.start_time && (
                                                <Alert variant="destructive" className="mt-2 py-2">
                                                    <AlertDescription>{errors.start_time}</AlertDescription>
                                                </Alert>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="end_time">Fecha y hora de fin</Label>
                                            <Input
                                                id="end_time"
                                                type="datetime-local"
                                                value={data.end_time}
                                                onChange={(e) => setData('end_time', e.target.value)}
                                                className="mt-1"
                                            />
                                            {errors.end_time && (
                                                <Alert variant="destructive" className="mt-2 py-2">
                                                    <AlertDescription>{errors.end_time}</AlertDescription>
                                                </Alert>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Descripción / Notas</Label>
                                        <Textarea
                                            id="description"
                                            rows={6}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.description && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.description}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* Columna Secundaria - 1/3 */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Asignaciones y Estado">
                                <div className="space-y-4">
                                    
                                    <div>
                                        <Label htmlFor="status_contacts_id">Estado</Label>
                                        <Select value={data.status_contacts_id} onValueChange={(val) => setData('status_contacts_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                                            <SelectContent>
                                                {statuses?.map(status => (
                                                    <SelectItem value={status.id.toString()} key={status.id}>{status.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.status_contacts_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.status_contacts_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="types_tasks_id">Tipo de tarea</Label>
                                        <Select value={data.types_tasks_id} onValueChange={(val) => setData('types_tasks_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                                            <SelectContent>
                                                {typetasks?.map(type => (
                                                    <SelectItem value={type.id.toString()} key={type.id}>{type.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.types_tasks_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.types_tasks_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <Label htmlFor="contact_id">Contacto asignado</Label>
                                            {can('admin.contactos.create') && (
                                                <Link href={route('contacts.create')} className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400">Crear nuevo</Link>
                                            )}
                                        </div>
                                        <Select value={data.contact_id} onValueChange={(val) => setData('contact_id', val)}>
                                            <SelectTrigger className="w-full"><SelectValue placeholder="Sin contacto" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none" onClick={() => setData('contact_id', "")}>Ninguno</SelectItem>
                                                {contacts?.map(contact => (
                                                    <SelectItem value={contact.id.toString()} key={contact.id}>{contact.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.contact_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.contact_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <Label htmlFor="property_id">Propiedad asignada</Label>
                                            {can('admin.properties.create') && (
                                                <Link href={route('properties.create')} className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400">Crear nueva</Link>
                                            )}
                                        </div>
                                        <Select value={data.property_id} onValueChange={(val) => setData('property_id', val)}>
                                            <SelectTrigger className="w-full"><SelectValue placeholder="Sin propiedad" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none" onClick={() => setData('property_id', "")}>Ninguna</SelectItem>
                                                {properties?.map(property => (
                                                    <SelectItem value={property.id.toString()} key={property.id}>{property.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.property_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.property_id}</AlertDescription></Alert>}
                                    </div>

                                </div>
                            </ContainerTitle>
                        </div>

                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
