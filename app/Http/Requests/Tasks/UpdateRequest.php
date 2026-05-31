<?php

namespace App\Http\Requests\Tasks;

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
            'start_time' => ['nullable', 'date'],
            'end_time' => ['nullable', 'date'],
            'status_contacts_id' => ['nullable', 'exists:status_contacts,id'],
            'description' => ['nullable', 'string'],
            'contact_id' => ['nullable', 'exists:contacts,id'],
            'types_tasks_id' => ['nullable', 'exists:type_tasks,id'],
            'property_id' => ['nullable', 'exists:properties,id'],
        ];
    }
}
