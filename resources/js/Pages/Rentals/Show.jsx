import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { formatDate } from '@/lib/formatDate';
import { useState } from 'react';
import ContainerTitle from '@/Components/ContainerTitle';

const statusBadge = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    terminated: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels = {
    active: 'Activo',
    pending: 'Pendiente',
    expired: 'Vencido',
    terminated: 'Terminado',
};

const paymentStatusBadge = {
    paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    partial: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function Show({ auth, rental }) {
    const [showRenewForm, setShowRenewForm] = useState(false);
    {/* const [showPaymentForm, setShowPaymentForm] = useState(false); */ }

    const { data: renewData, setData: setRenewData, post: renewPost, errors: renewErrors } = useForm({
        start_date: '',
        end_date: '',
    });

    /* const { data: paymentData, setData: setPaymentData, post: paymentPost, errors: paymentErrors } = useForm({
        amount: rental.monthly_rent,
        due_date: '',
        status: 'paid',
        paid_date: '',
        payment_method: '',
        reference: '',
        notes: '',
    }); */

    const handleRenew = (e) => {
        e.preventDefault();
        renewPost(route('rentals.renew', rental.id), {
            onSuccess: () => setShowRenewForm(false),
        });
    };

    /* const handleAddPayment = (e) => {
        e.preventDefault();
        paymentPost(route('rentals.storePayment', rental.id), {
            onSuccess: () => {
                setShowPaymentForm(false);
                setPaymentData({ ...paymentData, amount: rental.monthly_rent, due_date: '', paid_date: '', payment_method: '', reference: '', notes: '' });
            },
        });
    }; */

    const handleMarkPaid = (paymentId) => {
        router.post(route('rentals.markPayment', [rental.id, paymentId]));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={`Contrato #${rental.id}`} />

            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
                <div className="col-span-full md:col-span-2">
                    <ContainerTitle title="Pagos">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {rental.status === 'active' && (
                                    <Button size="sm" variant="outline" onClick={() => setShowRenewForm(!showRenewForm)}>
                                        Renovar
                                    </Button>
                                )}
                                {/* <Button size="sm" onClick={() => setShowPaymentForm(!showPaymentForm)}>
                                + Agregar Pago
                            </Button> */}
                            </div>
                        </div>

                        {showRenewForm && (
                            <form onSubmit={handleRenew} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4 border border-gray-200 dark:border-gray-700">
                                <h4 className="font-medium text-sm">Renovar Contrato</h4>
                                <p className="text-xs text-gray-500">La renta se mantiene en <strong>${Number(rental.monthly_rent).toLocaleString()}</strong>. Para cambiar el precio, crea un nuevo contrato.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <Label>Nueva Fecha de Inicio</Label>
                                        <Input type="date" value={renewData.start_date} onChange={(e) => setRenewData('start_date', e.target.value)} />
                                        {renewErrors.start_date && <p className="text-xs text-red-500">{renewErrors.start_date}</p>}
                                    </div>
                                    <div>
                                        <Label>Nueva Fecha de Fin</Label>
                                        <Input type="date" value={renewData.end_date} onChange={(e) => setRenewData('end_date', e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" size="sm" variant="outline" onClick={() => setShowRenewForm(false)}>Cancelar</Button>
                                    <Button type="submit" size="sm">Confirmar Renovación</Button>
                                </div>
                            </form>
                        )}

                        {/* {showPaymentForm && (
                        <form onSubmit={handleAddPayment} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4 border border-gray-200 dark:border-gray-700">
                            <h4 className="font-medium text-sm">Registrar Pago</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                    <Label>Monto</Label>
                                    <Input type="number" step="0.01" value={paymentData.amount} onChange={(e) => setPaymentData('amount', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Fecha de Vencimiento</Label>
                                    <Input type="date" value={paymentData.due_date} onChange={(e) => setPaymentData('due_date', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Fecha de Pago</Label>
                                    <Input type="date" value={paymentData.paid_date} onChange={(e) => setPaymentData('paid_date', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Método</Label>
                                    <ShadcnSelect value={paymentData.payment_method} onValueChange={(v) => setPaymentData('payment_method', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="transfer">Transferencia</SelectItem>
                                            <SelectItem value="cash">Efectivo</SelectItem>
                                            <SelectItem value="check">Cheque</SelectItem>
                                            <SelectItem value="card">Tarjeta</SelectItem>
                                            <SelectItem value="other">Otro</SelectItem>
                                        </SelectContent>
                                    </ShadcnSelect>
                                </div>
                                <div>
                                    <Label>Referencia</Label>
                                    <Input value={paymentData.reference} onChange={(e) => setPaymentData('reference', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" size="sm" variant="outline" onClick={() => setShowPaymentForm(false)}>Cancelar</Button>
                                <Button type="submit" size="sm">Registrar</Button>
                            </div>
                        </form>
                    )} */}

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-2 px-3 font-medium text-gray-500">Periodo</th>
                                        <th className="text-left py-2 px-3 font-medium text-gray-500">Vencimiento</th>
                                        <th className="text-right py-2 px-3 font-medium text-gray-500">Monto</th>
                                        <th className="text-right py-2 px-3 font-medium text-gray-500">Recargo</th>
                                        <th className="text-center py-2 px-3 font-medium text-gray-500">Estado</th>
                                        <th className="text-left py-2 px-3 font-medium text-gray-500">Pago</th>
                                        <th className="text-center py-2 px-3 font-medium text-gray-500">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rental.payments?.length > 0 ? (
                                        rental.payments.map((payment) => (
                                            <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                <td className="py-2 px-3">
                                                    {payment.period_start && payment.period_end
                                                        ? `${formatDate(payment.period_start)} — ${formatDate(payment.period_end)}`
                                                        : '---'}
                                                </td>
                                                <td className="py-2 px-3">{formatDate(payment.due_date)}</td>
                                                <td className="py-2 px-3 text-right font-medium">${Number(payment.amount).toLocaleString()}</td>
                                                <td className="py-2 px-3 text-right">{payment.late_fee ? `$${Number(payment.late_fee).toLocaleString()}` : '---'}</td>
                                                <td className="py-2 px-3 text-center">
                                                    <Badge className={paymentStatusBadge[payment.status] || ''}>
                                                        {payment.status === 'paid' ? 'Pagado' : payment.status === 'pending' ? 'Pendiente' : payment.status === 'overdue' ? 'Vencido' : 'Parcial'}
                                                    </Badge>
                                                </td>
                                                <td className="py-2 px-3">{payment.paid_date ? formatDate(payment.paid_date) : '---'}</td>
                                                <td className="py-2 px-3 text-center">
                                                    {payment.status !== 'paid' && (
                                                        <Button size="sm" variant="outline" onClick={() => handleMarkPaid(payment.id)}>
                                                            Marcar Pagado
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-gray-400">
                                                No hay pagos registrados para este contrato.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </ContainerTitle>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                    <div className="space-y-4">
                        <ContainerTitle title="Información General" >
                            <div className="flex items-center justify-between">
                                <Badge className={statusBadge[rental.status]}>
                                    {statusLabels[rental.status]}
                                </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Propiedad:</span>
                                    <a
                                        href={route('property.show', rental.property?.slug)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium hover:underline text-right"
                                    >
                                        {rental.property?.name || '---'}
                                    </a>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Renta Mensual:</span>
                                    <span className="font-semibold">${Number(rental.monthly_rent).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Depósito:</span>
                                    <span>{rental.deposit_amount ? `$${Number(rental.deposit_amount).toLocaleString()}` : '---'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Día de Pago:</span>
                                    <span className="font-medium">{rental.payment_day}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Inicio:</span>
                                    <span>{formatDate(rental.start_date)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Fin:</span>
                                    <span>{formatDate(rental.end_date)}</span>
                                </div>
                            </div>
                        </ContainerTitle>

                        <ContainerTitle title="Información del Inquilino" >
                            {rental.tenant ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300 shrink-0">
                                        {rental.tenant.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{rental.tenant.name}</p>
                                        <p className="text-sm text-gray-500">{rental.tenant.email}</p>
                                        {rental.tenant.phone && <p className="text-sm text-gray-500">{rental.tenant.phone}</p>}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">Sin asignar</p>
                            )}
                        </ContainerTitle>

                        <ContainerTitle title="Agente">
                            {rental.agent ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300 shrink-0">
                                        {rental.agent.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{rental.agent.name}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">Sin asignar</p>
                            )}
                        </ContainerTitle>
                        {rental.notes && (
                            <ContainerTitle title="Notas">
                                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{rental.notes}</p>
                            </ContainerTitle>
                        )}
                    </div>
                </div>




                {rental.renewals?.length > 1 && (
                    <ContainerTitle title="Historial de Renovaciones">
                        <div className="relative pl-6 space-y-0">
                            {rental.renewals.map((renewal, index) => {
                                const isFirst = index === 0;
                                const isLast = index === rental.renewals.length - 1;
                                return (
                                    <div key={renewal.id} className="relative pb-6">
                                        {!isLast && (
                                            <div className="absolute left-0 top-3 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                                        )}
                                        <div className={`absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full border-2 ${isLast ? 'bg-primary border-primary' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'}`} />
                                        <div className="ml-6">
                                            <p className="text-sm font-medium">
                                                {isFirst ? 'Contrato inicial' : `Renovación #${index}`}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(renewal.start_date)} — {formatDate(renewal.end_date)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Renta: ${Number(renewal.monthly_rent).toLocaleString()} | Día de pago: {renewal.payment_day}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ContainerTitle>
                )}

                {/* Documentos section removed */}
            </div>
        </AuthenticatedLayout>
    );
}
