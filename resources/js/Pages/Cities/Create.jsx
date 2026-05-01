import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ContainerTitle from '@/Components/ContainerTitle';
import { useEffect } from 'react';

export default function Create({ auth, state, role, permission }) {
    const { data, setData, errors, post } = useForm({
        name: '',
        state_id: state?.[0]?.id || '',
    });

    useEffect(() => {
        if (state?.length > 0 && !data.state_id) {
            setData('state_id', state[0].id);
        }
    }, [state]);

    const submit = (e) => {
        e.preventDefault();
        post(route('cities.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} permission={permission}>
            <Head title="Crear Ciudad" />
            
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
                                {state?.map((s) => (
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
                    </div>
                </ContainerTitle>
                
                <div className="flex justify-end">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}