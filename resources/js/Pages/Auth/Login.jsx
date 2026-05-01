import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Alert, AlertDescription } from '@/Components/ui/alert';

export default function Login({ status, canResetPassword, setting }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Acceder" />

            <div className="flex flex-col items-center mb-8">
                <img
                    alt="Logo"
                    src={`${setting}`}
                    className="h-16 w-auto mb-6"
                />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                        <Label htmlFor="password">Contraseña</Label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', checked)}
                    />
                    <Label 
                        htmlFor="remember" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Recordarme
                    </Label>
                </div>

                <div className="pt-2">
                    <Button className="w-full" disabled={processing} type="submit">
                        Iniciar sesión
                    </Button>
                </div>
                
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¿No tienes una cuenta? {' '}
                        <Link href={route('register')} className="text-blue-600 font-semibold hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
