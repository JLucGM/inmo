import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ContainerTitle from '@/Components/ContainerTitle';

export default function Edit({ auth, city, states, selectedStateId, role, permission }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: city.name || '',
        state_id: selectedStateId || states?.[0]?.id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('cities.update', city));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Editar Ciudad" />

            {recentlySuccessful && (
                <Alert className="mb-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                    <CheckCircleIcon className="size-4" />
                    <AlertDescription>Ciudad actualizada correctamente.</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-6">
                <ContainerTitle title="Datos principales" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
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
                        <Label htmlFor="state_id">Estado</Label>
                        <Select
                            value={String(data.state_id)}
                            onValueChange={(val) => setData('state_id', Number(val))}
                        >
                            <SelectTrigger id="state_id" className="w-full">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {states?.map((s) => (
                                    <SelectItem key={s.id} value={String(s.id)}>
                                        {s.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.state_id && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.state_id}</AlertDescription>
                            </Alert>
                        )}
                        {errors.states && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.states}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </ContainerTitle>
                
                <div className="flex justify-end">
                    <Button type="submit">Guardar cambios</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}