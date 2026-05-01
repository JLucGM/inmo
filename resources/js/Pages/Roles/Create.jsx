import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import ContainerTitle from '@/Components/ContainerTitle';
import SectionHeader from '@/Components/SectionHeader';

export default function Create({ auth, permissions, role, permission }) {
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
            permission={permission}
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Crear rol" subtitle="Define un nuevo rol con permisos personalizados." />
                    <Link href={route('roles.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head title="Crear Rol" />

            <div className="max-w-7xl mx-auto p-4">
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
                            <Label className="mb-4 block text-base font-semibold border-b pb-2 dark:border-gray-800">Permisos asignados al rol</Label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-50/50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                                {permissions?.map((perm) => (
                                    <div key={perm.id} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-2.5 rounded shadow-sm border border-gray-100 dark:border-gray-700">
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