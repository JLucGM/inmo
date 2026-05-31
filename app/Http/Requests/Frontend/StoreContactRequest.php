<?php

namespace App\Http\Requests\Frontend;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'identificación_contact' => ['nullable', 'string', 'max:191'],
            'description' => ['nullable', 'string', 'max:2000'],
            'types_contacts_id' => ['nullable', 'exists:types_contacts,id'],
            'types_properties_id' => ['nullable', 'exists:types_properties,id'],
            'status_contacts_id' => ['nullable', 'exists:status_contacts,id'],
            'origin_id' => ['nullable', 'exists:origins,id'],
            'country_id' => ['nullable', 'exists:countries,id'],
            'state_id' => ['nullable', 'exists:states,id'],
            'city_id' => ['nullable', 'exists:cities,id'],
            'user_id' => ['nullable', 'exists:users,id'],
            'property_id' => ['nullable', 'exists:properties,id'],
        ];
    }
}
