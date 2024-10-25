import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Select, Textarea } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';
import CharacterCounter from '@/Components/CharacterCounter';
import { useState } from 'react';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
        text: "",
        link: "",
        status: "0",
        image: null,
    }

    const { data, setData, errors, post } = useForm(initialValues)
    const [charCount, setCharCount] = useState(0); // Estado para contar caracteres
    const charLimit = 250; // Límite de caracteres

    const submit = (e) => {
        e.preventDefault();
        post(route('slides.store'))
        // console.log(data)
        // console.log(data.status)
    }

    const handleTextChange = (e) => {
        const { value } = e.target;
        if (value.length <= charLimit) { // Limitar a 500 caracteres
            setData('text', value); // Actualizar el estado con el nuevo texto
            setCharCount(value.length); // Actualizar contador de caracteres
        } else {
            // Si se excede, puedes actualizar el contador para mostrar el límite
            setData('text', value.substring(0, charLimit)); // Limitar el texto a 500 caracteres
            setCharCount(charLimit); // Mantener el contador en 500
        }
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
            name: 'Lista de Slides',
            href: 'slides.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear slides',
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
                        Crear slide
                    </h2>
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head title="Crear slide" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

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
                                        <InputLabel htmlFor="link" value="link" />

                                        <TextInput
                                            id="link"
                                            type="text"
                                            name="link"
                                            value={data.link}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('link', e.target.value)}
                                        />

                                        <InputError message={errors.link} className="mt-2" />
                                    </div>

                                    <Select
                                        name="status"
                                        aria-label="Project status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={'mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm '}
                                    >
                                        <option defaultValue="0">Borrador</option>
                                        <option value="1">Publicar</option>
                                    </Select>

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
                                        <InputLabel htmlFor="text" value="text" />

                                        <Textarea
                                            id="text"
                                            type="text"
                                            name="text"
                                            rows={10}
                                            value={data.text}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                            onChange={handleTextChange}
                                        />
                                        <CharacterCounter currentCount={charCount} limit={250} /> {/* Usar el componente aquí */}

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