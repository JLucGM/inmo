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

export default function Index({ auth, users }) {
    //console.log(users)
    let [isOpen, setIsOpen] = useState(false)
    const { data, setData, errors, post } = useForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        status: "0", // o 1, dependiendo del valor predeterminado que desees
        avatar: null,
    });

    const columns = [
        {
            header: "#id",
            accessorKey: "id",
        },
        {
            header: "Avatar",
            accessorKey: "avatar",
            cell: ({ row }) => {
                return (
                    <img className='w-16 mx-auto' src={`/img/profile/${row.original.avatar}`} alt={`${row.original.avatar}`} />

                )
            },
        },
        {
            header: "Nombre",
            accessorKey: "name",
            expanded: (row) => {
                // Aquí puedes agregar la información adicional que deseas mostrar
                return (
                    <div className='flex'>
                        <div className="ms-4">
                            <p>Email: {row.original.email}</p>
                            <p>phone: {row.original.phone}</p>
                        </div>
                    </div>
                );
            },
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
            header={
                <div className='flex justify-between items-center px-6'>
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
            <Head className="capitalize" title="Usuarios" />

            <div className="p-6">
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
                                {/* <table className="w-full border-collapse border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hover:border-collapse">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                avatar
                                            </th>
                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                Status
                                            </th>

                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users?.map((user) => (

                                                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="border border-slate-200 px-6 py-4">
                                                        <img className='w-16 mx-auto' src={`/img/profile/${user.avatar}`} alt="" />
                                                    </td>
                                                    <th scope="row" className="capitalize border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {user.name}
                                                    </th>
                                                    <td className="border border-slate-200 px-6 py-4">
                                                        {user.email}
                                                    </td>
                                                    <td className="border border-slate-200 px-6 py-4">
                                                        {user.status}
                                                    </td>

                                                    <td className="border border-slate-200 px-6 py-4">
                                                        <div className='space-x-4'>
                                                            <Link
                                                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                                href={route('user.edit', [user])}>
                                                                Editar
                                                            </Link>
                                                            <Link
                                                                className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                href={route('user.destroy', [user])} method='delete' as="button">
                                                                Eliminar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table> */}
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