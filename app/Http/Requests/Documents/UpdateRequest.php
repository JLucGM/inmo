<?php

namespace App\Http\Requests\Documents;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
            'status' => ['nullable'],
            'contact_id' => ['nullable', 'exists:contacts,id'],
            'property_id' => ['nullable', 'exists:properties,id'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }
}
