import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Select, Textarea, Transition } from '@headlessui/react';
import ContainerTitle from '@/Components/ContainerTitle';
import Breadcrumb from '@/Components/Breadcrumb';
import { useState } from 'react';
import CharacterCounter from '@/Components/CharacterCounter';
import ReactPlayer from 'react-player';
import SectionHeader from '@/Components/SectionHeader';
import { Alert } from 'flowbite-react';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, slide, role, permission }) {

    const initialValues = {
        name: slide.name,
        text: slide.text || '',
        link: slide.link,
        status: slide.status,
        image: null,
    }

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)
    const [charCount, setCharCount] = useState((slide.text || '').length);
    const charLimit = 250;

    const submit = (e) => {
        e.preventDefault();
        post(route('slides.update', slide))
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
            name: 'Lista de slides',
            href: 'slides.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Actualizar slide',
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
                        title="Actualizar slide"
                        subtitle="Aquí puedes actualizar un slide existente."
                    />
                    <Link href={route('slides.create')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear slide
                    </Link>
                </div>
            }
        >

            <Breadcrumb items={items} />


            <Head title="Slide" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out duration-300"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in-out duration-300"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
                                        <Alert
                                            color="success"
                                            className="border-0 shadow-lg"
                                        >
                                            <div className="flex items-center">

                                                <HandThumbUpIcon className="w-5 h-5 text-green-700 dark:text-green-400" />
                                                <span className="font-bold">¡Se actualizó correctamente!</span>
                                            </div>
                                        </Alert>
                                    </div>
                                </Transition>
                            <form onSubmit={submit} className='space-y-4'>

                                <div className="xs:grid md:grid xs:grid-cols-full lg:grid-cols-3 gap-4">
                                    <div className="xs:col-span-full lg:col-span-2">
                                        <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className="col-span-full">
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
                                                <InputLabel htmlFor="text" value="Descripción" />

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
                                    </div>

                                    <div className="xs:col-span-full lg:col-span-">
                                        <ContainerTitle title={'Datos secundarios'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className="col-span-full">
                                                {slide.image.endsWith('.mp4') || slide.image.endsWith('.webm') || slide.image.endsWith('.ogg') ? (
                                                    <ReactPlayer
                                                        url={slide.image}
                                                        controls={true} // Muestra los controles del video
                                                        width='100%' // Ajusta el ancho según sea necesario
                                                        height='auto' // Ajusta la altura según sea necesario
                                                    />
                                                ) : (
                                                    <img src={slide.image} alt={slide.image} className='mx-auto w-60 rounded-3xl' />
                                                )}

                                                <InputLabel htmlFor="image" value="Imagen" />
                                                <TextInput
                                                    id="image"
                                                    type="file"
                                                    name="image"
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('image', e.target.files[0])}
                                                />

                                                <InputError message={errors.image} className="mt-2" />
                                            </div>

                                            <div className="col-span-full">
                                                <InputLabel htmlFor="status" value="Estado" />
                                                <Select
                                                    name="status"
                                                    aria-label="Project status"
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className={'mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm '}
                                                >
                                                    <option value="0">Borrador</option>
                                                    <option value="1">Publicar</option>
                                                </Select>
                                                <InputError message={errors.status} className="mt-2" />
                                            </div>

                                            <div className="col-span-full">
                                                <InputLabel htmlFor="link" value="Link (Opcional)" />
                                                <div className="flex">
                                                    <span className='flex flex-col justify-center px-2 rounded-s-full border border-gray-300 dark:border-gray-700'>https://</span>
                                                    <TextInput
                                                        id="link"
                                                        type="text"
                                                        name="link"
                                                        value={data.link || ''}
                                                        className=" block w-full rounded-s-none"
                                                        onChange={(e) => setData('link', e.target.value)}
                                                    />
                                                </div>

                                                <InputError message={errors.link} className="mt-2" />
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