import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DataTable from '@/Components/DataTable';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionHeader from '@/Components/SectionHeader';

export default function Index({ auth, cities, state, role, permission }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, errors, post } = useForm({
        name: "",
        state_id: state[0].id,
    })

    const columns = [
        {
            header: "#id",
            accessorKey: "id",
        },
        {
            header: "Nombre",
            accessorKey: "name",
            expanded: (row) => {
                // Aquí puedes agregar la información adicional que deseas mostrar
                return (
                    <div>
                        <p>Nombre: {row.original.name}</p>
                        <p>Estado: {row.original.state.name}</p>
                    </div>
                );
            },
        }
    ]

    const submit = (e) => {
        e.preventDefault();
        post(route('cities.store'))
        setData({
            name: "",
            state_id: state[0].id,
        });
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
            name: 'Lista de ciudades',
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
                        title="Crear ciudad"
                        subtitle="Aquí puedes crear una nueva ciudad."
                    />
                    {permission.some(perm => perm.name === 'admin.cities.create') && (
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Crear ciudad
                        </Button>
                    )}
                </div>
            }
        >
            <Breadcrumb items={items} />

            <Head className="capitalize" title="Ciudades" />

            <div className="">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto">
                                <DataTable
                                    columns={columns}
                                    data={cities}
                                    routeEdit={'cities.edit'}
                                    routeDestroy={'cities.destroy'}
                                    editPermission={'admin.cities.edit'} // Pasa el permiso de editar
                                    deletePermission={'admin.cities.delete'} // Pasa el permiso de eliminar
                                    // downloadPdfPermission={'downloadPdfPermission'} // Pasa el permiso de descargar PDF
                                    permissions={permission}
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
                        <DialogTitle className="font-bold text-gray-700 dark:text-gray-300 capitalize">Crear Ciudad</DialogTitle>
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
                                <InputLabel htmlFor="state" value="Estado" />

                                <select
                                    name="state_id"
                                    id="state"
                                    className="border-gray-300 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
                                    value={data.state_id} // Establecer el valor del select con el valor de state_id
                                    onChange={(e) => {
                                        setData('state_id', parseInt(e.target.value));
                                    }}
                                >
                                    {state.map((state) => (
                                        <option value={state.id} key={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>

                                <InputError message={errors.state} className="mt-2" />
                            </div>

                            <div className="flex justify-end p-2.5">
                                <PrimaryButton >
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