<?php

namespace App\Http\Requests\Properties;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $property = $this->route('property');

        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'slug' => ['nullable', 'string', 'unique:properties,slug,' . $property->id],
            'description' => ['nullable', 'string'],
            'identification' => ['nullable', 'string', 'max:255'],
            'bedrooms' => ['nullable', 'integer', 'min:0'],
            'bathrooms' => ['nullable', 'integer', 'min:0'],
            'totalMeters' => ['nullable', 'numeric', 'min:0'],
            'builtMeters' => ['nullable', 'numeric', 'min:0'],
            'garages' => ['nullable', 'integer', 'min:0'],
            'direction' => ['nullable', 'string', 'max:500'],
            'status' => ['required', Rule::in([0, 1, 2])],
            'types_properties_id' => ['required', 'exists:types_properties,id'],
            'phy_states_id' => ['required', 'exists:phy_states,id'],
            'types_businesses_id' => ['required', 'exists:types_businesses,id'],
            'country_id' => ['required', 'exists:countries,id'],
            'state_id' => ['required', 'exists:states,id'],
            'city_id' => ['required', 'exists:cities,id'],
            'amenity' => ['nullable', 'array'],
            'amenity.*' => ['exists:amenities,id'],
        ];
    }
}
