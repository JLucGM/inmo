import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Restablecer contraseña" />

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nueva contraseña</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-center">
                    Establece tu nueva clave de acceso para recuperar el control de tu cuenta.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="new-password"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="password_confirmation">Confirmar nueva contraseña</Label>
                    <Input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="text-xs text-red-500 mt-1">{errors.password_confirmation}</p>
                    )}
                </div>

                <div className="pt-2">
                    <Button className="w-full" disabled={processing} type="submit">
                        Restablecer contraseña
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
