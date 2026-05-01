import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
} from '@tanstack/react-table';
import { router } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function DataTable({
    className = '',
    data,
    columns,
    permissions = [],
}) {
    // Handle paginated data from Laravel
    const tableData = data?.data || data;

    const [filtering, setFiltering] = useState('');
    const [sorting, setSorting] = useState([]);

    const pagination = data?.links ? {
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total,
        links: data.links,
    } : null;

    const isServerSide = Boolean(pagination);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter: filtering,
            sorting,
        },
        meta: {
            permissions,
        },
        onSortingChange: setSorting,
        initialState: {
            pagination: { pageSize: 10 },
        },
        onGlobalFilterChange: setFiltering,
    });

    const navigatePage = (page) => {
        if (!isServerSide) {
            table.setPageIndex(page - 1);
            return;
        }

        const params = new URLSearchParams(window.location.search);
        params.set('page', page);

        router.get(`${window.location.pathname}?${params.toString()}`, null, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {/* ── Buscador ── */}
            <div className="relative w-full sm:max-w-xs">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar..."
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                    className="pl-8"
                />
            </div>

            {/* ── Tabla ── */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.original.id}>
                                    <TableRow data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {/* Fila expandida */}
                                    {row.getIsExpanded() && (
                                        <TableRow key={`expanded-${row.original.id}`}>
                                            <TableCell colSpan={row.getVisibleCells().length} className="bg-muted/30 p-4">
                                                {/* Asumimos que la expansión viene definida en la columna 'name' o similar */}
                                                {columns.find((c) => c.expanded)?.expanded(row)}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    Sin resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ── Paginación ── */}
            <div className="flex items-center justify-between gap-4">
                {/* Selector de filas por página */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Filas por página</span>
                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(val) => table.setPageSize(Number(val))}
                    >
                        <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 30, 50].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Navegación */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => navigatePage(1)}
                        disabled={isServerSide ? pagination.current_page <= 1 : !table.getCanPreviousPage()}
                    >
                        <ChevronDoubleLeftIcon className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => navigatePage(isServerSide ? pagination.current_page - 1 : table.getState().pagination.pageIndex)}
                        disabled={isServerSide ? pagination.current_page <= 1 : !table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </Button>

                    <span className="flex items-center gap-1 px-2 text-sm">
                        <span className="text-muted-foreground">Página</span>
                        <strong className="tabular-nums">
                            {isServerSide ? pagination.current_page : table.getState().pagination.pageIndex + 1}
                        </strong>
                        <span className="text-muted-foreground">de</span>
                        <strong className="tabular-nums">{isServerSide ? pagination.last_page : table.getPageCount()}</strong>
                    </span>

                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => navigatePage(isServerSide ? pagination.current_page + 1 : table.getState().pagination.pageIndex + 2)}
                        disabled={isServerSide ? pagination.current_page >= pagination.last_page : !table.getCanNextPage()}
                    >
                        <ChevronRightIcon className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => navigatePage(isServerSide ? pagination.last_page : table.getPageCount())}
                        disabled={isServerSide ? pagination.current_page >= pagination.last_page : !table.getCanNextPage()}
                    >
                        <ChevronDoubleRightIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
