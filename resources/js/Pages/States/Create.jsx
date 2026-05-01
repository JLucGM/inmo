import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ContainerTitle from '@/Components/ContainerTitle';
import { useEffect } from 'react';

export default function Create({ auth, country }) {
    const { data, setData, errors, post } = useForm({
        name: '',
        country_id: country?.[0]?.id || '',
    });

    useEffect(() => {
        if (country?.length > 0 && !data.country_id) {
            setData('country_id', country[0].id);
        }
    }, [country]);

    const submit = (e) => {
        e.preventDefault();
        post(route('states.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Crear Estado" />
            
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
                        <Label htmlFor="country_id">País</Label>
                        <Select
                            value={String(data.country_id)}
                            onValueChange={(val) => setData('country_id', Number(val))}
                        >
                            <SelectTrigger id="country_id" className="w-full">
                                <SelectValue placeholder="Seleccionar país" />
                            </SelectTrigger>
                            <SelectContent>
                                {country?.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.country_id && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.country_id}</AlertDescription>
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