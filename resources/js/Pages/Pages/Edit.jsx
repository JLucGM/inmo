import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea, Transition } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';
import TextAreaRich from '@/Components/TextAreaRich';
import { useRef } from 'react';

export default function Edit({ auth, page, role, permission }) {

    const textAreaRef = useRef();

    const initialValues = {
        name: page.name,
        body: page.body,
        status: page.status,
    }

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('pages.update', page))
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
            name: 'Lista de paginas',
            href: 'pages.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Actualizar pagina',
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
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Actualizar pagina</h2>
                    <Link href={route('pages.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >Crear
                    </Link>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head title="Actualizar Pagina" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                                </Transition>
                                <div className="grid xs:grid-cols-full lg:grid-cols-3 gap-4">
                                    <div className="xs:col-span-full lg:col-span-2">
                                        <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className='col-span-full'>
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
                                                <InputLabel htmlFor="body" value="Descripcion" />

                                                <TextAreaRich
                                                    initialValue={data.body}
                                                    ref={textAreaRef}
                                                    name="body"
                                                    onChange={(newText) => setData('body', newText)}
                                                />

                                                <InputError message={errors.body} className="mt-2" />
                                            </div>

                                        </ContainerTitle>
                                    </div>
                                    <div className="xs:col-span-full lg:col-span-1">
                                        <ContainerTitle title={'Datos secundarias'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className='col-span-2'>
                                                <img src={`${page.image}`} alt={page.image} className='w-56 mx-auto rounded-3xl' />

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

                                            <div className='col-span-full'>
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