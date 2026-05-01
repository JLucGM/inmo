import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import columns from '@/Pages/User/Column';

export default function Index({ auth, users, role, permission }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            permission={permission}
            header={
                <SectionHeader
                    title="Usuarios del sistema"
                    subtitle="Gestiona el equipo de trabajo, agentes y administradores."
                />
            }
        >
            <Head title="Usuarios" />

            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={users}
                    permissions={permission}
                />
            </div>

        </AuthenticatedLayout>
    );
}