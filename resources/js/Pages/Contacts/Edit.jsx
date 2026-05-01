import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import LocationSelect from '@/Components/LocationSelect';

export default function Edit({ auth, contacts, typeProperties, countries, states, cities, statuses, typeContacts, origins }) {

    const initialValues = {
        name: contacts.name || "",
        identificación_contact: contacts.identificación_contact || "",
        email: contacts.email || "",
        phone: contacts.phone || "",
        birthdate: contacts.birthdate || "",
        description: contacts.description || "",
        bedrooms: contacts.bedrooms || "",
        bathrooms: contacts.bathrooms || "",
        min_budget: contacts.min_budget || "",
        max_budget: contacts.max_budget || "",
        direction: contacts.direction || "",
        status_contacts_id: contacts.status_contacts_id?.toString() || "",
        types_properties_id: contacts.types_properties_id?.toString() || "",
        types_contacts_id: contacts.types_contacts_id?.toString() || "",
        country_id: contacts.country_id?.toString() || "",
        state_id: contacts.state_id?.toString() || "",
        city_id: contacts.city_id?.toString() || "",
        origin_id: contacts.origin_id?.toString() || "",
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        // Since Inertia handles standard forms with PUT properly via post+simulation 
        // using route model binding for update
        post(route('contacts.update', contacts));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar contacto" subtitle="Modifica los datos y demandas del contacto." />
                    <Link href={route('contacts.show', contacts.id)}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Actualizar Contacto" />

            <div className="max-w-7xl mx-auto p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Contacto actualizado exitosamente!</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        
                        {/* MAIN DATA */}
                        <div className="space-y-6">
                            <ContainerTitle title="Datos principales">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            autoFocus
                                            className="mt-1"
                                        />
                                        {errors.name && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.name}</AlertDescription></Alert>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="identificación_contact">N. de identificación</Label>
                                        <Input
                                            id="identificación_contact"
                                            value={data.identificación_contact}
                                            onChange={(e) => setData('identificación_contact', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.identificación_contact && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.identificación_contact}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Correo electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.email && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.email}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.phone && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.phone}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                                        <Input
                                            id="birthdate"
                                            type="date"
                                            value={data.birthdate}
                                            onChange={(e) => setData('birthdate', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.birthdate && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.birthdate}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="status_contacts_id">Estado de contacto</Label>
                                        <Select value={data.status_contacts_id} onValueChange={(val) => setData('status_contacts_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                            <SelectContent>
                                                {statuses?.map((st) => (
                                                    <SelectItem value={st.id.toString()} key={st.id}>{st.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.status_contacts_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.status_contacts_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="types_contacts_id">Tipo de contacto</Label>
                                        <Select value={data.types_contacts_id} onValueChange={(val) => setData('types_contacts_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                            <SelectContent>
                                                {typeContacts?.map((tc) => (
                                                    <SelectItem value={tc.id.toString()} key={tc.id}>{tc.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.types_contacts_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.types_contacts_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="origin_id">Medio de captación</Label>
                                        <Select value={data.origin_id} onValueChange={(val) => setData('origin_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                            <SelectContent>
                                                {origins?.map((org) => (
                                                    <SelectItem value={org.id.toString()} key={org.id}>{org.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.origin_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.origin_id}</AlertDescription></Alert>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            rows={4}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.description && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.description}</AlertDescription></Alert>}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* DEMANDS AND LOCATION */}
                        <div className="space-y-6">
                            <ContainerTitle title="Demandas del contacto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="types_properties_id">Tipo de propiedad ideal</Label>
                                        <Select value={data.types_properties_id} onValueChange={(val) => setData('types_properties_id', val)}>
                                            <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                            <SelectContent>
                                                {typeProperties?.map((tp) => (
                                                    <SelectItem value={tp.id.toString()} key={tp.id}>{tp.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.types_properties_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.types_properties_id}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="min_budget">Presupuesto mínimo</Label>
                                        <Input
                                            id="min_budget"
                                            value={data.min_budget}
                                            onChange={(e) => setData('min_budget', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.min_budget && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.min_budget}</AlertDescription></Alert>}
                                    </div>
                                    <div>
                                        <Label htmlFor="max_budget">Presupuesto máximo</Label>
                                        <Input
                                            id="max_budget"
                                            value={data.max_budget}
                                            onChange={(e) => setData('max_budget', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.max_budget && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.max_budget}</AlertDescription></Alert>}
                                    </div>

                                    <div>
                                        <Label htmlFor="bedrooms">Dormitorios ideales</Label>
                                        <Input
                                            id="bedrooms"
                                            value={data.bedrooms}
                                            onChange={(e) => setData('bedrooms', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.bedrooms && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.bedrooms}</AlertDescription></Alert>}
                                    </div>
                                    <div>
                                        <Label htmlFor="bathrooms">Baños ideales</Label>
                                        <Input
                                            id="bathrooms"
                                            value={data.bathrooms}
                                            onChange={(e) => setData('bathrooms', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.bathrooms && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.bathrooms}</AlertDescription></Alert>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <LocationSelect 
                                            countries={countries}
                                            states={states}
                                            cities={cities}
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="direction">Observaciones de dirección</Label>
                                        <Textarea
                                            id="direction"
                                            rows={2}
                                            value={data.direction}
                                            onChange={(e) => setData('direction', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.direction && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.direction}</AlertDescription></Alert>}
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
