<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Setting extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'email',
        'phone',
        'logo',
        'logo_footer',
        'favicon',
        'direction',
        'description',
        'titleBlog',
        'titleFaq',
        'titleContact',
        'titleAnunciar',
        'descriptionBlog',
        'descriptionFaq',
        'descriptionContact',
        'descriptionAnunciar',
        'status_banner',
        'status_products_list',
        'status_info_section',
        'status_testimonials',
        'status_team',
        'status_instagram_posts',
        'instagram',
        'token_instagram',
        'currency_id',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
