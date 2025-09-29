import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Select, Textarea } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';
import SectionHeader from '@/Components/SectionHeader';

export default function Create({ auth, role, permission }) {

    const initialValues = {
        name: "",
        content: "",
        status: "0",
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('faqs.store'))
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
            name: 'Lista de faqs',
            href: 'faqs.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear faq',
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
                        title="Crear preguntas frecuentes"
                        subtitle="Aquí puedes crear una nueva pregunta frecuente."
                    />
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear faq" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>
                                <div className="grid xs:grid-cols-full lg:grid-cols-3 gap-4">
                                    <div className="col-span-full lg:col-span-2">
                                        <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className="col-span-2">
                                                <InputLabel htmlFor="name" value="Titulo" />

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

                                            <div className="col-span-2">
                                                <InputLabel htmlFor="content" value="Contenido" />

                                                <Textarea
                                                    id="content"
                                                    type="text"
                                                    name="content"
                                                    rows={10}
                                                    value={data.content}
                                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    onChange={(e) => setData('content', e.target.value)}
                                                >

                                                </Textarea>

                                                <InputError message={errors.content} className="mt-2" />
                                            </div>


                                        </ContainerTitle>
                                    </div>
                                    <div className="col-span-full lg:col-span-1">
                                        <ContainerTitle title={'Datos'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className="col-span-2">
                                                <InputLabel htmlFor="status" value="Status" />
                                                <Select
                                                    name="status"
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className={'mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm '}
                                                >
                                                    <option defaultValue="0">Borrador</option>
                                                    <option value="1">Publicar</option>
                                                </Select>
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