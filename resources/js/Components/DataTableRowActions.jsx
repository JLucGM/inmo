import React from 'react';
import { Link } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import {
    EllipsisHorizontalIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export function DataTableRowActions({
    row,
    routeEdit,
    routeShow,
    routeDestroy,
    editPermission,
    deletePermission,
    downloadPdfPermission,
    PDFComponent,
    permissions = [],
    children, // Para acciones personalizadas adicionales
}) {
    const hasPermission = (perm) =>
        permissions?.some((p) => p.name === perm) ?? false;

    const id = row.original.slug ?? row.original.id;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                nativeButton={true}
                render={
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <EllipsisHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                    </Button>
                }
            />
            <DropdownMenuContent align="end" className="w-[160px]">
                {routeShow && (
                    <DropdownMenuItem
                        render={
                            <Link href={route(routeShow, [id])}>
                                <EyeIcon className="mr-2 h-4 w-4" />
                                Ver
                            </Link>
                        }
                    />
                )}
                
                {routeEdit && (!editPermission || hasPermission(editPermission)) && (
                    <DropdownMenuItem
                        render={
                            <Link href={route(routeEdit, [id])}>
                                <PencilSquareIcon className="mr-2 h-4 w-4" />
                                Editar
                            </Link>
                        }
                    />
                )}

                {downloadPdfPermission && hasPermission(downloadPdfPermission) && PDFComponent && (
                    <DropdownMenuItem
                        render={
                            <PDFDownloadLink
                                document={<PDFComponent data={row.original} />}
                                fileName={`documento-${id}.pdf`}
                                className="flex w-full items-center"
                            >
                                Descargar PDF
                            </PDFDownloadLink>
                        }
                    />
                )}

                {children}

                {routeDestroy && (!deletePermission || hasPermission(deletePermission)) && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            render={
                                <Link
                                    href={route(routeDestroy, [id])}
                                    method="delete"
                                    className="w-full text-left flex items-center"
                                >
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                    Eliminar
                                </Link>
                            }
                        />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
