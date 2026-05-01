import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, role, permission }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={role}
            permission={permission}
            header={
                <div className="flex flex-col gap-1 w-full">
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100 leading-tight tracking-tight">
                        Mi Perfil
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gestiona tu información personal y configuración de seguridad.
                    </p>
                </div>
            }
        >
            <Head title="Mi Perfil" />

            <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-3xl h-fit">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-3xl">
                            <UpdatePasswordForm />
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 shadow-sm border dark:border-red-900 border-dashed rounded-3xl opacity-90 hover:opacity-100 transition-opacity">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
