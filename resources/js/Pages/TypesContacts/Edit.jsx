import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Edit({ auth, typesContact }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: typesContact.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('typesContacts.update', typesContact));
    };

    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Editar Tipo de Contacto" />

            {recentlySuccessful && (
                <Alert className="mb-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircleIcon className="size-4" />
                    <AlertDescription>Tipo de contacto actualizado correctamente.</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-6">
                <ContainerTitle title="Datos principales">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && (
                                <Alert variant="destructive" className="mt-1 py-2">
                                    <AlertDescription>{errors.name}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                </ContainerTitle>
                <div className="flex justify-end">
                    <Button type="submit">Guardar cambios</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
