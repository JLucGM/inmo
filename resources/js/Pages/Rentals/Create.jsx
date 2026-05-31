import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SectionHeader from '@/Components/SectionHeader';
import ContainerTitle from '@/Components/ContainerTitle';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useState, useEffect, useRef } from 'react';

export default function Create({ auth, properties, agents }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [tenantResults, setTenantResults] = useState([]);
    const [showTenantDropdown, setShowTenantDropdown] = useState(false);
    const [searchingTenant, setSearchingTenant] = useState(false);
    const tenantRef = useRef(null);

    const { data, setData, errors, post } = useForm({
        property_id: '',
        tenant_id: '',
        start_date: '',
        end_date: '',
        monthly_rent: '',
        deposit_amount: '',
        payment_day: '5',
        status: 'pending',
        notes: '',
    });

    useEffect(() => {
        if (searchTerm.length < 1) {
            setTenantResults([]);
            setShowTenantDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            setSearchingTenant(true);
            try {
                const res = await fetch(`/dashboard/api/rentals/contacts?q=${encodeURIComponent(searchTerm)}`);
                const data = await res.json();
                setTenantResults(data);
                setShowTenantDropdown(true);
            } catch (e) {
                setTenantResults([]);
            } finally {
                setSearchingTenant(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (tenantRef.current && !tenantRef.current.contains(e.target)) {
                setShowTenantDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('rentals.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Crear Renta" />

            <div className="p-4">
                    <form onSubmit={submit} className="space-y-6">
                        <ContainerTitle title="Datos del Contrato" > 

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

                            <div className="space-y-2" ref={tenantRef}>
                                <Label htmlFor="tenant_search">Inquilino</Label>
                                <div className="relative">
                                    <Input
                                        id="tenant_search"
                                        placeholder="Buscar contacto..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setData('tenant_id', '');
                                        }}
                                    />
                                    {searchingTenant && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                                        </div>
                                    )}
                                    {showTenantDropdown && tenantResults.length > 0 && (
                                        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                            {tenantResults.map((contact) => (
                                                <button
                                                    key={contact.id}
                                                    type="button"
                                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${data.tenant_id === String(contact.id) ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                                    onClick={() => {
                                                        setSearchTerm(contact.name);
                                                        setData('tenant_id', String(contact.id));
                                                        setShowTenantDropdown(false);
                                                    }}
                                                >
                                                    <span className="font-medium">{contact.name}</span>
                                                    <span className="text-gray-500 ml-2 text-xs">{contact.email}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {showTenantDropdown && searchTerm && tenantResults.length === 0 && !searchingTenant && (
                                        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3 text-sm text-gray-500">
                                            No se encontraron contactos
                                        </div>
                                    )}
                                </div>
                                {errors.tenant_id && <p className="text-sm text-red-500">{errors.tenant_id}</p>}
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
                                <Label htmlFor="deposit_amount">Depósito ($) <span className="text-gray-400 text-xs">(opcional)</span></Label>
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
                                    </SelectContent>
                                </ShadcnSelect>
                                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notas <span className="text-gray-400 text-xs">(opcional)</span></Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                            />
                        </div>
</ContainerTitle>
                        <div className="flex justify-end gap-3 pt-4 ">
                            
                            <Button type="submit">
                                Crear Contrato
                            </Button>
                        </div>
                    </form>
            </div>
        </AuthenticatedLayout>
    );
}
