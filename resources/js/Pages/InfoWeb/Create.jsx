import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
        text: "",
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('info-web.store'))
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
            name: 'Lista de Informacion web',
            href: 'info-web.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear Informacion web',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear 
                    </h2>
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>
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


                                    <div>
                                        <InputLabel htmlFor="image" value="image" />

                                        <TextInput
                                            id="image"
                                            type="file"
                                            name="image"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                        />

                                        <InputError message={errors.image} className="mt-2" />
                                    </div>

                                    <div className='col-span-2'>
                                        <InputLabel htmlFor="name" value="texto" />

                                        <Textarea
                                            id="text"
                                            type="text"
                                            name="text"
                                            value={data.text}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm "
                                            onChange={(e) => setData('text', e.target.value)}
                                        />

                                        <InputError message={errors.text} className="mt-2" />
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