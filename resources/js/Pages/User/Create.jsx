import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ContainerTitle from '@/Components/ContainerTitle';
import UserForm from './UserForm';

export default function Create({ auth, role, permission, roles }) {

    const initialValues = {
        name: "",
        phone: "",
        email: "",
        password: "",
        status: 0, // o 1, dependiendo del valor predeterminado que desees
        avatar: null,
        role: "",
    }

    const customStyles = {
        control: (base, { isFocused }) => ({
            ...base,
            borderRadius: '30px',
            backgroundColor: isFocused ? 'gray-500' : 'gray-200', // Cambia el fondo del control
            borderColor: isFocused ? 'gray-500' : 'gray-200', // Cambia el borde del control
            '&:hover': {
                borderColor: 'gray-500', // Cambia el borde del control al pasar el mouse
            },
            '&.dark': {
                backgroundColor: 'gray-700', // Cambia el fondo del control en dark mode
                borderColor: 'gray-700', // Cambia el borde del control en dark mode
            },
        }),
        option: (base, { isSelected, hover }) => ({
            ...base,
            backgroundColor: isSelected ? '#F7F7F7' : 'white', // Cambia el fondo de la opción seleccionada
            color: isSelected ? 'black' : 'black', // Cambia el color de la opción seleccionada
            '&.dark': {
                backgroundColor: isSelected ? 'gray-700' : 'gray-900', // Cambia el fondo de la opción seleccionada en dark mode
                color: isSelected ? 'white' : 'gray-300', // Cambia el color de la opción seleccionada en dark mode
            },
        }),
    };

    const { data, setData, errors, post } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'))
        // console.log(data)
    }
    return (
        <AuthenticatedLayout
            roles={role}
            permission={permission}
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear Usuario
                    </h2>
                </div>
            }
        >
            <Head className="capitalize" title="Usuario" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>
                                <div className="grid grid-cols-3 gap-4">
                                    <UserForm
                                        roles={roles}
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
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
            </div >
        </AuthenticatedLayout >
    )
}