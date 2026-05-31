<?php

namespace App\Http\Requests\Properties;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'images.*' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ];
    }
}
