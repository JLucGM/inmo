import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Create({ auth, permissions, role, permission }) {
    const initialValues = {
        name: "",
        permissions: [],
    }

    const { data, setData, errors, post } = useForm(initialValues)

    const handleCheckboxChange = (permissionId) => {
        const currentIndex = data.permissions.indexOf(permissionId);
        const newPermissions = [...data.permissions];

        if (currentIndex === -1) {
            newPermissions.push(permissionId);
        } else {
            newPermissions.splice(currentIndex, 1);
        }

        setData('permissions', newPermissions); // Asegúrate de que esto esté configurado correctamente
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'))
        // console.log(data)
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
            name: 'Lista de roles',
            href: 'roles.index',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
        {
            name: 'Crear roles',
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
                        Crear
                    </h2>
                </div>
            }
        >

            <Breadcrumb items={items} />

            <Head className="capitalize" title="Crear roles" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className="text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>
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

                                    <div className=''>
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`permission-${permission.id}`}
                                                    value={permission.id} // Cambiar a ID
                                                    checked={data.permissions.includes(permission.id)} // Verifica si el permiso está seleccionado
                                                    // onChange={() => handleCheckboxChange(permission.id)} // Maneja el cambio
                                                    onChange={() => handleCheckboxChange(permission.id)}
                                                    className="mr-2"
                                                />
                                                <InputLabel htmlFor={`permission-${permission.id}`} value={permission.description} />
                                            </div>
                                        ))}
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