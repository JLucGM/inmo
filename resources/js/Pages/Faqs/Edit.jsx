import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Edit({ auth, faqs, role, permission }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: faqs.name || "",
        content: faqs.content || "",
        status: faqs.status ? faqs.status.toString() : "0",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('faqs.update', faqs));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Editar Pregunta Frecuente" />

            {recentlySuccessful && (
                <Alert className="mb-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircleIcon className="size-4" />
                    <AlertDescription>Pregunta frecuente actualizada correctamente.</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ContainerTitle title="Datos principales">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Título</Label>
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
                                <div>
                                    <Label htmlFor="content">Contenido</Label>
                                    <Textarea
                                        id="content"
                                        rows={10}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                    />
                                    {errors.content && (
                                        <Alert variant="destructive" className="mt-1 py-2">
                                            <AlertDescription>{errors.content}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>
                        </ContainerTitle>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <ContainerTitle title="Estado">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="status">Estado de publicación</Label>
                                    <Select 
                                        value={data.status} 
                                        onValueChange={(val) => setData('status', val)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Seleccione un estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Borrador</SelectItem>
                                            <SelectItem value="1">Publicar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <Alert variant="destructive" className="mt-1 py-2">
                                            <AlertDescription>{errors.status}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>
                        </ContainerTitle>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Guardar cambios</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
