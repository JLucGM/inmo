import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import TextAreaRich from '@/Components/TextAreaRich';
import { useRef } from 'react';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
        text: "",
        image: null,
    };

    const { data, setData, errors, post } = useForm(initialValues);
    const textAreaRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        post(route('info-web.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head className="capitalize" title="Crear Información web" />

            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Principal - 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Detalles del contenido">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Etiqueta / Nombre</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            autoFocus
                                            className="mt-1"
                                        />
                                        {errors.name && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.name}</AlertDescription></Alert>}
                                    </div>

                                    <div className="pt-2">
                                        <Label htmlFor="text">Texto</Label>
                                        <div className="mt-1  overflow-hidden">
                                            <TextAreaRich
                                                initialValue={data.text}
                                                ref={textAreaRef}
                                                name="text"
                                                onChange={(newText) => setData('text', newText)}
                                            />
                                        </div>
                                        {errors.text && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.text}</AlertDescription></Alert>}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* Columna Secundaria - 1/3 */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Recursos multimedia">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="image">Imagen de la entrada</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                            className="mt-2"
                                            accept="image/*"
                                        />
                                        {errors.image && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.image}</AlertDescription></Alert>}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar entrada</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}