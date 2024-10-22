import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea, Transition } from '@headlessui/react';
import Select from 'react-select';
import makeAnaimated from 'react-select/animated';
import { useState } from 'react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';
import { Marker } from 'react-leaflet';
import MapView from '@/Components/MapView';

export default function Edit({ auth, property, state, country, typepropety, typebusiness, city, phystate, amenities, propertyAmenities, images, main }) {

    const [selectedCountry, setSelectedCountry] = useState(country[0].id);;
    const [selectedState, setSelectedState] = useState(state[0].id);
    const [statesByCountry, setStatesByCountry] = useState(state);
    const [citiesByState, setCitiesByState] = useState(city);
    const [uploadedImages, setImages] = useState([]);
    

    const initialValues = {
        name: property.name,
        price: property.price,
        description: property.description,
        identification: property.identification,
        main: property.main,
        images: property.images,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        totalMeters: property.totalMeters,
        builtMeters: property.builtMeters,
        garages: property.garages,
        direction: property.direction,
        // coordinate: property.coordinate,
        amenitiy: property.amenitiy,
        status: property.status,
        types_properties_id: property.types_properties_id,
        types_businesses_id: property.types_businesses_id,
        country_id: property.country_id,
        state_id: property.state_id,
        city_id: property.city_id,
        phy_states_id: property.phy_states_id,
    }
    // console.log(property);

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
            name: 'Actualizar propiedad',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    const customStyles = {
        control: (base, { isFocused }) => ({
            ...base,
            borderRadius: '30px',
            backgroundColor: isFocused ? 'gray-500' : 'gray-200', // Cambia el fondo del control
            borderColor: isFocused ? 'gray-500' : 'gray-200', // Cambia el borde del control
            '&:hover': {
                borderColor: 'gray-500', // Cambia el borde del control al pasar el mouse
            },
            '&.dark': {
                backgroundColor: 'gray-700', // Cambia el fondo del control en dark mode
                borderColor: 'gray-700', // Cambia el borde del control en dark mode
            },
        }),
        option: (base, { isSelected, hover }) => ({
            ...base,
            backgroundColor: isSelected ? '#F7F7F7' : 'white', // Cambia el fondo de la opción seleccionada
            color: isSelected ? 'black' : 'black', // Cambia el color de la opción seleccionada
            '&.dark': {
                backgroundColor: isSelected ? 'gray-700' : 'gray-900', // Cambia el fondo de la opción seleccionada en dark mode
                color: isSelected ? 'white' : 'gray-300', // Cambia el color de la opción seleccionada en dark mode
            },
        }),
    };

    const animatedComponents = makeAnaimated()

    const handleAmenityChange = (options) => {
        setData('amenity', options.map((option) => option.value));
    };

    const handleUpdateImages = (e, images) => {
        e.preventDefault();
        //setImages(images);
        setData('images', uploadedImages); // Actualiza el campo images en el formulario
        post(route('property.updateImages', property.id), {
            main: data.main,
            images: data.images,
        });
    };

    const handleDeleteImage = (imageId, images) => {
        post(route('property.deleteImage', [property.id, imageId]));
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('properties.update', property))
        console.log(data)
    }

    // const [selectedCoordinate, setSelectedCoordinate] = useState(data.coordinate);

    // const handleMapClick = (e) => {
    //     const coordinate = [e.latlng.lat, e.latlng.lng].join(',');
    //     console.log()
    //     setSelectedCoordinate(coordinate);
    //     setData('coordinate', coordinate);
    //   };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="font-semibold capitalize text-xl text-gray-800 dark:text-gray-200 leading-tight">Actualizar propiedad</h2>
                    <Link href={route('properties.create')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear
                    </Link>
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Actualizar propiedad" />

            <div className=" mb-5">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                                </Transition>
                                <div className="xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4">


                                    <div>

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
                                                <InputLabel htmlFor="typepropety" value="Tipo de propiedad" />

                                                <select
                                                    name="types_properties_id"
                                                    id="typepropety"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.types_properties_id}
                                                    onChange={(e) => {
                                                        setData('types_properties_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {typepropety.map((type) => (
                                                        <option value={type.id} key={type.id}>
                                                            {type.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.typepropety} className="mt-2" />
                                            </div>

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="typebusiness" value="typebusiness" />

                                                <select
                                                    name="types_businesses_id"
                                                    id="typebusiness"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
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

                                            <div className='md:col-span-2 lg:col-span-1'>
                                                <InputLabel htmlFor="identification" value="identification" />

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
                                                        <option value={phystate.id} key={phystate.id}>
                                                            {phystate.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.phystate} className="mt-2" />
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
                                                <InputLabel htmlFor="description" value="descripcion" />

                                                <Textarea
                                                    id="description"
                                                    type="text"
                                                    name="description"
                                                    value={data.description}
                                                    className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"

                                                    onChange={(e) => setData('description', e.target.value)}
                                                />

                                                <InputError message={errors.description} className="mt-2" />
                                            </div>

                                        </ContainerTitle>

                                    </div>

                                    <div>
                                        <ContainerTitle title={'Ubicación geográfica'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="country" value="Paises" />

                                                <select
                                                    name="country_id"
                                                    id="country"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.country_id}
                                                    onChange={(e) => {
                                                        setData('country_id', parseInt(e.target.value));
                                                        setSelectedCountry(parseInt(e.target.value));
                                                        const states = state.filter((s) => s.country_id === parseInt(e.target.value));
                                                        setStatesByCountry(states);
                                                        setCitiesByState([]);
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
                                                    value={data.state_id}
                                                    onChange={(e) => {
                                                        setData('state_id', parseInt(e.target.value));
                                                        setSelectedState(parseInt(e.target.value));
                                                        const cities = city.filter((c) => c.state_id === parseInt(e.target.value));
                                                        setCitiesByState(cities);
                                                    }}
                                                >
                                                    {statesByCountry.map((state) => (
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
                                                    value={data.city_id}
                                                    onChange={(e) => {
                                                        setData('city_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {citiesByState.map((city) => (
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
                                                    value={data.direction}
                                                    className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    onChange={(e) => setData('direction', e.target.value)}
                                                />

                                                <InputError message={errors.direction} className="mt-2" />
                                            </div>

                                            {/* <div className="col-span-2">
                                            <MapView center={selectedCoordinate.split(',').map(Number)} onClick={handleMapClick}>
  {selectedCoordinate && (
    <Marker position={selectedCoordinate.split(',').map(Number)}>
       <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> 
    </Marker>
  )}
</MapView>
<input type="hidden" name="coordinate" value={selectedCoordinate} />
                                            </div> */}

                                        </ContainerTitle>

                                        <ContainerTitle title={'Caracteristicas'} className='grid grid-cols-1 gap-4'>

                                            <div>
                                                <InputLabel htmlFor="amenitiy" value="Comodidades" />
                                                <Select
                                                    isMulti
                                                    options={amenities.map((amenitiy) => ({ value: amenitiy.id, label: amenitiy.name }))}
                                                    defaultValue={propertyAmenities.map((amenitiy) => ({ value: amenitiy.id, label: amenitiy.name }))}
                                                    onChange={handleAmenityChange}
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                    name='amenitiy'
                                                    styles={customStyles}
                                                />
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

            <div>


                <form onSubmit={(e) => handleUpdateImages(e, images)}>
                    <ContainerTitle title={'Imagenes'} className='grid grid-cols-1 gap-4'>
                        <img src={`${main}`} alt={main} className='w-40' />
                        <div className='flex flex-col '>
                            <InputLabel>Imagen de portada</InputLabel>
                            <TextInput type="file" name="main" onChange={(e) => setData('main', e.target.files[0])} />
                        </div>

                        <div className="flex flex-row flex-nowrap gap-4 my-4">

                            {images.map((image, index) => (
                                <div key={index}>
                                    <div className="border rounded-lg">
                                        <img src={`${image.name}`} className='w-40 rounded-t-lg' alt={image.name} />
                                        <PrimaryButton className='my-2' onClick={() => handleDeleteImage(image.id, images)}>
                                            Eliminar
                                        </PrimaryButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col my-4'>
                            <InputLabel>Imágenes adicionales</InputLabel>
                            <TextInput type="file" name="images" multiple onChange={(e) => setData('images', e.target.files)} />
                        </div>
                    </ContainerTitle>
                    <div className="flex justify-end p-2.5">
                        <PrimaryButton >
                            Guardar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}