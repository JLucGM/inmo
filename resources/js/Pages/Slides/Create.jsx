import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import CharacterCounter from '@/Components/CharacterCounter';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { useState } from 'react';

export default function Create({ auth }) {
    const { data, setData, errors, post } = useForm({
        name: "",
        text: "",
        link: "",
        status: "0",
        image: null,
    });

    const [charCount, setCharCount] = useState(0);
    const charLimit = 250;

    const submit = (e) => {
        e.preventDefault();
        post(route('slides.store'));
    };

    const handleTextChange = (e) => {
        const { value } = e.target;
        if (value.length <= charLimit) {
            setData('text', value);
            setCharCount(value.length);
        } else {
            setData('text', value.substring(0, charLimit));
            setCharCount(charLimit);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Crear slide" subtitle="Aquí puedes crear un nuevo slide para la aplicación." />
                    <Link href={route('slides.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head title="Crear slide" />

            <div className="max-w-7xl mx-auto p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Datos principales */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Datos principales">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nombre</Label>
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
                                    <div>
                                        <Label htmlFor="text">Descripción</Label>
                                        <Textarea
                                            id="text"
                                            rows={6}
                                            value={data.text}
                                            onChange={handleTextChange}
                                            className="mt-1"
                                        />
                                        <CharacterCounter currentCount={charCount} limit={charLimit} />
                                        {errors.text && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.text}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>

                        {/* Datos secundarios */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Datos secundarios">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="image">Imagen / Video</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*,video/*"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                            className="mt-1"
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
                                                <SelectValue placeholder="Selecciona..." />
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
                                    <div>
                                        <Label htmlFor="link">Link (Opcional)</Label>
                                        <div className="flex mt-1">
                                            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm rounded-l-md">
                                                https://
                                            </span>
                                            <Input
                                                id="link"
                                                value={data.link}
                                                onChange={(e) => setData('link', e.target.value)}
                                                className="rounded-l-none"
                                            />
                                        </div>
                                        {errors.link && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.link}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                </div>
                            </ContainerTitle>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar slide</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}