import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import TypesPropertiesForm from './TypesPropertiesForm';

export default function Edit({ auth, typeproperty, role, permission }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: typeproperty.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('typesproperties.update', typeproperty));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Editar Tipo de Propiedad" />

            {recentlySuccessful && (
                <Alert className="mb-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircleIcon className="size-4" />
                    <AlertDescription>Tipo de propiedad actualizado correctamente.</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-6">
                {typeproperty.image && (
                    <div className="mb-6 flex justify-center">
                        <img 
                            src={`${typeproperty.image}`} 
                            alt={typeproperty.name} 
                            className="w-40 rounded-3xl object-cover" 
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TypesPropertiesForm data={data} setData={setData} errors={errors} />
                </div>
                
                <div className="flex justify-end">
                    <Button type="submit">Guardar cambios</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
