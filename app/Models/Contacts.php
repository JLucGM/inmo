<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Contacts extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'email',
        'phone',
        'birthdate',
        'min_budget',
        'max_budget',
        'bedrooms',
        'bathrooms',
        'direction',
        'description',
        'types_contacts_id',
        'status_contacts_id',
        'origin_id',
        'types_properties_id',
        'user_id',
        'country_id',
        'state_id',
        'city_id',
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
}
