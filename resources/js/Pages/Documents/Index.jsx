import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import PDFDocuments from '@/Components/PDF/PDFDocuments';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { DataTableRowActions } from '@/Components/DataTableRowActions';

const columns = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="#id" />
        ),
        cell: ({ row }) => <p className="w-4">{row.original.id}</p>
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nombre" />
        ),
        expanded: (row) => (
            <div className="py-2 space-y-1 ml-4 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="font-semibold">Contacto:</span> {row.original.contact?.name}</p>
                <p><span className="font-semibold">Agente:</span> {row.original.user?.name}</p>
                <p><span className="font-semibold">Propiedad:</span> {row.original.property?.name}</p>
            </div>
        )
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Estado" />
        ),
        cell: ({ row }) => {
            const status = Number(row.original.status);
            
            if (status === 0) return <Badge className="bg-emerald-500 hover:bg-emerald-600">Nuevo</Badge>;
            if (status === 1) return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Revisión</Badge>;
            if (status === 2) return <Badge className="bg-gray-500 hover:bg-gray-600">Archivado</Badge>;
            if (status === 3) return <Badge className="bg-blue-500 hover:bg-blue-600">Finalizado</Badge>;

            return <Badge variant="destructive">Desconocido</Badge>;
        }
    },
    {
        id: 'actions',
        cell: ({ row, table }) => (
            <DataTableRowActions
                row={row}
                routeEdit="documents.edit"
                routeDestroy="documents.destroy"
                editPermission="admin.documents.edit"
                deletePermission="admin.documents.delete"
                downloadPdfPermission="admin.documents.pdf"
                PDFComponent={PDFDocuments}
                permissions={table.options.meta?.permissions}
            />
        ),
    }
];

export default function Index({ auth, documents, role, permission }) {
    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <SectionHeader
                    title="Documentos"
                    subtitle="Gestiona los documentos de las propiedades, contactos y agentes."
                />
                
            </div>

            <Head title="Documentos" />

            <div className="max-w-7xl p-4">
                {Array.isArray(documents) && documents.length > 0 ? (
                        <DataTable
                            columns={columns}
                            data={documents}
                            permissions={permission}
                        />
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                            <p>No hay documentos disponibles en este momento.</p>
                        </div>
                    )}
                </div>
        </AuthenticatedLayout>
    );
}
