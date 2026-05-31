import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import ContainerTitle from '@/Components/ContainerTitle';
import SectionHeader from '@/Components/SectionHeader';

export default function Create({ auth, permissions }) {
    const { data, setData, errors, post } = useForm({
        name: '',
        permissions: [],
    });

    const handleCheckboxChange = (permissionId) => {
        const newPermissions = data.permissions.includes(permissionId)
            ? data.permissions.filter((id) => id !== permissionId)
            : [...data.permissions, permissionId];
        setData('permissions', newPermissions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
        >
            <Head title="Crear Rol" />

            <div className="p-4">
                <form onSubmit={submit} className="space-y-6">
                    <ContainerTitle title="Datos del rol y Permisos" className="grid grid-cols-1 gap-6">
                        <div className="col-span-full max-w-lg">
                            <Label htmlFor="name">Nombre del rol</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                autoFocus
                                className="mt-1"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && (
                                <Alert variant="destructive" className="mt-2 py-2">
                                    <AlertDescription>{errors.name}</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div className="col-span-full mt-4">
                            <Label className="mb-4 block text-base font-semibold border-b pb-2 ">Permisos asignados al rol</Label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 rounded-lg border">
                                {permissions?.map((perm) => (
                                    <div key={perm.id} className="flex items-start gap-4 p-4 rounded-full border">
                                        <Checkbox
                                            id={`perm-${perm.id}`}
                                            checked={data.permissions.includes(perm.id)}
                                            onCheckedChange={() => handleCheckboxChange(perm.id)}
                                            className="mt-0.5"
                                        />
                                        <Label
                                            htmlFor={`perm-${perm.id}`}
                                            className="cursor-pointer text-sm font-normal leading-tight h-full w-full flex items-center"
                                        >
                                            {perm.description || perm.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {errors.permissions && (
                                <Alert variant="destructive" className="mt-2 py-2">
                                    <AlertDescription>{errors.permissions}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </ContainerTitle>

                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar rol</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}