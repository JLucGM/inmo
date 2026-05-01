import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import SectionHeader from '@/Components/SectionHeader';
import UserForm from './UserForm';

export default function Create({ auth, roles }) {
    const { data, setData, errors, post } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        status: 0,
        avatar: null,
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            
            header={
                <div className='flex justify-between items-center'>
                    <SectionHeader title="Crear usuario" subtitle="Añade un nuevo miembro al equipo y asígnale un rol." />
                    <Link href={route('user.index')}
                        className="py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head className="capitalize" title="Crear Usuario" />

            <div className="max-w-7xl p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <UserForm
                            roles={roles}
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="submit">Guardar usuario</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}