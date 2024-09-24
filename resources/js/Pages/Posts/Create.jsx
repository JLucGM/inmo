import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

export default function Create({ auth, categryposts }) {

    const initialValues = {
        name: "",
        content: "",
        status: "0",
        category_post_id: categryposts[0].id,
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        console.log('Data before submitting:', data);

        post(route('post.store'))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear Posts
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Crear Posts" />

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
                                    <InputLabel htmlFor="content" value="content" />

                                    <Textarea 
                                    id="content"
                                    type="text"
                                    name="content"
                                    value={data.content}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                    onChange={(e) => setData('content', e.target.value)}
                                    >

                                    </Textarea>

                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="categryposts" value="categryposts" />

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

                                <div>
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

                                <div>
                                    <InputLabel htmlFor="image" value="image" />

                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />

                                    <InputError message={errors.image} className="mt-2" />
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