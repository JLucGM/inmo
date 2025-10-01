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
        'identificación_contact',
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

    protected static function booted()
    {
        static::updating(function ($contact) {
            if ($contact->is_new) {
                $contact->is_new = false;
            }
        });
    }

    public function properties()
    {
        return $this->belongsToMany(Property::class, 'contact_properties', 'contact_id', 'property_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function typecontact()
    {
        return $this->belongsTo(TypesContacts::class, 'types_contacts_id');
    }

    public function statuscontact()
    {
        return $this->belongsTo(StatusContact::class, 'status_contacts_id');
    }

    public function origin()
    {
        return $this->belongsTo(Origins::class, 'origin_id');
    }

    public function typeproperty()
    {
        return $this->belongsTo(TypesProperties::class, 'types_properties_id');
    }

    public function country()
    {
        return $this->belongsTo(Countries::class, 'country_id');
    }

    public function state()
    {
        return $this->belongsTo(States::class, 'state_id');
    }

    public function city()
    {
        return $this->belongsTo(Cities::class, 'city_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'contact_id');
    }
}
