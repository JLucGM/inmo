import ContainerTitle from '@/Components/ContainerTitle';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';

export default function UserForm({ data, user = '', setData, errors, roles }) {
    const roleOptions = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    return (
        <>
            {/* ── Datos principales ── */}
            <div className="col-span-1 lg:col-span-2">
                <ContainerTitle title="Datos del usuario" className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="col-span-full">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.name}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="col-span-full">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.email}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="col-span-full">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            placeholder="Dejar en blanco para no cambiar"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.password}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="col-span-full">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                            id="phone"
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        {errors.phone && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.phone}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </ContainerTitle>
            </div>

            {/* ── Datos secundarios ── */}
            <div className="col-span-1">
                <ContainerTitle title="Configuración" className="grid grid-cols-1 gap-4">

                    {/* Avatar */}
                    <div>
                        {user?.avatar && (
                            <img
                                className="mx-auto mb-3 h-24 w-24 rounded-full object-cover"
                                src={user.avatar}
                                alt="Avatar"
                            />
                        )}
                        <Label htmlFor="avatar">Foto de perfil</Label>
                        <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('avatar', e.target.files[0])}
                        />
                        {errors.avatar && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.avatar}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Estado */}
                    <div>
                        <Label htmlFor="status">Estado</Label>
                        <Select
                            value={String(data.status)}
                            onValueChange={(val) => setData('status', Number(val))}
                        >
                            <SelectTrigger id="status" className="w-full">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Inactivo</SelectItem>
                                <SelectItem value="1">Activo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.status}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Rol */}
                    <div>
                        <Label htmlFor="role">Rol</Label>
                        <Select
                            value={data.role}
                            onValueChange={(val) => setData('role', val)}
                        >
                            <SelectTrigger id="role" className="w-full">
                                <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {roleOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <Alert variant="destructive" className="mt-1 py-2">
                                <AlertDescription>{errors.role}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </ContainerTitle>
            </div>
        </>
    );
}