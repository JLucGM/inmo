import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Textarea, Transition } from '@headlessui/react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState, useRef } from 'react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';
import TextAreaRich from '@/Components/TextAreaRich';
import { HandThumbUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { Alert } from 'flowbite-react';
import customStyles from '@/Components/lib/SelectCustom';
import SectionHeader from '@/Components/SectionHeader';

export default function Edit({ auth, property, countries, states, cities, typeProperties, typeBusinesses, phyStates, amenities, role, permissions }) {
    console.log(property);

    const [selectedCountry, setSelectedCountry] = useState(property.country_id || countries[0]?.id || 1);
    const [selectedState, setSelectedState] = useState(property.state_id || states[0]?.id || 1);
    const [statesByCountry, setStatesByCountry] = useState(states.filter(s => s.country_id === property.country_id) || []);
    const [citiesByState, setCitiesByState] = useState(cities.filter(c => c.state_id === property.state_id) || []);

    const [currentMedia, setCurrentMedia] = useState(property.media || []);
    const [imagesToDelete, setImagesToDelete] = useState([]); // Array de IDs a eliminar

    const textAreaRef = useRef();
    const fileInputRef = useRef(null);

    const initialAmenityIds = property.amenities ? property.amenities.map(a => a.id) : [];
    const initialValues = {
        name: property.name || '',
        price: property.price || '',
        description: property.description || '',
        identification: property.identification || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        totalMeters: property.totalMeters || '',
        builtMeters: property.builtMeters || '',
        garages: property.garages || '',
        direction: property.direction || '',
        status: property.status || '0',
        types_properties_id: property.types_properties_id || '',
        types_businesses_id: property.types_businesses_id || '',
        country_id: property.country_id || 0,
        state_id: property.state_id || 0,
        city_id: property.city_id || 0,
        phy_states_id: property.phy_states_id || '',
        amenity: initialAmenityIds,
    };

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: { path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' },
        },
        {
            name: 'Lista de propiedades',
            href: 'properties.index',
            icon: { path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' },
        },
        {
            name: 'Actualizar propiedad',
            icon: { path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' },
        },
    ];

    const animatedComponents = makeAnimated();

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);

    const handleAmenityChange = (options) => {
        setData('amenity', options ? options.map(option => option.value) : []);
    };

    const handleTypesPropertiesChange = (selected) => {
        setData('types_properties_id', selected ? selected.value : '');
    };
    const handlePhyStatesChange = (selected) => {
        setData('phy_states_id', selected ? selected.value : '');
    };
    const handleStatusChange = (selected) => {
        setData('status', selected ? selected.value : '0');
    };
    const handleTypesBusinessesChange = (selected) => {
        setData('types_businesses_id', selected ? selected.value : '');
    };

    const handleCountryChange = (selected) => {
        const countryId = selected ? parseInt(selected.value) : '';
        setData('country_id', countryId);
        setSelectedCountry(countryId);
        const filteredStates = states.filter((s) => s.country_id === countryId);
        setStatesByCountry(filteredStates);
        setCitiesByState([]);  // Vacía ciudades
        // Resetear state y city si se cambia país
        setData('state_id', '');
        setData('city_id', '');
    };


    const handleStateChange = (selected) => {
        const stateId = selected ? parseInt(selected.value) : '';
        setData('state_id', stateId);
        setSelectedState(stateId);
        const filteredCities = cities.filter((c) => c.state_id === stateId);
        setCitiesByState(filteredCities);
        // Resetear city si se cambia estado
        setData('city_id', '');
    };
    const handleCityChange = (selected) => {
        setData('city_id', selected ? parseInt(selected.value) : '');
    };

    // Valores seleccionados para React-Select
    const typesPropertiesValue = typeProperties
        .filter(t => t.id === data.types_properties_id)
        .map(t => ({ value: t.id, label: t.name }))[0] || null;

    const phyStatesValue = phyStates
        .filter(s => s.id === data.phy_states_id)
        .map(s => ({ value: s.id, label: s.name }))[0] || null;

    const statusOptions = [
        { value: '0', label: 'Borrador' },
        { value: '1', label: 'Publicar' },
        { value: '2', label: 'Vendido' },
    ];
    const statusValue = statusOptions.find(opt => opt.value === data.status) || null;

    const typesBusinessesValue = typeBusinesses
        .filter(b => b.id === data.types_businesses_id)
        .map(b => ({ value: b.id, label: b.name }))[0] || null;

    const countriesOptions = countries.map(c => ({ value: c.id, label: c.name }));
    const countriesValue = countriesOptions.find(opt => opt.value === data.country_id) || null;

    const statesOptions = statesByCountry.map(s => ({ value: s.id, label: s.name }));
    const statesValue = statesOptions.find(opt => opt.value === data.state_id) || null;

    const citiesOptions = citiesByState.map(c => ({ value: c.id, label: c.name }));
    const citiesValue = citiesOptions.find(opt => opt.value === data.city_id) || null;


    // Sincronizar currentMedia con property.media (después de submit exitoso)
    useEffect(() => {
        setCurrentMedia(property.media || []);
        setImagesToDelete([]); // Resetear eliminaciones locales después de recarga
    }, [property.media]);

    const handleDeleteImage = (mediaId) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta imagen? Esto guardará todos los cambios automáticamente.')) {
            // Remover localmente para UX inmediata
            setCurrentMedia(prev => prev.filter(media => media.id !== mediaId));
            // Agregar a la lista de eliminaciones (se enviará en submit)
            setImagesToDelete(prev => [...prev, mediaId]);

            // EJECUTAR SUBMIT AUTOMÁTICAMENTE
            handleSubmitForm();
        }
    };

    const handleSubmitForm = () => {
        const formData = new FormData();
        // Agregar _method para simular PUT si el backend lo requiere (típico en rutas de update de Laravel)
        formData.append('_method', 'PUT');
        // Agregar datos de useForm
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                if (Array.isArray(data[key])) {
                    data[key].forEach(value => formData.append(`${key}[]`, value));
                } else {
                    formData.append(key, data[key]);
                }
            }
        });
        // Agregar archivos (usa ref)
        if (fileInputRef.current && fileInputRef.current.files.length > 0) {
            Array.from(fileInputRef.current.files).forEach(file => {
                formData.append('images[]', file);
            });
        }
        // Agregar eliminaciones
        if (imagesToDelete.length > 0) {
            imagesToDelete.forEach(id => {
                formData.append('images_to_delete[]', id);
            });
        }
        // Enviar usando post de useForm para que recentlySuccessful se active correctamente
        post(route('properties.update', property), {
            data: formData,
            forceFormData: true,
            onSuccess: (page) => {
                setImagesToDelete([]);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
            onError: (errors) => {
                console.error('Errores:', errors);
                // Opcional: alert('Error al guardar. Revisa y reintenta.'); 
                // (Los errores ya se manejan vía el prop errors de useForm)
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        handleSubmitForm();
    };

    const amenityValue = amenities
        .filter(a => data.amenity?.includes(a.id))  // Cambia esto: usa data.amenity en lugar de property.amenities
        .map(a => ({ value: a.id, label: a.name }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role || []}
            permission={permissions || []}
            header={
                <div className='flex justify-between items-center px-6'>
                    <SectionHeader
                        title="Actualizar propiedad"
                        subtitle="Aquí puedes actualizar la información de la propiedad."
                    />
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head title="Actualizar propiedad" />

            <div className="mb-5">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out duration-300"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in-out duration-300"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
                                        <Alert
                                            color="success"
                                            className="border-0 shadow-lg"
                                        >
                                            <div className="flex items-center">

                                                <HandThumbUpIcon className="w-5 h-5 text-green-700 dark:text-green-400" />
                                                La propiedad <span className="font-bold">{property.name}</span> se actualizó correctamente.
                                            </div>
                                        </Alert>
                                    </div>
                                </Transition>


                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">  {/* Mobile-first: 1 col, lg: 3 cols */}
                                    <div className="col-span-full lg:col-span-2">
                                        <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div className='md:col-span-2'>
                                                <InputLabel htmlFor="name" value="Nombre" />
                                                <TextInput
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={data.name}
                                                    className="block w-full"
                                                    isFocused={true}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2'>
                                                <InputLabel htmlFor="types_properties_id" value="Tipo de propiedad" />
                                                <Select
                                                    options={typeProperties.map((type) => ({ value: type.id, label: type.name }))}
                                                    value={typesPropertiesValue}
                                                    onChange={handleTypesPropertiesChange}
                                                    components={animatedComponents}
                                                    placeholder="Selecciona un tipo de propiedad"
                                                    name="types_properties_id"
                                                    styles={customStyles}
                                                />
                                                <InputError message={errors.types_properties_id} className="mt-2" />
                                            </div>



                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="identification" value="Identificación" />
                                                <TextInput
                                                    id="identification"
                                                    type="text"
                                                    name="identification"
                                                    value={data.identification}
                                                    className="block w-full"
                                                    onChange={(e) => setData('identification', e.target.value)}
                                                />
                                                <InputError message={errors.identification} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="price" value="Precio" />
                                                <TextInput
                                                    id="price"
                                                    type="text"
                                                    name="price"
                                                    value={data.price}
                                                    className="block w-full"
                                                    onChange={(e) => setData('price', e.target.value)}
                                                />
                                                <InputError message={errors.price} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="phy_states_id" value="Estado físico" />
                                                <Select
                                                    options={phyStates.map((state) => ({ value: state.id, label: state.name }))}
                                                    value={phyStatesValue}
                                                    onChange={handlePhyStatesChange}
                                                    components={animatedComponents}
                                                    placeholder="Selecciona un estado físico"
                                                    name="phy_states_id"
                                                    styles={customStyles}
                                                />
                                                <InputError message={errors.phy_states_id} className="mt-2" />
                                            </div>


                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="bedrooms" value="Dormitorios" />
                                                <TextInput
                                                    id="bedrooms"
                                                    type="text"
                                                    name="bedrooms"
                                                    value={data.bedrooms}
                                                    className="block w-full"
                                                    onChange={(e) => setData('bedrooms', e.target.value)}
                                                />
                                                <InputError message={errors.bedrooms} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="bathrooms" value="Baños" />
                                                <TextInput
                                                    id="bathrooms"
                                                    type="text"
                                                    name="bathrooms"
                                                    value={data.bathrooms}
                                                    className="block w-full"
                                                    onChange={(e) => setData('bathrooms', e.target.value)}
                                                />
                                                <InputError message={errors.bathrooms} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="garages" value="Garages" />
                                                <TextInput
                                                    id="garages"
                                                    type="text"
                                                    name="garages"
                                                    value={data.garages}
                                                    className="block w-full"
                                                    onChange={(e) => setData('garages', e.target.value)}
                                                />
                                                <InputError message={errors.garages} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="totalMeters" value="Metros totales" />
                                                <TextInput
                                                    id="totalMeters"
                                                    type="text"
                                                    name="totalMeters"
                                                    value={data.totalMeters}
                                                    className="block w-full"
                                                    onChange={(e) => setData('totalMeters', e.target.value)}
                                                />
                                                <InputError message={errors.totalMeters} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="builtMeters" value="Metros construidos" />
                                                <TextInput
                                                    id="builtMeters"
                                                    type="text"
                                                    name="builtMeters"
                                                    value={data.builtMeters}
                                                    className="block w-full"
                                                    onChange={(e) => setData('builtMeters', e.target.value)}
                                                />
                                                <InputError message={errors.builtMeters} className="mt-2" />
                                            </div>

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="description" value="Descripción" />
                                                <TextAreaRich
                                                    initialValue={data.description}
                                                    ref={textAreaRef}
                                                    name="description"
                                                    onChange={(newText) => setData('description', newText)}
                                                />
                                                <InputError message={errors.description} className="mt-2" />
                                            </div>

                                        </ContainerTitle>


                                        <div className="max-w-7xl mx-auto mb-5">
                                            <ContainerTitle title={'Imágenes'} className='col-span-full grid grid-cols-1 gap-4 mt-6'>
                                                <div className='flex flex-col'>
                                                    <InputLabel>Imágenes adicionales (múltiples) - Se agregarán al guardar</InputLabel>
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        multiple
                                                        ref={fileInputRef}
                                                        accept="image/*"
                                                        className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 rounded-3xl shadow-sm"
                                                    />
                                                    <InputError message={errors.images} className="mt-2" />
                                                    <p className="text-sm text-gray-500 mt-1">Las nuevas imágenes se agregarán al guardar la propiedad.</p>
                                                </div>

                                                {currentMedia.length > 0 ? (
                                                    <div className="flex flex-row flex-wrap gap-4">
                                                        {currentMedia.map((media) => (
                                                            <div key={media.id} className="relative border rounded-xl overflow-hidden">
                                                                <img
                                                                    src={media.original_url}
                                                                    alt={media.file_name}
                                                                    className="w-40 h-32 object-cover rounded-t-xl"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteImage(media.id)}
                                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                                    title="Eliminar imagen (se removerá al guardar)"
                                                                >
                                                                    <TrashIcon className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500">No hay imágenes cargadas.</p>
                                                )}
                                            </ContainerTitle>  {/* Cierre del ContainerTitle de 'Imágenes' */}
                                        </div>

                                    </div>  {/* Cierre del div col-span-full lg:col-span-1 */}

                                    {/* segundo columna */}
                                    <div className="col-span-full lg:col-span-1">  {/* Agrega spans: full en mobile, 1/3 en lg */}

                                        <div className="grid grid-cols-1 gap-4">

                                            <ContainerTitle title={'Publicación'} >
                                                <div >
                                                    <InputLabel htmlFor="status" value="Publicar" />
                                                    <Select
                                                        options={statusOptions}
                                                        value={statusValue}
                                                        onChange={handleStatusChange}
                                                        components={animatedComponents}
                                                        placeholder="Selecciona el estado de publicación"
                                                        name="status"
                                                        styles={customStyles}
                                                    />
                                                    <InputError message={errors.status} className="mt-2" />
                                                </div>

                                                <div className='md:col-span-1 lg:col-span-1'>
                                                    <InputLabel htmlFor="types_businesses_id" value="Tipo de negocio" />
                                                    <Select
                                                        options={typeBusinesses.map((type) => ({ value: type.id, label: type.name }))}
                                                        value={typesBusinessesValue}
                                                        onChange={handleTypesBusinessesChange}
                                                        components={animatedComponents}
                                                        placeholder="Selecciona un tipo de negocio"
                                                        name="types_businesses_id"
                                                        styles={customStyles}
                                                    />
                                                    <InputError message={errors.types_businesses_id} className="mt-2" />
                                                </div>

                                            </ContainerTitle>

                                            <ContainerTitle title={'Ubicación geográfica'}>
                                                <div className='col-span-2'>
                                                    <InputLabel htmlFor="country_id" value="Países" />
                                                    <Select
                                                        options={countriesOptions}
                                                        value={countriesValue}
                                                        onChange={handleCountryChange}
                                                        components={animatedComponents}
                                                        placeholder="Selecciona un país"
                                                        name="country_id"
                                                        styles={customStyles}
                                                    />
                                                    <InputError message={errors.country_id} className="mt-2" />
                                                </div>


                                                <div className='col-span-2'>
                                                    <InputLabel htmlFor="state_id" value="Estados" />
                                                    <Select
                                                        options={statesOptions}
                                                        value={statesValue}
                                                        onChange={handleStateChange}
                                                        components={animatedComponents}
                                                        isDisabled={statesByCountry.length === 0}
                                                        placeholder="Selecciona un estado"
                                                        name="state_id"
                                                        styles={customStyles}
                                                    />
                                                    <InputError message={errors.state_id} className="mt-2" />
                                                </div>


                                                <div className='col-span-2'>
                                                    <InputLabel htmlFor="city_id" value="Ciudades" />
                                                    <Select
                                                        options={citiesOptions}
                                                        value={citiesValue}
                                                        onChange={handleCityChange}
                                                        components={animatedComponents}
                                                        isDisabled={citiesByState.length === 0}
                                                        placeholder="Selecciona una ciudad"
                                                        name="city_id"
                                                        styles={customStyles}
                                                    />
                                                    <InputError message={errors.city_id} className="mt-2" />
                                                </div>


                                                <div className='col-span-2'>
                                                    <InputLabel htmlFor="direction" value="Dirección" />
                                                    <Textarea
                                                        id="direction"
                                                        name="direction"
                                                        rows={5}
                                                        value={data.direction}
                                                        className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                        onChange={(e) => setData('direction', e.target.value)}
                                                    />
                                                    <InputError message={errors.direction} className="mt-2" />
                                                </div>
                                            </ContainerTitle>

                                            <ContainerTitle title={'Características'} >
                                                <div>
                                                    <InputLabel htmlFor="amenity" value="Comodidades" />
                                                    <Select
                                                        isMulti
                                                        options={amenities.map((amenity) => ({ value: amenity.id, label: amenity.name }))}
                                                        value={amenityValue}
                                                        onChange={handleAmenityChange}
                                                        components={animatedComponents}
                                                        closeMenuOnSelect={false}
                                                        name='amenity'
                                                        styles={customStyles}
                                                    />
                                                    <InputError message={errors.amenity} className="mt-2" />
                                                </div>
                                            </ContainerTitle>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-end p-2.5">
                                    <PrimaryButton type="submit">
                                        Guardar
                                    </PrimaryButton>
                                </div>  {/* Cierre del div xs:grid md:grid xs:grid-cols-1 lg:grid-cols-3 gap-4 */}
                            </form>  {/* Cierre del form */}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
