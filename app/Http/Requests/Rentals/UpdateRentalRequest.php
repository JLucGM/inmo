<?php

namespace App\Http\Requests\Rentals;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateRentalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'property_id' => 'required|exists:properties,id',
            'tenant_id' => 'required|exists:contacts,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'monthly_rent' => 'required|numeric|min:0',
            'deposit_amount' => 'nullable|numeric|min:0',
            'payment_day' => 'required|integer|between:1,31',
            'status' => 'required|in:active,expired,terminated,pending',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'property_id.required' => 'Debe seleccionar una propiedad.',
            'property_id.exists' => 'La propiedad seleccionada no existe.',
            'tenant_id.required' => 'Debe seleccionar un inquilino.',
            'tenant_id.exists' => 'El inquilino seleccionado no existe.',
            'start_date.required' => 'La fecha de inicio es obligatoria.',
            'monthly_rent.required' => 'La renta mensual es obligatoria.',
            'payment_day.required' => 'El día de pago es obligatorio.',
            'payment_day.between' => 'El día de pago debe estar entre 1 y 31.',
            'status.required' => 'El estado es obligatorio.',
        ];
    }
}
