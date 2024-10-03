import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import TextInput from './TextInput';
import { Link } from '@inertiajs/react';
import { Button, Select } from '@headlessui/react';
import ChevronDoubleLeft from './Icon/ChevronDoubleLeft';
import ChevronDoubleRight from './Icon/ChevronDoubleRight';
import ChevronLeft from './Icon/ChevronLeft';
import ChevronRight from './Icon/ChevronRight';
import MagnifyingGlass from './Icon/MagnifyingGlass';

export default function DataTable({ className = '', data, columns, routeEdit, routeDestroy, ...props }) {

    const [filtering, setFiltering] = useState("");
    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            }
        },
        onGlobalFilterChange: setFiltering,

    })
    return (
        <>
            <div className="relative mt-2 rounded-md shadow-sm ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlass
                        className='size-4'
                    />
                </div>
                <TextInput
                    type="text"
                    value={filtering}
                    className="mt-1 block w-50 py-1.5 pl-7 "

                    onChange={(e) => setFiltering(e.target.value)}
                />
            </div>

            <table className="w-full border-collapse border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hover:border-collapse my-2">
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
                            <tr key={row.original.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-900">
                                {
                                    row.getVisibleCells().map((cell, index) => (
                                        <td key={index} className="capitalize border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }

                                <td key="acciones" className="flex justify-end space-x-4 capitalize border border-slate-200 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link
                                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        href={route(routeEdit, [row.original.slug])}>
                                        Editar
                                    </Link>
                                    <Link
                                        className='inline-flex items-center px-4 py-2 bg-red-800 dark:bg-red-500 border border-transparent  rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                        href={route(routeDestroy, [row.original.slug])} method='delete' as="button">
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="flex justify-between ">
                <Select
                    className={' border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm'}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30].map((pageSize) => (

                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </Select>

                <div className="flex">
                    <Button
                        className={'disabled:opacity-30'}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronDoubleLeft
                            className='size-4'
                        />
                    </Button>

                    <Button
                        className={'disabled:opacity-30'}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft
                            className='size-4'
                        />

                    </Button>


                    <span className='flex items-center mx-1'>
                        <TextInput
                            min={1}
                            max={table.getPageCount()}
                            type="number"
                            value={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className={'w-16 border'}
                        />
                        <span className='ml-1'>of {table.getPageCount()}</span>
                    </span>


                    <Button
                        className={'disabled:opacity-30'}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight
                            className='size-4'
                        />
                    </Button>

                    <Button
                        className={'disabled:opacity-30'}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronDoubleRight
                            className='size-4'
                        />
                    </Button>
                </div>
            </div>



        </>
    );
}
