<?php

namespace App\Http\Requests\Settings;

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
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'direction' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'titleBlog' => ['nullable', 'string', 'max:255'],
            'titleFaq' => ['nullable', 'string', 'max:255'],
            'titleContact' => ['nullable', 'string', 'max:255'],
            'titleAnunciar' => ['nullable', 'string', 'max:255'],
            'titleTestimonials' => ['nullable', 'string', 'max:255'],
            'descriptionBlog' => ['nullable', 'string'],
            'descriptionFaq' => ['nullable', 'string'],
            'descriptionContact' => ['nullable', 'string'],
            'descriptionAnunciar' => ['nullable', 'string'],
            'descriptionTestimonials' => ['nullable', 'string'],
            'status_banner' => ['nullable'],
            'status_products_list' => ['nullable'],
            'status_info_section' => ['nullable'],
            'status_testimonials' => ['nullable'],
            'status_team' => ['nullable'],
            'status_instagram_posts' => ['nullable'],
            'instagram' => ['nullable', 'string', 'max:255'],
            'token_instagram' => ['nullable', 'string'],
            'titleInfoSection' => ['nullable', 'string', 'max:255'],
            'descriptionInfoSection' => ['nullable', 'string'],
            'titleTeamSection' => ['nullable', 'string', 'max:255'],
            'descriptionTeamSection' => ['nullable', 'string'],
            'currency_id' => ['nullable', 'exists:currencies,id'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
            'logo_footer' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
            'favicon' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:512'],
            'portadaContact' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'portadaFaq' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'portadaAnunciar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ];
    }
}
