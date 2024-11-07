import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DataTable from '@/Components/DataTable';
import Badge from '@/Components/Badge';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Index({ auth, users, roles, role, permission }) {
    //console.log(users)
    let [isOpen, setIsOpen] = useState(false)
    const { data, setData, errors, post } = useForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        status: "0", // o 1, dependiendo del valor predeterminado que desees
        avatar: null,
        role: "",
    });

    const items = [
        {
            name: 'Dashboard',
            href: 'dashboard',
            icon: {
                path: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
            },
        },
        {
            name: 'Lista de usuarios',
            icon: {
                path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
            },
        },
    ];

    const columns = [
        {
            header: "#id",
            cell: ({ row }) => {
                return (
                    <>
                        <div className="flex items-center">
                            <p className='me-2'>{row.original.id}</p>
                            <img src={`${row.original.avatar}`} alt={row.original.avatar} className='w-11 h-11 rounded-full object-cover' />
                        </div>
                    </>
                )
            },
        },
        {
            header: "Nombre",
            accessorKey: "name",
            
        },
        {
            header: "Correo",
            accessorKey: "email",
        },
        {
            header: "Telefono",
            accessorKey: "phone",
        },
        
        {
            header: "Estado",
            accessorKey: "status",
            cell: ({ row }) => {
                return (
                    <Badge className={` ${row.original.status === "1" ? 'bg-green-600' : 'bg-red-600'}`}>
                        {row.original.status === "1" ? 'Activo' : 'Inactivo'}
                    </Badge>
                )
            },
        },

    ]

    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'))
        console.log(data)
        setData({
            name: "",
            phone: "",
            email: "",
            password: "",
            status: "0",
            avatar: null,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Usuarios
                    </h2>
                    {/* <Link href={route('user.create')}
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear usuario
                    </Link> */}
                    <Button
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => setIsOpen(true)}>
                        Crear
                    </Button>

                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Usuarios" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">

                                <DataTable
                                    columns={columns}
                                    data={users}
                                    routeEdit={'user.edit'}
                                    routeDestroy={'user.destroy'}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
                <DialogBackdrop className="fixed inset-0 bg-black/40" />

                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-[40rem] space-y-4 border bg-white p-8 dark:bg-gray-800 rounded-2xl">
                        <DialogTitle className="font-bold text-gray-700 dark:text-gray-300 capitalize">Crear usuario</DialogTitle>
                        <Description className={'text-gray-700 dark:text-gray-300'}>Ingresa la información del usuario</Description>
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
                                <InputLabel htmlFor="email" value="Correo" />

                                <TextInput
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="password" value="Contraseña" />

                                <TextInput
                                    id="password"
                                    type="text"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Teléfono" />

                                <TextInput
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />

                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Estado" />

                                <select
                                    name="status"
                                    id=""
                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-full shadow-sm"
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value={0}>Inactivo</option>
                                    <option value={1}>Activo</option>
                                </select>

                                <InputError message={errors.status} className="mt-2" />
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

                            <div>
                                    <InputLabel htmlFor="role" value="Rol" />

                                    <select
                                        name="role"
                                        id="role"
                                        className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-full shadow-sm"
                                        onChange={(e) => setData('role', e.target.value)}
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.name}>{role.name}</option>
                                        ))}
                                    </select>

                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                            <div className="flex justify-end p-2.5">
                                <PrimaryButton>
                                    Guardar
                                </PrimaryButton>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>

        </AuthenticatedLayout>
    )
}