import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DataTable from '@/Components/DataTable';
// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';

export default function Index({ auth, amenities }) {
    console.log(amenities)
    const [isOpen, setIsOpen] = useState(false);
    // const [filtering, setFiltering] = useState("");
    const { data, setData, errors, post } = useForm({
        name: "",
    })

    const columns = [{
        header: "Nombre",
        accessorKey: "name",
    }]
    // const table = useReactTable({
    //     data: amenities,
    //     columns,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     state: {
    //         globalFilter: filtering,
    //     },
    //     onGlobalFilterChange: setFiltering,
    // })

    const submit = (e) => {
        e.preventDefault();
        post(route('amenities.store'))
        console.log(data)
        setData({
            name: "",
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center px-6'>
                    <h2 className="capitalize font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Comodidades
                    </h2>
                    {/* <Link href={route('amenities.create')}
                        className="py-2.5 px-5 text-sm font-medium capitalize text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Crear Comodidades
                    </Link> */}
                    <Button
                        className="capitalize py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => setIsOpen(true)}>
                        Crear
                    </Button>
                </div>
            }
        >
            <Head className="capitalize" title="Comodidades" />

            <div className="p-6">
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden ">
                        <div className=" text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">

                                {/* <TextInput
                                    type="text"
                                    value={filtering}
                                    className="mt-1 block w-50"

                                    onChange={(e) => setFiltering(e.target.value)}
                                />

                                <table className="w-full border-collapse border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hover:border-collapse">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        {
                                            table.getHeaderGroups().map(headerGroup => (
                                                <tr key={headerGroup.id}>
                                                    {
                                                        headerGroup.headers.map(header => (
                                                            <th key={header.id} className="border-slate-300 border px-6 py-3">
                                                                {header.column.columnDef.header}
                                                            </th>
                                                        ))
                                                    }

                                                    <th key="acciones" className="border-slate-300 border px-6 py-3">
                                                        Acciones
                                                    </th>

                                                </tr>
                                            ))
                                        }
                                    </thead>

                                    <tbody>
                                        {
                                            table.getRowModel().rows?.map((row) => (
                                                <tr key={row.original.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    {
                                                        row.getVisibleCells().map((cell, index) => (
                                                            <td key={index} className="capitalize border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </td>
                                                        ))
                                                    }

                                                    <td key="acciones" className="capitalize border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="space-x-4">
                                                            <Link
                                                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                                href={route('amenities.edit', [row.original.slug])}>
                                                                Editar
                                                            </Link>
                                                            <Link
                                                                className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                href={route('amenities.destroy', [row.original.slug])} method='delete' as="button">
                                                                Eliminar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                <Button
                                    onClick={() => table.setPageIndex(0)}
                                >primera pagina
                                </Button>

                                <Button
                                    onClick={() => table.previousPage()}
                                >
                                    anterior

                                </Button>
                                <Button
                                    onClick={() => table.nextPage()}
                                >
                                    despues
                                </Button>
                                <Button
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                >ultima pagina
                                </Button> */}


                                {/* <table className="w-full border-collapse border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hover:border-collapse">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="border-slate-300 border px-6 py-3">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            amenities?.map((amenity) => (

                                                <tr key={amenity.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="capitalize border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {amenity.name}
                                                    </th>
                                                    <td className="border border-slate-200 px-6 py-4">
                                                        <div className='space-x-4'>
                                                            <Link
                                                                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                                href={route('amenities.edit', [amenity])}>
                                                                Editar
                                                            </Link>
                                                            <Link
                                                                className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                                                href={route('amenities.destroy', [amenity])} method='delete' as="button">
                                                                Eliminar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>
                                </table> */}

                                <DataTable 
                                columns={columns}
                                data={amenities}
                                routeEdit={'amenities.edit'}
                                routeDestroy={'amenities.destroy'}
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
                        <DialogTitle className="font-bold text-gray-700 dark:text-gray-300 capitalize">Crear Comodidades</DialogTitle>
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