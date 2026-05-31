import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, categoryPost }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: categoryPost.name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        // Fallback to post since inertia uses spoofing 
        post(route('category-post.update', categoryPost));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Actualizar Categoría de Posts" />

            <div className="p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Se actualizó correctamente!</AlertDescription>
                    </Alert>
                )}

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
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}