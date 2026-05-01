import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar contraseña" />

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Zona restringida</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 text-center">
                    Esta es una zona segura de la aplicación. Por favor, confirma tu contraseña antes de continuar.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                </div>

                <div className="pt-2">
                    <Button className="w-full" disabled={processing} type="submit">
                        Confirmar
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
