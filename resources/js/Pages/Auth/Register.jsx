import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro" />

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crea tu cuenta</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Únete a nuestra plataforma inmobiliaria</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                </div>

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
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
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
                        Registrarse
                    </Button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¿Ya tienes una cuenta? {' '}
                        <Link href={route('login')} className="text-blue-600 font-semibold hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
