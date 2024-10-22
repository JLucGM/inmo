import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea, Transition } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Edit({ auth, setting, currencies }) {

    const initialValues = {
        name: setting.name,
        phone: setting.phone,
        logo: setting.logo,
        logo_footer: setting.logo_footer,
        favicon: setting.favicon,
        direction: setting.direction,
        description: setting.description,
        currency_id: setting.currency_id || (currencies.length > 0 ? currencies[0].id : null), // Usar el valor de setting si existe
    }

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.update', setting))
        console.log(data)
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
            name: 'Configuraciones',
            // href: 'cities.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        // {
        //     name: 'Crear ciudad',
        //     icon: {
        //         path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
        //     },
        // },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Actualizar Configuraciones</h2>
                    {/* <Link href={route('amenities.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear setting
                    </Link> */}
                </div>
            }
        >

            <Breadcrumb items={items} />


            <Head className="capitalize" title="Actualizar Configuraciones" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4 '>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                                </Transition>

                                <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

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
                                        <InputLabel htmlFor="phone" value="phone" />

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
                                        <InputLabel htmlFor="direction" value="direction" />

                                        <TextInput
                                            id="direction"
                                            type="text"
                                            name="direction"
                                            value={data.direction}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('direction', e.target.value)}
                                        />

                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>



                                    <div>
                                        <InputLabel htmlFor="currency_id" value="currencies" />

                                        <select
                                            name="currency_id"
                                            id="currency_id"
                                            className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 capitalize dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                            value={data.currency_id}
                                            onChange={(e) => {
                                                setData('currency_id', parseInt(e.target.value));
                                            }}
                                        >
                                            {currencies.map((currency) => (
                                                <option value={currency.id} key={currency.id}>
                                                    {currency.symbol} - {currency.name}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError message={errors.currency_id} className="mt-2" />
                                    </div>

                                    <div className=''>
                                        <img src={`${setting.logo}`} alt={setting.logo} className='w-40' />

                                        <InputLabel htmlFor="logo" value="logo" />

                                        <TextInput
                                            id="logo"
                                            type="file"
                                            name="logo"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('logo', e.target.files[0])}
                                        />

                                        <InputError message={errors.logo} className="mt-2" />
                                    </div>

                                    <div>
                                        <img src={`${setting.logo_footer}`} alt={setting.logo_footer} className='w-40' />

                                        <InputLabel htmlFor="logo_footer" value="logo_footer" />

                                        <TextInput
                                            id="logo_footer"
                                            type="file"
                                            name="logo_footer"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('logo_footer', e.target.files[0])}
                                        />

                                        <InputError message={errors.logo_footer} className="mt-2" />
                                    </div>
                                    <div className=''>

                                        <img src={`${setting.favicon}`} alt={setting.favicon} className='w-40' />

                                        <InputLabel htmlFor="favicon" value="favicon" />

                                        <TextInput
                                            id="favicon"
                                            type="file"
                                            name="favicon"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('favicon', e.target.files[0])}
                                        />

                                        <InputError message={errors.favicon} className="mt-2" />
                                    </div>

                                    <div className='col-span-2'>
                                        <InputLabel htmlFor="description" value="description" />

                                        <Textarea
                                            id="description"
                                            type="text"
                                            name="description"
                                            rows={10}
                                            value={data.description}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                            onChange={(e) => setData('description', e.target.value)}
                                        />

                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>

                                </ContainerTitle>


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