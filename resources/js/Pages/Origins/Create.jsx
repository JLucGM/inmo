import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Create({ auth, role, permission }) {
    const { data, setData, errors, post } = useForm({ name: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('origins.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Crear Origen" />
            
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
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}