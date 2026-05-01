import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import LocationPickerMap from '@/Components/LocationPickerMap';
import TextAreaRich from '@/Components/TextAreaRich';
import { useRef } from 'react';
import LocationSelect from '@/Components/LocationSelect';
import {
    Combobox,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
    useComboboxAnchor,
} from '@/Components/ui/combobox';

export default function Create({ auth, typeProperties, typeBusinesses, countries, states, cities, phyStates, amenities, role, permission }) {

    const textAreaRef = useRef();

    const initialValues = {
        name: "",
        price: "",
        description: "",
        identification: "",
        images: [],
        bedrooms: "",
        bathrooms: "",
        totalMeters: "",
        builtMeters: "",
        garages: "",
        direction: "",
        amenity: [],
        status: "1",
        types_properties_id: typeProperties?.[0]?.id?.toString() || "",
        types_businesses_id: typeBusinesses?.[0]?.id?.toString() || "",
        country_id: countries?.[0]?.id?.toString() || "",
        state_id: states?.filter(s => s.country_id === countries?.[0]?.id)?.[0]?.id?.toString() || "",
        city_id: "",
        phy_states_id: phyStates?.[0]?.id?.toString() || "",
    }

    const { data, setData, errors, post } = useForm(initialValues);
    const amenityAnchor = useComboboxAnchor();

    const submit = (e) => {
        e.preventDefault();
        post(route('properties.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Crear propiedad" subtitle="Añade una nueva propiedad al catálogo con todos sus detalles." />
                    <Link href={route('properties.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Crear propiedad" />

            <div className="max-w-7xl mx-auto p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Principal - 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Datos principales">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Título de la propiedad</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            autoFocus
                                            className="mt-1"
                                        />
                                        {errors.name && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.name}</AlertDescription></Alert>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="col-span-1">
                                            <Label htmlFor="identification">Identificación (Nro. ref)</Label>
                                            <Input
                                                id="identification"
                                                value={data.identification}
                                                onChange={(e) => setData('identification', e.target.value)}
                                                className="mt-1"
                                            />
                                            {errors.identification && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.identification}</AlertDescription></Alert>}
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="price">Precio</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="mt-1"
                                            />
                                            {errors.price && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.price}</AlertDescription></Alert>}
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="types_businesses_id">Tipo de negocio</Label>
                                            <ShadcnSelect 
                                                value={data.types_businesses_id} 
                                                onValueChange={(val) => setData('types_businesses_id', val)}
                                            >
                                                <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                                <SelectContent>
                                                    {typeBusinesses?.map(t => (
                                                        <SelectItem value={t.id.toString()} key={t.id}>{t.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </ShadcnSelect>
                                            {errors.types_businesses_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.types_businesses_id}</AlertDescription></Alert>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="types_properties_id">Tipo de propiedad</Label>
                                            <ShadcnSelect 
                                                value={data.types_properties_id} 
                                                onValueChange={(val) => setData('types_properties_id', val)}
                                            >
                                                <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                                <SelectContent>
                                                    {typeProperties?.map(t => (
                                                        <SelectItem value={t.id.toString()} key={t.id}>{t.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </ShadcnSelect>
                                            {errors.types_properties_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.types_properties_id}</AlertDescription></Alert>}
                                        </div>
                                        <div>
                                            <Label htmlFor="phy_states_id">Estado físico</Label>
                                            <ShadcnSelect 
                                                value={data.phy_states_id} 
                                                onValueChange={(val) => setData('phy_states_id', val)}
                                            >
                                                <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                                <SelectContent>
                                                    {phyStates?.map(p => (
                                                        <SelectItem value={p.id.toString()} key={p.id}>{p.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </ShadcnSelect>
                                            {errors.phy_states_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.phy_states_id}</AlertDescription></Alert>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
                                        <div className="col-span-1">
                                            <Label htmlFor="bedrooms">Habitaciones</Label>
                                            <Input id="bedrooms" type="number" value={data.bedrooms} onChange={(e) => setData('bedrooms', e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="bathrooms">Baños</Label>
                                            <Input id="bathrooms" type="number" value={data.bathrooms} onChange={(e) => setData('bathrooms', e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="garages">Garajes</Label>
                                            <Input id="garages" type="number" value={data.garages} onChange={(e) => setData('garages', e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="builtMeters">M² constr.</Label>
                                            <Input id="builtMeters" type="number" value={data.builtMeters} onChange={(e) => setData('builtMeters', e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="totalMeters">M² totales</Label>
                                            <Input id="totalMeters" type="number" value={data.totalMeters} onChange={(e) => setData('totalMeters', e.target.value)} className="mt-1" />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Label htmlFor="description">Descripción detallada</Label>
                                        <div className="mt-1 rounded-md overflow-hidden bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800">
                                            <TextAreaRich
                                                initialValue={data.description}
                                                ref={textAreaRef}
                                                name="description"
                                                onChange={(newText) => setData('description', newText)}
                                            />
                                        </div>
                                        {errors.description && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.description}</AlertDescription></Alert>}
                                    </div>
                                </div>
                            </ContainerTitle>

                            <ContainerTitle title="Añadir imágenes">
                                <div>
                                    <Label htmlFor="images">Selecciona las imágenes de la propiedad (se pueden múltiple)</Label>
                                    <Input
                                        id="images"
                                        type="file"
                                        multiple
                                        onChange={(e) => setData('images', Array.from(e.target.files))}
                                        className="mt-2"
                                        accept="image/*"
                                    />
                                    {errors.images && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.images}</AlertDescription></Alert>}
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* Columna Secundaria - 1/3 */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Publicación">
                                <div className="space-y-4">
                                    <Label htmlFor="status">Visibilidad</Label>
                                    <ShadcnSelect 
                                        value={data.status} 
                                        onValueChange={(val) => setData('status', val)}
                                    >
                                        <SelectTrigger className="w-full"><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Borrador</SelectItem>
                                            <SelectItem value="1">Activo (Publicado)</SelectItem>
                                            <SelectItem value="2">Vendido / Inactivo</SelectItem>
                                        </SelectContent>
                                    </ShadcnSelect>
                                    {errors.status && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.status}</AlertDescription></Alert>}
                                </div>
                            </ContainerTitle>

                            <ContainerTitle title="Ubicación">
                                <div className="space-y-4">
                                    <LocationSelect 
                                        countries={countries}
                                        states={states}
                                        cities={cities}
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
                                    <div>
                                        <Label htmlFor="direction">Dirección completa</Label>
                                        <Textarea
                                            id="direction"
                                            value={data.direction}
                                            onChange={(e) => setData('direction', e.target.value)}
                                            rows={3}
                                            className="mt-1"
                                        />
                                        {errors.direction && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.direction}</AlertDescription></Alert>}
                                    </div>
                                    <div>
                                        <Label htmlFor="coordinate">Ubicación en el mapa (Latitud, Longitud)</Label>
                                        <LocationPickerMap 
                                            value={data.coordinate} 
                                            onChange={(val) => setData('coordinate', val)} 
                                            className="mt-2"
                                        />
                                        {errors.coordinate && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.coordinate}</AlertDescription></Alert>}
                                    </div>
                                </div>
                            </ContainerTitle>

                            <ContainerTitle title="Características especiales">
                                <div>
                                    <Label className="mb-2 block">Comodidades y extras</Label>
                                    <Combobox
                                        multiple
                                        value={data.amenity}
                                        onValueChange={(vals) => setData('amenity', vals)}
                                        getItemLabel={(val) => amenities?.find(a => a.id === val)?.name ?? String(val)}
                                    >
                                        <ComboboxChips ref={amenityAnchor} className="w-full">
                                            {data.amenity.map(id => (
                                                <ComboboxChip key={id}>
                                                    {amenities?.find(a => a.id === id)?.name}
                                                </ComboboxChip>
                                            ))}
                                            <ComboboxChipsInput placeholder="Buscar comodidades..." />
                                        </ComboboxChips>
                                        <ComboboxContent anchor={amenityAnchor}>
                                            <ComboboxList>
                                                {amenities?.map(a => (
                                                    <ComboboxItem key={a.id} value={a.id}>{a.name}</ComboboxItem>
                                                ))}
                                            </ComboboxList>
                                            <ComboboxEmpty>Sin resultados</ComboboxEmpty>
                                        </ComboboxContent>
                                    </Combobox>
                                    {errors.amenity && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.amenity}</AlertDescription></Alert>}
                                </div>
                            </ContainerTitle>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar propiedad</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}