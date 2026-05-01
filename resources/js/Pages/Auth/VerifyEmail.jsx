import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificación de correo" />

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verifica tu cuenta</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 text-center">
                    ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar? Si no lo recibiste, con gusto te enviaremos otro.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex flex-col gap-4">
                    <Button disabled={processing} className="w-full">
                        Reenviar correo de verificación
                    </Button>

                    <div className="text-center">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 underline underline-offset-4"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
