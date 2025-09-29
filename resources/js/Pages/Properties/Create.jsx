import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import makeAnaimated from 'react-select/animated';
import { useState } from 'react';
import ContainerTitle from '@/Components/ContainerTitle';
import { Textarea } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import TextAreaRich from '@/Components/TextAreaRich';
import { useRef } from 'react';
import customStyles from '@/Components/lib/SelectCustom'
import SectionHeader from '@/Components/SectionHeader';


export default function Create({ auth, typepropety, typebusiness, country, state, city, phystate, amenities, role, permission }) {
    // console.log(amenities)
    const [selectedCountry, setSelectedCountry] = useState(country[0].id);;
    const [selectedState, setSelectedState] = useState(state[0].id);

    const textAreaRef = useRef();

    const initialValues = {
        name: "",
        price: "",
        description: "",
        identification: "",
        images: "",
        bedrooms: "",
        bathrooms: "",
        totalMeters: "",
        builtMeters: "",
        garages: "",
        direction: "",
        // coordinate: "",
        amenitiy: "",
        status: "0",
        types_properties_id: typepropety[0].id,
        types_businesses_id: typebusiness[0].id,
        country_id: country[0].id,
        state_id: state[0].id,
        city_id: city[0].id,
        phy_states_id: phystate[0].id,
    }

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de propiedades',
            href: 'properties.index',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Crear propiedad',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    const animatedComponents = makeAnaimated()

    const handleAmenityChange = (options) => {
        setData('amenitiy', options.map((option) => option.value));
    };

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        const amenitiesIds = data.amenitiy;

        post(route('properties.store'), {
            amenities_ids: amenitiesIds,
        })
        console.log(data)
    }


    // const [selectedLocation, setSelectedLocation] = useState(null);

    // function MapEventHandler() {
    //     const map = useMapEvents({
    //         click: (event) => {
    //             const { lat, lng } = event.latlng;
    //             setSelectedLocation([lat, lng]);
    //             setData('coordinate', `${lat},${lng}`);
    //         },
    //     });
    //     return null;
    // }

    // console.log(selectedLocation)
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center px-6'>
                    <SectionHeader
                        title="Crear propiedad"
                        subtitle="Aquí puedes crear una nueva propiedad."
                    />
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear propiedad" />

            <div className="p-">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} >

                                <div className="xs:grid md:grid xs:grid-cols-1 lg:grid-cols-3 gap-4">
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

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="typepropety" value="Tipo de propiedad" />

                                                <select
                                                    name="types_properties_id"
                                                    id="typepropety"
                                                    className="capitalize border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.types_properties_id} // Establecer el valor del select con el valor de types_properties_id
                                                    onChange={(e) => {
                                                        setData('types_properties_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {typepropety.map((typepropety) => (
                                                        <option value={typepropety.id} key={typepropety.id}>
                                                            {typepropety.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.typepropety} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="typebusiness" value="Tipo de negocio" />

                                                <select
                                                    name="types_businesses_id"
                                                    id="typebusiness"
                                                    className="capitalize border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.types_businesses_id} // Establecer el valor del select con el valor de types_businesses_id
                                                    onChange={(e) => {
                                                        setData('types_businesses_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {typebusiness.map((typebusiness) => (
                                                        <option value={typebusiness.id} key={typebusiness.id}>
                                                            {typebusiness.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.typebusiness} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="identification" value="Nro. de identificación" />

                                                <TextInput
                                                    id="identification"
                                                    type="text"
                                                    name="identification"
                                                    value={data.identification}
                                                    className=" block w-full"

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
                                                <InputLabel htmlFor="phystate" value="Estado fisico" />

                                                <select
                                                    name="phy_states_id"
                                                    id="phystate"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.phy_states_id} // Establecer el valor del select con el valor de phy_states_id
                                                    onChange={(e) => {
                                                        setData('phy_states_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {phystate.map((phystate) => (
                                                        <option className="capitalize" value={phystate.id} key={phystate.id}>
                                                            {phystate.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.phystate} className="mt-2" />
                                            </div>

<div className="grid grid-cols-1 lg:grid-cols-3 col-span-full gap-4">
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
                                                <InputLabel htmlFor="Baños" value="Baños" />

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
                                                <InputLabel htmlFor="Garages" value="Garages" />

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

                                                <InputLabel htmlFor="description" value="descripcion" />

                                                <TextAreaRich

                                                    initialValue={data.description}
                                                    ref={textAreaRef}
                                                    name="description"
                                                    onChange={(newText) => setData('description', newText)}
                                                />

                                                <InputError message={errors.description} className="mt-2" />
                                            </div>
                                        </ContainerTitle>

                                        <ContainerTitle title={'Imagenes'} className='grid grid-cols-1 gap-4'>
                                            <div>
                                                <InputLabel htmlFor="images" value="images" />
                                                <TextInput
                                                    id="images"
                                                    type="file"
                                                    name="images"
                                                    className="block w-full"
                                                    multiple
                                                    onChange={(e) => setData('images', Array.from(e.target.files))}
                                                />
                                                <InputError message={errors.images} className="mt-2" />
                                            </div>
                                        </ContainerTitle>
                                    </div>
                                    <div className="col-span-full lg:col-span-1">
                                        <ContainerTitle title={'Publicación'} className=''>


                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="status" value="Publicar" />

                                                <select
                                                    name="status"
                                                    id="status"
                                                    value={data.status}
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-full shadow-sm"
                                                    onChange={(e) => setData('status', e.target.value)}
                                                >
                                                    <option value={0}>Borrador</option>
                                                    <option value={1}>Publicar</option>
                                                    <option value={2}>Vendido</option>
                                                </select>

                                                <InputError message={errors.status} className="mt-2" />
                                            </div>
                                        </ContainerTitle>
                                        <ContainerTitle title={'Ubicación geográfica'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="country" value="Paises" />

                                                <select
                                                    name="country_id"
                                                    id="country"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.country_id} // Establecer el valor del select con el valor de country_id
                                                    onChange={(e) => {
                                                        setData('country_id', parseInt(e.target.value));
                                                        setSelectedCountry(parseInt(e.target.value));
                                                    }}
                                                >
                                                    {country.map((country) => (
                                                        <option value={country.id} key={country.id}>
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.country} className="mt-2" />
                                            </div>

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="state" value="Estados" />

                                                <select
                                                    name="state_id"
                                                    id="state"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.state_id} // Establecer el valor del select con el valor de state_id
                                                    onChange={(e) => {
                                                        setData('state_id', parseInt(e.target.value));
                                                        setSelectedState(parseInt(e.target.value));

                                                    }}
                                                >
                                                    {state.filter((state) => state.country_id === selectedCountry).map((state) => (
                                                        <option value={state.id} key={state.id}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.state} className="mt-2" />
                                            </div>

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="city" value="Ciudades" />

                                                <select
                                                    name="city_id"
                                                    id="city"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.city_id} // Establecer el valor del select con el valor de city_id
                                                    onChange={(e) => {
                                                        setData('city_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {city.filter((city) => city.state_id === selectedState).map((city) => (
                                                        <option value={city.id} key={city.id}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.city} className="mt-2" />
                                            </div>

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="direction" value="direction" />

                                                <Textarea
                                                    id="direction"
                                                    type="text"
                                                    name="direction"
                                                    rows={5}
                                                    value={data.direction}
                                                    className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    onChange={(e) => setData('direction', e.target.value)}
                                                />

                                                <InputError message={errors.direction} className="mt-2" />
                                            </div>

                                            {/* <div className="col-span-2">
                                                <MapView>
                                                    <MapEventHandler />
                                                    {selectedLocation && (
                                                        <Marker position={selectedLocation}>
                                                            <Popup>
                                                                Selected location: <br /> {selectedLocation[0]}, {selectedLocation[1]}
                                                            </Popup>
                                                        </Marker>
                                                    )}
                                                </MapView>
                                                <input type="hidden" name="coordinate" value={data?.coordinate} />
                                            </div> */}

                                        </ContainerTitle>

                                        <ContainerTitle title={'Caracteristicas'} className='grid grid-cols-1 gap-4'>

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="amenitiy" value="Comodidades" />
                                                <Select
                                                    isMulti
                                                    options={amenities.map((amenitiy) => ({ value: amenitiy.id, label: amenitiy.name }))}
                                                    onChange={handleAmenityChange}
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                    name='amenitiy'
                                                    styles={customStyles}
                                                />
                                                <InputError message={errors.amenitiy} className="mt-2" />
                                            </div>
                                        </ContainerTitle>



                                    </div>
                                </div>

                                <div className="flex justify-end p-2.5">
                                    <PrimaryButton >
                                        Guardar
                                    </PrimaryButton>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}