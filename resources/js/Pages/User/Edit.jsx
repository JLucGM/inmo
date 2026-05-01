import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import SectionHeader from '@/Components/SectionHeader';
import UserForm from './UserForm';

export default function Edit({ auth, user, roles }) {
    const { data, setData, errors, post, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        phone: user.phone,
        status: user.status,
        avatar: null,
        role: user.roles?.length > 0 ? user.roles[0].name : '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.update', user));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Actualizar usuario" subtitle="Gestiona los datos, contraseña y rol de este usuario." />
                    <Link href={route('user.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Editar Usuario" />

            <div className="max-w-7xl mx-auto p-4">
                {recentlySuccessful && (
                    <Alert className="mb-6 border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                        <CheckCircleIcon className="size-4" />
                        <AlertDescription>Usuario actualizado correctamente.</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <UserForm
                            roles={roles}
                            data={data}
                            user={user}
                            setData={setData}
                            errors={errors}
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar cambios</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
