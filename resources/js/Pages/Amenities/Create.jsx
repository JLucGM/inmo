import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';

export default function Create({ auth, categoryAmenities }) {

    const initialValues = {
        name: "",
        category_amenities_id: categoryAmenities[0].id,
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('amenities.store'))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear comodidades
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Crear comodidades" />

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
                                    <InputLabel htmlFor="categoryAmenities" value="categoryAmenities" />

                                    <select
                                        name="category_amenities_id"
                                        id="categoryAmenities"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                        value={data.category_amenities_id} // Establecer el valor del select con el valor de category_amenities_id
                                        onChange={(e) => {
                                            setData('category_amenities_id', parseInt(e.target.value));
                                        }}
                                    >
                                        {categoryAmenities.map((categoryAmenities) => (
                                            <option value={categoryAmenities.id} key={categoryAmenities.id}>
                                                {categoryAmenities.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.categoryAmenities} className="mt-2" />
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