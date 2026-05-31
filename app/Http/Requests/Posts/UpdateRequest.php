<?php

namespace App\Http\Requests\Posts;

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
            'content' => ['nullable', 'string'],
            'status' => ['nullable'],
            'extract' => ['nullable', 'string', 'max:500'],
            'category_post_id' => ['nullable', 'exists:category_posts,id'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ];
    }
}
