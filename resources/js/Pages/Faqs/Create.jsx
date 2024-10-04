import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Select, Textarea } from '@headlessui/react';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
        content: "",
        status: "0",
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('faqs.store'))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear faqs
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" name="Crear faqs" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <div>
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

                                <div>
                                    <InputLabel htmlFor="content" value="Contenido" />

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