import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import TextAreaRich from '@/Components/TextAreaRich';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React, { useRef } from 'react';

export default function Edit({ auth, page }) {

    const initialValues = {
        name: page.name || "",
        body: page.body || "",
        status: page.status?.toString() || "0",
        image: null,
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);
    const textAreaRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        post(route('pages.update', page));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Actualizar página" />

            <div className="p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Página actualizada exitosamente!</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Principal - 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Datos principales">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nombre de la página</Label>
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
                                    <div className="pt-2">
                                        <Label htmlFor="body">Contenido</Label>
                                        <div className="mt-1 overflow-hidden">
                                            <TextAreaRich
                                                initialValue={data.body}
                                                ref={textAreaRef}
                                                name="body"
                                                onChange={(newText) => setData('body', newText)}
                                            />
                                        </div>
                                        {errors.body && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.body}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* Columna Secundaria - 1/3 */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Publicación y Multimedia">
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center mb-4">
                                        {page.image ? (
                                            <img src={page.image} alt={page.name} className='w-full max-w-60 rounded-md object-cover' />
                                        ) : (
                                            <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
                                                <span className="text-gray-400">Sin Imagen</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="image">Actualizar Imagen</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                            className="mt-1"
                                            accept="image/*"
                                        />
                                        {errors.image && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.image}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="status">Estado</Label>
                                        <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Seleccionar..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Borrador</SelectItem>
                                                <SelectItem value="1">Publicar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.status}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}