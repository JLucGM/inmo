import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';
import TypesPropertiesForm from './TypesPropertiesForm';
import { Alert } from 'flowbite-react';
import SectionHeader from '@/Components/SectionHeader';

export default function Edit({ auth, typeproperty, role, permission }) {

    const initialValues = {
        name: typeproperty.name,

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
            name: 'Lista de tipo de propiedades',
            href: 'typesproperties.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Actualizar tipo de propiedades',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('typesproperties.update', typeproperty))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title="Actualizar tipos de propiedades"
                        subtitle="Aquí puedes actualizar el tipos de propiedades."
                    />
                    <Link href={route('typesproperties.create')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear tipo de propiedad
                    </Link>
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Actualizar Tipos De Propiedades" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>

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
                                            <span className="font-medium">Bien hecho!</span> tipo de propiedad actualizada exitosamente.
                                        </Alert>
                                    </div>
                                </Transition>

                                <img src={`${typeproperty.image}`} alt={typeproperty.image} className='w-40 rounded-3xl mx-auto' />


                                <TypesPropertiesForm data={data} setData={setData} errors={errors} />

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