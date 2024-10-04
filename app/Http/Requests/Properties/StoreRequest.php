<?php

namespace App\Http\Requests\Properties;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:2|max:250',
            'main' => 'required',
            'images' => 'required',
            // 'price'  => 'required',
            //'description'  => 'required',
            'identification' => 'required|numeric|max:20',
            //'bedrooms'  => 'required',
            //'bathrooms'  => 'required',
            //'totalMeters'  => 'required',
            //'builtMeters'  => 'required',
            //'garages'  => 'required',
            'direction'  => 'required',
            'amenitiy' => 'required|array',
            'amenitiy.*' => 'exists:amenities,id',
        ];
    }
}
