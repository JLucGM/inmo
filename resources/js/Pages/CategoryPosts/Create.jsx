import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';

export default function Create({ auth }) {
    const { data, setData, errors, post } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('category-post.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Crear Categoría de Posts" />

            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <ContainerTitle title="Detalles de la Categoría">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nombre de Categoría</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                    className="mt-1"
                                />
                                {errors.name && (
                                    <Alert variant="destructive" className="mt-2 py-2">
                                        <AlertDescription>{errors.name}</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </div>
                    </ContainerTitle>

                    <div className="flex justify-end">
                        <Button type="submit">Guardar categoría</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}