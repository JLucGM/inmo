import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ContainerTitle from '@/Components/ContainerTitle';
import SectionHeader from '@/Components/SectionHeader';

export default function Edit({ auth, role, permissions, assignedPermissions }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: role.name,
        permissions: assignedPermissions.map(String),
    });

    const handleCheckboxChange = (permissionId) => {
        const id = permissionId.toString();
        const newPermissions = data.permissions.includes(id)
            ? data.permissions.filter((p) => p !== id)
            : [...data.permissions, id];
        setData('permissions', newPermissions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.update', role));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar rol" subtitle="Modifica el nombre del rol y los permisos asignados a este." />
                    <Link href={route('roles.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Editar Rol" />

            <div className="p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>Rol actualizado exitosamente.</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <ContainerTitle title="Datos del rol y Permisos" className="grid grid-cols-1 gap-6">
                        <div className="col-span-full max-w-lg">
                            <Label htmlFor="name">Nombre del rol</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                disabled
                                className="mt-1 opacity-60"
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
                                            checked={data.permissions.includes(perm.id.toString())}
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
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}