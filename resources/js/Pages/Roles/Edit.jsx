import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Select, Textarea, Transition } from '@headlessui/react';
import Breadcrumb from '@/Components/Breadcrumb';
import ContainerTitle from '@/Components/ContainerTitle';
import SectionHeader from '@/Components/SectionHeader';

export default function Edit({ auth, roles, permissions, assignedPermissions, role, permission }) {

    const initialValues = {
        name: roles.name,
        content: roles.content,
        status: roles.status,
        permissions: assignedPermissions.map(String), // Asegúrate de que sean strings
    }

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues)

    const handleCheckboxChange = (permissionId) => {
        const currentIndex = data.permissions.indexOf(permissionId);
        const newPermissions = [...data.permissions];

        if (currentIndex === -1) {
            newPermissions.push(permissionId); // Agrega el permiso si no está seleccionado
        } else {
            newPermissions.splice(currentIndex, 1); // Elimina el permiso si ya está seleccionado
        }

        setData('permissions', newPermissions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.update', roles))
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
            name: 'Actualizar roles',
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
                        title="Actualizar rol"
                        subtitle="Aquí puedes actualizar los roles de usuario."
                    />
                    <Link href={route('roles.create')}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear nuevo rol
                    </Link>
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Actualizar roles" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className='space-y-4'>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 dark:text-gray-400 text-center">Saved.</p>
                                </Transition>

                                <ContainerTitle title={'Datos principales'} className='xs:grid md:grid xs:grid-cols-1 md:grid-cols-2 gap-4'>

                                    <div className='col-span-2'>
                                        <InputLabel htmlFor="name" value="Titulo" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full disabled:opacity-75"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={true}
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className=''>
                                        {/* <InputLabel htmlFor="name" value="Titulo" /> */}
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center">
                                                <input
                                                    id={`permission-${permission.id}`}
                                                    type="checkbox"
                                                    checked={data.permissions.includes(permission.id.toString())}
                                                    onChange={() => handleCheckboxChange(permission.id.toString())}
                                                    className="mr-2"
                                                />
                                                {/* <label htmlFor={`permission-${permission.id}`} className="text-gray-700">
                                                        {permission.name}
                                                    </label> */}
                                                <InputLabel htmlFor={`permission-${permission.id}`} value={permission.description} />
                                            </div>
                                        ))}
                                        <InputError message={errors.permissions} className="mt-2" />
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