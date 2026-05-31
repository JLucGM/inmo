<?php

namespace App\Http\Requests\Rentals;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'paid_date' => 'nullable|date',
            'period_start' => 'nullable|date',
            'period_end' => 'nullable|date|after_or_equal:period_start',
            'status' => 'required|in:pending,paid,overdue,partial',
            'late_fee' => 'nullable|numeric|min:0',
            'payment_method' => 'nullable|string|max:100',
            'reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' => 'El monto es obligatorio.',
            'amount.numeric' => 'El monto debe ser un número.',
            'due_date.required' => 'La fecha de vencimiento es obligatoria.',
            'status.required' => 'El estado es obligatorio.',
        ];
    }
}
