import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Create({ auth, country }) {

    const initialValues = {
        name: "",
        country_id: country[0].id,
    }

    const { data, setData, errors, post } = useForm(initialValues)

    useEffect(() => {
        setData('country_id', country[0].id); // Establecer el valor de country_id con el primer país
    }, [country]); // Dependencia del efecto

    const submit = (e) => {
        e.preventDefault();
        
        post(route('states.store'))
        console.log(data)
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear estado
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Crear estado" />

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
    <InputLabel htmlFor="country" value="País" />

    <select
            name="country_id"
            id="country"
            className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
            value={data.country_id} // Establecer el valor del select con el valor de country_id
            onChange={(e) => {
                setData('country_id', parseInt(e.target.value));
            }}
        >
            {country.map((country) => (
                <option value={country.id} key={country.id}>
                    {country.name}
                </option>
            ))}
        </select>

    <InputError message={errors.country} className="mt-2" />
</div>

                                <div className="flex justify-end">
                                    <PrimaryButton >
                                        Crear
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