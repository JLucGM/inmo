import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';
import TextAreaRich from '@/Components/TextAreaRich';
import React, { useRef } from 'react';
import CharacterCounter from '@/Components/CharacterCounter';
import { useState } from 'react';


export default function Create({ auth, categryposts, role, permission }) {

    const initialValues = {
        name: "",
        content: "",
        status: "0",
        category_post_id: categryposts[0].id,
    }

    const { data, setData, errors, post } = useForm(initialValues)
    const [charCount, setCharCount] = useState(0); // Estado para contar caracteres
    const charLimit = 200; // Límite de caracteres

    const submit = (e) => {
        e.preventDefault();
        console.log('Data before submitting:', data);

        post(route('post.store'))
        console.log(data)
    }

    const handleExtractChange = (e) => {
        const { value } = e.target;
        if (value.length <= charLimit) { // Limitar a 500 caracteres
            setData('extract', value); // Actualizar el estado con el nuevo texto
            setCharCount(value.length); // Actualizar contador de caracteres
        } else {
            // Si se excede, puedes actualizar el contador para mostrar el límite
            setData('extract', value.substring(0, charLimit)); // Limitar el texto a 500 caracteres
            setCharCount(charLimit); // Mantener el contador en 500
        }
    }

    const textAreaRef = useRef();

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de publicaciones',
            href: 'post.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear publicación',
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
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear Publicación
                    </h2>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear Publicación" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                                    <div className="col-span-full lg:col-span-3">
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
                                                <InputLabel htmlFor="extract" value="Extracto" />

                                                <Textarea
                                                    id="extract"
                                                    type="text"
                                                    name="extract"
                                                    rows={4}
                                                    value={data.extract}
                                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    onChange={handleExtractChange} // Llamar a la función directamente
                                                >

                                                </Textarea>
                                                <CharacterCounter currentCount={charCount} limit={200} /> {/* Usar el componente aquí */}

                                                <InputError message={errors.extract} className="mt-2" />
                                            </div>

                                            <div className='col-span-2'>
                                                <InputLabel htmlFor="content" value="Contenido" />
                                                <TextAreaRich

                                                    initialValue={data.content}
                                                    ref={textAreaRef}
                                                    name="content"
                                                    onChange={(newText) => setData('content', newText)}
                                                />
                                            </div>

                                        </ContainerTitle>
                                    </div>
                                    <div className="col-span-full lg:col-span-1">
                                        <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                            <div className='col-span-full'>
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

                                            <div className='col-span-full'>
                                                <div className="flex justify-between">
                                                    <InputLabel htmlFor="categryposts" value="Categoria" />
                                                    {/* {permission.some(perm => perm.name === 'admin.categoriesPost.index') && (
                                                        <Link className='text-sm text-gray-800 dark:text-gray-200 underline underline-offset-4' href={route('category-post.create')}>Crear</Link>
                                                    )} */}
                                                </div>

                                                <select
                                                    name="category_post_id"
                                                    id="categryposts"
                                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                                    value={data.category_post_id}
                                                    onChange={(e) => {
                                                        setData('category_post_id', parseInt(e.target.value));
                                                    }}
                                                >
                                                    {categryposts.map((categryposts) => (
                                                        <option value={categryposts.id} key={categryposts.id}>
                                                            {categryposts.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <InputError message={errors.categryposts} className="mt-2" />
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