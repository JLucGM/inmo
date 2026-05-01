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
import ReactPlayer from 'react-player';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, slide, role, permission }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: slide.name || "",
        text: slide.text || "",
        link: slide.link || "",
        status: slide.status ? slide.status.toString() : "0",
        image: null,
    });

    const [charCount, setCharCount] = useState((slide.text || '').length);
    const charLimit = 250;

    const submit = (e) => {
        e.preventDefault();
        // Since we are uploading a file we use post with method simulation if necessary.
        // The original used post(route('slides.update', slide)) 
        // Note: Inertia handles file uploads via POST.
        post(route('slides.update', slide));
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
            roles={role}
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar slide" subtitle="Aquí puedes actualizar un slide existente." />
                    <Link href={route('slides.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head title="Actualizar slide" />

            <div className="max-w-7xl mx-auto p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Se actualizó correctamente!</AlertDescription>
                    </Alert>
                )}

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
                                            rows={10}
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
                                    <div className="flex flex-col items-center mb-4 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                        {slide.image?.endsWith('.mp4') || slide.image?.endsWith('.webm') || slide.image?.endsWith('.ogg') ? (
                                            <div className="w-full rounded-md overflow-hidden aspect-video relative">
                                                <ReactPlayer
                                                    url={slide.image}
                                                    controls={true}
                                                    width='100%'
                                                    height='100%'
                                                    className="absolute top-0 left-0"
                                                />
                                            </div>
                                        ) : (
                                            slide.image && <img src={slide.image} alt={slide.name} className='w-full max-w-[240px] rounded-md object-cover' />
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="image">Actualizar Imagen / Video</Label>
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
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
