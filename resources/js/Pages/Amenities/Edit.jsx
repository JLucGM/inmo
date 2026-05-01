import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import AmenitiesForm from './AmenitiesForm';

export default function Edit({ auth, amenity, role, permission }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: amenity.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('amenities.update', amenity));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Editar Comodidad" />

            {recentlySuccessful && (
                <Alert className="mb-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircleIcon className="size-4" />
                    <AlertDescription>Comodidad actualizada correctamente.</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <AmenitiesForm data={data} setData={setData} errors={errors} />
                </div>
                
                <div className="flex justify-end">
                    <Button type="submit">Guardar cambios</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}