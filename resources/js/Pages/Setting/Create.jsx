import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';

export default function Create({ auth }) {

    const initialValues = {
        name: "",
    }

    const { data, setData, errors, post, processing } = useForm(initialValues)

    const submit = (e) => {
        e.preventDefault();
        post(route('amenities.store'))
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-col gap-1 w-full px-6'>
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100 leading-tight tracking-tight">
                        Crear Amenidad
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Agrega una nueva comodidad o servicio para las propiedades.
                    </p>
                </div>
            }
        >
            <Head title="Crear Amenidad" />

            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-3xl mx-auto">
                    <Card className="border-none shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold italic">Nueva Amenidad</CardTitle>
                            <CardDescription>
                                Completa el nombre de la amenidad. Aparecerá en el formulario de propiedades.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className='space-y-6'>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre de la amenidad</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        placeholder="Ej: Piscina, Gimnasio, Seguridad 24/7..."
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="bg-white/50 dark:bg-gray-900/50"
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div className="flex justify-end pt-4 gap-3">
                                    <Button
                                        variant="outline"
                                        render={<Link href={route('amenities.index')}>Cancelar</Link>}
                                    />
                                    <Button disabled={processing} type="submit">
                                        {processing ? 'Guardando...' : 'Guardar Amenidad'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}