import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import makeAnaimated from 'react-select/animated';
import { useState } from 'react';

export default function Create({ auth, typepropety, typebusiness, country, state, city, phystate, amenities }) {

    const [selectedCountry, setSelectedCountry] = useState(country[0].id);;
    const [selectedState, setSelectedState] = useState(state[0].id);

    const initialValues = {
        name: "",
        price: "",
        description: "",
        main: "",
        images: "",
        bedrooms: "",
        bathrooms: "",
        totalMeters: "",
        builtMeters: "",
        garages: "",
        direction: "",
        amenitiy: "",
        status: "0",
        types_properties_id: typepropety[0].id,
        types_businesses_id: typebusiness[0].id,
        country_id: country[0].id,
        state_id: state[0].id,
        city_id: city[0].id,
        phy_states_id: phystate[0].id,
    }

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
        setData('amenitiy', options.map((option) => option.value));
    };

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        console.log(data.amenitiy)
        const amenitiesIds = data.amenitiy;

        post(route('properties.store'), {
            amenities_ids: amenitiesIds,
        })
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear propiedad
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Crear propiedad" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <div>
                                    <InputLabel htmlFor="name" value="Nombre" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="Precio" />

                                    <TextInput
                                        id="price"
                                        type="text"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('price', e.target.value)}
                                    />

                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="bedrooms" value="Dormitorios" />

                                    <TextInput
                                        id="bedrooms"
                                        type="text"
                                        name="bedrooms"
                                        value={data.bedrooms}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('bedrooms', e.target.value)}
                                    />

                                    <InputError message={errors.bedrooms} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="bathrooms" value="Baños" />

                                    <TextInput
                                        id="bathrooms"
                                        type="text"
                                        name="bathrooms"
                                        value={data.bathrooms}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('bathrooms', e.target.value)}
                                    />

                                    <InputError message={errors.bathrooms} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="totalMeters" value="Metros totales" />

                                    <TextInput
                                        id="totalMeters"
                                        type="text"
                                        name="totalMeters"
                                        value={data.totalMeters}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('totalMeters', e.target.value)}
                                    />

                                    <InputError message={errors.totalMeters} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="builtMeters" value="Metros construidos" />

                                    <TextInput
                                        id="builtMeters"
                                        type="text"
                                        name="builtMeters"
                                        value={data.builtMeters}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('builtMeters', e.target.value)}
                                    />

                                    <InputError message={errors.builtMeters} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="garages" value="Garages" />

                                    <TextInput
                                        id="garages"
                                        type="text"
                                        name="garages"
                                        value={data.garages}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('garages', e.target.value)}
                                    />

                                    <InputError message={errors.garages} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="descripcion" />

                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('description', e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="direction" value="direction" />

                                    <TextInput
                                        id="direction"
                                        type="text"
                                        name="direction"
                                        value={data.direction}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('direction', e.target.value)}
                                    />

                                    <InputError message={errors.direction} className="mt-2" />
                                </div>

                                <div>
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
                                    </select>

                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div>
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
                                </div>

                                <div>
                                    <InputLabel htmlFor="typepropety" value="Tipo de propiedad" />

                                    <select
                                        name="typepropety_id"
                                        id="typepropety"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.typepropety_id} // Establecer el valor del select con el valor de typepropety_id
                                        onChange={(e) => {
                                            setData('typepropety_id', parseInt(e.target.value));
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

                                <div>
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



                                <div>
                                    <InputLabel htmlFor="typebusiness" value="typebusiness" />

                                    <select
                                        name="typebusiness_id"
                                        id="typebusiness"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.typebusiness_id} // Establecer el valor del select con el valor de typebusiness_id
                                        onChange={(e) => {
                                            setData('typebusiness_id', parseInt(e.target.value));
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

                                <div>
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

                                <div>
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

                                <div>
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

                                <div>
                                    <InputLabel htmlFor="main" value="main" />

                                    <TextInput
                                        id="main"
                                        type="file"
                                        name="main"
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('main', e.target.files[0])}
                                    />

                                    <InputError message={errors.main} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="images" value="images" />

                                    <TextInput
                                        id="images"
                                        type="file"
                                        name="images"
                                        className="mt-1 block w-full"
                                        multiple
                                        onChange={(e) => setData('images', Array.from(e.target.files))}
                                    />

                                    <InputError message={errors.images} className="mt-2" />
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