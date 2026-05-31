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
import React, { useRef } from 'react';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
        body: "",
        status: "0",
        image: null,
    };

    const { data, setData, errors, post } = useForm(initialValues);
    const textAreaRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        post(route('pages.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Crear página" />

            <div className="p-4">
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
                                    <div>
                                        <Label htmlFor="image">Imagen Destacada</Label>
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
                        <Button type="submit">Guardar página</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}