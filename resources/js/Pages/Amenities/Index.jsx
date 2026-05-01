import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import columns from './Columns';

export default function Index({ auth, amenities }) {
    return (
        <AuthenticatedLayout user={auth.user}  >
            <Head title="Comodidades" />
            <div className="max-w-7xl p-4">
                <DataTable
                    columns={columns}
                    data={amenities}
                    
                />
            </div>
        </AuthenticatedLayout>
    );
}
