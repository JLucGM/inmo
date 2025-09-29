import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea, Transition } from '@headlessui/react';
import { useState } from 'react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';
import { Alert } from 'flowbite-react';
import SectionHeader from '@/Components/SectionHeader';

export default function Edit({ auth, contacts, typepropety, country, state, city, users, statuses, typecontacts, origins, role, permission }) {

    const [selectedCountry, setSelectedCountry] = useState(country[0].id);;
    const [selectedState, setSelectedState] = useState(state[0].id);
    const [statesByCountry, setStatesByCountry] = useState(state);
    const [citiesByState, setCitiesByState] = useState(city);

    const initialValues = {
        name: contacts.name,
        identificación_contact: contacts.identificación_contact,
        email: contacts.email,
        phone: contacts.phone,
        birthdate: contacts.birthdate,
        description: contacts.description,
        bedrooms: contacts.bedrooms,
        bathrooms: contacts.bathrooms,
        min_budget: contacts.min_budget,
        max_budget: contacts.max_budget,
        direction: contacts.direction,
        status_contacts_id: contacts.status_contacts_id,
        types_properties_id: contacts.types_properties_id,
        types_contacts_id: contacts.types_contacts_id,
        country_id: contacts.country_id,
        state_id: contacts.state_id,
        city_id: contacts.city_id,
        user_id: contacts.user_id,
        origin_id: contacts.origin_id,
    }
    // console.log(contacts);

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('contacts.update', contacts))
        // console.log(data)
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
            name: 'Lista de contactos',
            href: 'contacts.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Actualizar contacto',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title="Actualizar contactos"
                        subtitle="Aquí puedes actualizar los contactos y gestionar sus demandas de las propiedades."
                    />
                    <Link href={route('contacts.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear contacto
                    </Link>
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear Contacto" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-[-100%]"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-[-100%]"
                                >
                                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
                                        <Alert
                                            color="success"
                                            className="border-0 shadow-lg"
                                        >
                                            <span className="font-medium">¡Bien hecho!</span> contacto actualizado exitosamente.
                                        </Alert>
                                    </div>
                                </Transition>

                                <div className="xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="">
                                        <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className='col-span-2'>
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

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="identificación_contact" value="N. de indentificacion" />

                                                <TextInput
                                                    id="identificación_contact"
                                                    type="text"
                                                    name="identificación_contact"
                                                    value={data.identificación_contact}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('identificación_contact', e.target.value)}
                                                />

                                                <InputError message={errors.identificación_contact} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="email" value="Email" />

                                                <TextInput
                                                    id="email"
                                                    type="text"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('email', e.target.value)}
                                                />

                                                <InputError message={errors.email} className="mt-2" />
                                            </div>


                                            <div>
                                                <InputLabel htmlFor="phone" value="Telefono" />

                                                <TextInput
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    value={data.phone}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                />

                                                <InputError message={errors.phone} className="mt-2" />
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
                                                <InputLabel htmlFor="users" value="Agente" />

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

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="description" value="descripcion" />

                                                <Textarea
                                                    id="description"
                                                    type="text"
                                                    name="description"
                                                    rows={10}
                                                    value={data.description}
                                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    onChange={(e) => setData('description', e.target.value)}
                                                />

                                                <InputError message={errors.description} className="mt-2" />
                                            </div>

                                        </ContainerTitle>
                                    </div>


                                    <div>
                                        <ContainerTitle title={'Demandas del contacto'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className='col-span-2'>
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
                                                <InputLabel htmlFor="min_budget" value="Presupuesto minimo" />

                                                <TextInput
                                                    id="min_budget"
                                                    type="text"
                                                    name="min_budget"
                                                    value={data.min_budget}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('min_budget', e.target.value)}
                                                />

                                                <InputError message={errors.min_budget} className="mt-2" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="max_budget" value="Presupuesto maximo" />

                                                <TextInput
                                                    id="max_budget"
                                                    type="text"
                                                    name="max_budget"
                                                    value={data.max_budget}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('max_budget', e.target.value)}
                                                />

                                                <InputError message={errors.max_budget} className="mt-2" />
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

                                            {/* <div className='col-span-2'>
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

                                            <div className='col-span-2'>
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

                                            <div className='col-span-2'>
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
                                            </div> */}

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
                                                <InputLabel htmlFor="direction" value="direccion" />

                                                <Textarea
                                                    id="direction"
                                                    type="text"
                                                    name="direction"
                                                    rows={5}
                                                    value={data.direction}
                                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    onChange={(e) => setData('direction', e.target.value)}
                                                />

                                                <InputError message={errors.direction} className="mt-2" />
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