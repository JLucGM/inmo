import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

export default function DeleteUserForm({ className = '' }) {
    const [open, setOpen] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 italic">Eliminar Cuenta</h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Una vez que se elimine tu cuenta, todos sus recursos y datos se borrarán de forma permanente.
                </p>
            </header>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger nativeButton={true} render={<Button variant="destructive">Eliminar cuenta</Button>} />
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>¿Estás seguro de que quieres eliminar tu cuenta?</DialogTitle>
                        <DialogDescription>
                            Esta acción no se puede deshacer. Por favor, introduce tu contraseña para confirmar la eliminación permanente de tus datos.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={deleteUser} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                autoFocus
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <DialogFooter className="pt-4 gap-2">
                            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button variant="destructive" disabled={processing} type="submit">
                                Eliminar permanentemente
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
