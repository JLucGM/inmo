import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Olvidaste tu contraseña" />

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recuperar acceso</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 text-center">
                    ¿Olvidaste tu contraseña? No hay problema. Danos tu correo electrónico y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="pt-2">
                    <Button className="w-full" disabled={processing} type="submit">
                        Enviar enlace de recuperación
                    </Button>
                </div>

                <div className="text-center mt-4">
                    <Link href={route('login')} className="text-sm text-blue-600 font-semibold hover:underline">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
