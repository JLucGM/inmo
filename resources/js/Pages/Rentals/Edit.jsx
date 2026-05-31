import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';

export default function Edit({ auth, rental, properties, agents }) {
    const { data, setData, errors, post } = useForm({
        property_id: String(rental.property_id || ''),
        tenant_id: String(rental.tenant_id || ''),
        start_date: rental.start_date || '',
        end_date: rental.end_date || '',
        monthly_rent: rental.monthly_rent || '',
        deposit_amount: rental.deposit_amount || '',
        payment_day: String(rental.payment_day || '5'),
        status: rental.status || 'pending',
        notes: rental.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('rentals.update', rental.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Editar Renta" />

            <div className="p-4">
                    <form onSubmit={submit} className="space-y-6">
                <ContainerTitle title="Datos del Contrato">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="property_id">Propiedad</Label>
                                <ShadcnSelect
                                    value={data.property_id}
                                    onValueChange={(v) => setData('property_id', v)}
                                >
                                    <SelectTrigger id="property_id">
                                        <SelectValue placeholder="Seleccionar propiedad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {properties.map((p) => (
                                            <SelectItem key={p.id} value={String(p.id)}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </ShadcnSelect>
                                {errors.property_id && <p className="text-sm text-red-500">{errors.property_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Inquilino</Label>
                                <Input value={rental.tenant?.name || '---'} disabled className="bg-gray-50 dark:bg-gray-800" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="start_date">Fecha de Inicio</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_date">Fecha de Fin <span className="text-gray-400 text-xs">(opcional)</span></Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="monthly_rent">Renta Mensual ($)</Label>
                                <Input
                                    id="monthly_rent"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={data.monthly_rent}
                                    onChange={(e) => setData('monthly_rent', e.target.value)}
                                />
                                {errors.monthly_rent && <p className="text-sm text-red-500">{errors.monthly_rent}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deposit_amount">Depósito ($)</Label>
                                <Input
                                    id="deposit_amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={data.deposit_amount}
                                    onChange={(e) => setData('deposit_amount', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment_day">Día de Pago</Label>
                                <Input
                                    id="payment_day"
                                    type="number"
                                    min="1"
                                    max="31"
                                    value={data.payment_day}
                                    onChange={(e) => setData('payment_day', e.target.value)}
                                />
                                {errors.payment_day && <p className="text-sm text-red-500">{errors.payment_day}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Estado</Label>
                                <ShadcnSelect
                                    value={data.status}
                                    onValueChange={(v) => setData('status', v)}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pendiente</SelectItem>
                                        <SelectItem value="active">Activo</SelectItem>
                                        <SelectItem value="expired">Vencido</SelectItem>
                                        <SelectItem value="terminated">Terminado</SelectItem>
                                    </SelectContent>
                                </ShadcnSelect>
                                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notas</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                            />
                        </div>

                            </ContainerTitle>
                        <div className="flex justify-end gap-3 pt-4">
                            
                            <Button type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </form>
            </div>
        </AuthenticatedLayout>
    );
}
