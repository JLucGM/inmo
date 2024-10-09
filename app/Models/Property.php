<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Property extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'price',
        'slug',
        'description',
        'identification',
        'main',
        'images',
        'bedrooms',
        'bathrooms',
        'totalMeters',
        'builtMeters',
        'garages',
        'direction',
        'coordinate',
        'status',
        'types_properties_id',
        'phy_states_id',
        'types_businesses_id',
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

    // Regresa valores de texto en los datos 0 y 1 del campo status
    // public function getStatusAttribute($value)
    // {
    //     return $value === 0 ? 'Inactivo' : 'Activo';
    // }

    public function typeProperty()
    {
        return $this->belongsTo(TypesProperties::class, 'types_properties_id');
    }

    public function phyState()
    {
        return $this->belongsTo(PhyStates::class, 'phy_states_id');
    }

    public function typeBusiness()
    {
        return $this->belongsTo(TypesBusinesses::class, 'types_businesses_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country()
    {
        return $this->belongsTo(Countries::class);
    }

    public function state()
    {
        return $this->belongsTo(States::class);
    }

    public function city()
    {
        return $this->belongsTo(Cities::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'property_amenities', 'property_id', 'amenity_id');
    }

    public function contacts()
    {
        return $this->belongsToMany(Contacts::class, 'contact_properties', 'property_id', 'contact_id');
    }
}
