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
            // 'main' => 'required',
            // 'images' => 'required|mimes:png,jpg,jpeg',
            // 'price'  => 'required',
            //'description'  => 'required',
            'identification' => 'required|numeric',
            //'bedrooms'  => 'required',
            //'bathrooms'  => 'required',
            //'totalMeters'  => 'required',
            //'builtMeters'  => 'required',
            //'garages'  => 'required',
            'direction'  => 'required',
            'amenitiy' => 'required|array',
            'amenitiy.*' => 'exists:amenities,id',
                //  'main' => 'nullable|image|max:2048',  // 2MB max
     'images.*' => 'image|max:2048',  // Para múltiples
     
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El campo nombre es obligatorio.',
            'name.min' => 'El campo nombre debe tener al menos 2 caracteres.',
            'name.max' => 'El campo nombre no debe exceder los 250 caracteres.',
            // 'main.required' => 'La imagen principal es obligatoria.',
            // 'main.image' => 'El archivo debe ser una imagen válida.',
            // 'main.max' => 'La imagen principal no debe exceder los 2MB.',
            // 'images.required' => 'La imagen es obligatoria.',
            // 'images.mimes' => 'La imagen debe ser un archivo de tipo: png, jpg, jpeg.',
            // 'price.required' => 'El campo precio es obligatorio.',
            // 'description.required' => 'El campo descripción es obligatorio.',
            'identification.required' => 'El campo identificación es obligatorio.',
            'identification.numeric' => 'El campo identificación debe ser un número válido.',
            // 'bedrooms.required' => 'El campo habitaciones es obligatorio.',
            // 'bathrooms.required' => 'El campo baños es obligatorio.',
            // 'totalMeters.required' => 'El campo metros totales es obligatorio.',
            // 'builtMeters.required' => 'El campo metros construidos es obligatorio.',
            // 'garages.required' => 'El campo garajes es obligatorio.',
            'direction.required' => 'El campo dirección es obligatorio.',
            'amenitiy.required' => 'Debe seleccionar al menos una amenidad.',
            'amenitiy.array' => 'Las amenidades deben ser un arreglo válido.',
            'amenitiy.*.exists' => 'Una o más amenidades seleccionadas no son válidas.',

        ];
    }
}
