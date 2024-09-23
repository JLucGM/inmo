import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
        text: "",
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('testimonial.store'))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear testimonio
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Crear testimonio" />

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
                                    <InputLabel htmlFor="text" value="text" />

                                    <Textarea 
                                    id="text"
                                    type="text"
                                    name="text"
                                    value={data.text}
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                    onChange={(e) => setData('text', e.target.value)}
                                    >

                                    </Textarea>

                                    <InputError message={errors.text} className="mt-2" />
                                </div>

                                

                                <div>
                                    <InputLabel htmlFor="avatar" value="avatar" />

                                    <TextInput
                                        id="avatar"
                                        type="file"
                                        name="avatar"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('avatar', e.target.files[0])}
                                    />

                                    <InputError message={errors.avatar} className="mt-2" />
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