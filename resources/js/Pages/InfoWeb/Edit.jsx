import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import TextAreaRich from '@/Components/TextAreaRich';
import { useRef } from 'react';

export default function Edit({ auth, infoweb }) {

    const initialValues = {
        name: infoweb.name || "",
        text: infoweb.text || "",
        image: null,
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);
    const textAreaRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        post(route('info-web.update', infoweb));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar información web" subtitle="Modifica los textos e imágenes de esta entrada." />
                    <Link href={route('info-web.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Actualizar Información web" />

            <div className="max-w-7xl mx-auto p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Entrada actualizada exitosamente!</AlertDescription>
                    </Alert>
                )}

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
                                        <Label htmlFor="text">Cuerpo / Texto</Label>
                                        <div className="mt-1 rounded-md overflow-hidden bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800">
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
                                    {infoweb.image && (
                                        <div className="mb-4">
                                            <Label className="block mb-2 text-gray-600 dark:text-gray-400">Imagen actual</Label>
                                            <img src={infoweb.image} alt="Imagen actual" className="w-full max-w-sm rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-sm" />
                                        </div>
                                    )}
                                    
                                    <div>
                                        <Label htmlFor="image">Actualizar imagen (Opcional)</Label>
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
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
