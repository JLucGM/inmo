import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import CharacterCounter from '@/Components/CharacterCounter';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, testimonial }) {
    const [charCount, setCharCount] = useState(testimonial.text?.length || 0);
    const charLimit = 500;

    const initialValues = {
        name: testimonial.name || "",
        text: testimonial.text || "",
        avatar: null,
    };

    const { data, setData, errors, post, recentlySuccessful } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('testimonial.update', testimonial.slug));
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
                    <SectionHeader title="Actualizar testimonio" subtitle="Edita la opinión o los datos del cliente." />
                    <Link href={route('testimonial.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Actualizar testimonio" />

            <div className="max-w-7xl mx-auto p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>¡Testimonio actualizado exitosamente!</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Columna Principal - 2/3 */}
                        <div className="lg:col-span-2 space-y-6">
                            <ContainerTitle title="Datos del testimonio">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nombre del cliente</Label>
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
                                        <Label htmlFor="text">Testimonio u opinión</Label>
                                        <Textarea
                                            id="text"
                                            rows={6}
                                            value={data.text}
                                            onChange={handleTextChange}
                                            className="mt-1 resize-none"
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

                        {/* Columna Secundaria - 1/3 */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContainerTitle title="Multimedia">
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                        {testimonial.avatar ? (
                                            <img src={testimonial.avatar} alt={testimonial.name} className='w-32 h-32 rounded-full object-cover shadow-sm' />
                                        ) : (
                                            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-full">
                                                <span className="text-gray-400 text-sm">Sin Avatar</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="avatar">Actualizar Avatar</Label>
                                        <Input
                                            id="avatar"
                                            type="file"
                                            onChange={(e) => setData('avatar', e.target.files[0])}
                                            className="mt-1"
                                            accept="image/*"
                                        />
                                        {errors.avatar && (
                                            <Alert variant="destructive" className="mt-2 py-2">
                                                <AlertDescription>{errors.avatar}</AlertDescription>
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
