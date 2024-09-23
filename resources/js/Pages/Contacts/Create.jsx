import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { useState } from 'react';



export default function Create({ auth, typepropety, country, state, city, users, statuses,typecontacts,origins }) {

    const [selectedCountry, setSelectedCountry] = useState(country[0].id);;
    const [selectedState, setSelectedState] = useState(state[0].id);

    const initialValues = {
        name: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        direction: "",
        email: "",
        phone: "",
        birthdate: "",
        min_budget: "",
        max_budget: "",
        status_contacts_id: statuses[0].id,
        types_contacts_id: typecontacts[0].id,
        types_properties_id: typepropety[0].id,
        country_id: country[0].id,
        state_id: state[0].id,
        city_id: city[0].id,
        user_id: users[0].id,
        origin_id: origins[0].id,

    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();

        post(route('contacts.store'))
        console.log(data)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear contacto
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Crear contacto" />

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
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="min_budget" value="Preuspuesto minimo" />

                                    <TextInput
                                        id="min_budget"
                                        type="text"
                                        name="min_budget"
                                        value={data.min_budget}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('min_budget', e.target.value)}
                                    />

                                    <InputError message={errors.min_budget} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="max_budget" value="Preuspuesto maximo" />

                                    <TextInput
                                        id="max_budget"
                                        type="text"
                                        name="max_budget"
                                        value={data.max_budget}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('max_budget', e.target.value)}
                                    />

                                    <InputError message={errors.max_budget} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="phone" value="Telefono" />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />

                                    <InputError message={errors.phone} className="mt-2" />
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
                                    <InputLabel htmlFor="birthdate" value="birthdate" />

                                    <TextInput
                                        id="birthdate"
                                        type="date"
                                        name="birthdate"
                                        value={data.birthdate}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('birthdate', e.target.value)}
                                    />

                                    <InputError message={errors.birthdate} className="mt-2" />
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
                                    <InputLabel htmlFor="direction" value="direccion" />

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
                                    <InputLabel htmlFor="statuses" value="Status de contacto" />

                                    <select
                                        name="status_contacts_id"
                                        id="statuses"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.status_contacts_id} // Establecer el valor del select con el valor de status_contacts_id
                                        onChange={(e) => {
                                            setData('status_contacts_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {statuses.map((statuses) => (
                                            <option value={statuses.id} key={statuses.id}>
                                                {statuses.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.statuses} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="typepropety" value="Tipo de propiedad" />

                                    <select
                                        name="types_properties_id"
                                        id="typepropety"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
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
                                <div>
                                    <InputLabel htmlFor="typecontacts" value="Tipo de contacto" />

                                    <select
                                        name="types_contacts_id"
                                        id="typecontacts"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.types_contacts_id} // Establecer el valor del select con el valor de types_contacts_id
                                        onChange={(e) => {
                                            setData('types_contacts_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {typecontacts.map((typecontacts) => (
                                            <option value={typecontacts.id} key={typecontacts.id}>
                                                {typecontacts.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.typecontacts} className="mt-2" />
                                </div>


                                <div>
                                    <InputLabel htmlFor="origins" value="Media de captacion" />

                                    <select
                                        name="origin_id"
                                        id="origins"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.origin_id} // Establecer el valor del select con el valor de origin_id
                                        onChange={(e) => {
                                            setData('origin_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {origins.map((origins) => (
                                            <option value={origins.id} key={origins.id}>
                                                {origins.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.origin_id} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="origins" value="Agente" />

                                    <select
                                        name="user_id"
                                        id="users"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.user_id} // Establecer el valor del select con el valor de user_id
                                        onChange={(e) => {
                                            setData('user_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {users.map((users) => (
                                            <option value={users.id} key={users.id}>
                                                {users.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.users} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="country" value="Paises" />

                                    <select
                                        name="country_id"
                                        id="country"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
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
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
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
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
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