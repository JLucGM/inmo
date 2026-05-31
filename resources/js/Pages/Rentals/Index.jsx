import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import SectionHeader from '@/Components/SectionHeader';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { columns } from './Columns';

export default function Index({ auth, rentals, statuses = [], statusFilter = 'all' }) {
    const handleStatusChange = (value) => {
        router.get(route('rentals.index'),
            { status: value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <SectionHeader
                        title="Rentas"
                        subtitle="Administra los contratos de alquiler, pagos e inquilinos."
                    />
                    <Link href={route('rentals.create')}>
                        <Button>+ Crear Renta</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Rentas" />

            <div className="p-4 space-y-6">
                <Tabs value={statusFilter} onValueChange={handleStatusChange} className="w-full">
                    <TabsList className="bg-transparent h-auto p-0 flex-wrap gap-2 border-b rounded-none w-full justify-start">
                        <TabsTrigger
                            value="all"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                        >
                            Todas
                        </TabsTrigger>
                        {statuses.map((status) => (
                            <TabsTrigger
                                key={status.slug}
                                value={status.slug}
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                            >
                                {status.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <DataTable
                    columns={columns}
                    data={rentals}
                />
            </div>
        </AuthenticatedLayout>
    );
}
