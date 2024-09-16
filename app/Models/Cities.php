<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Cities extends Model
{

    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'state_id',
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

    public function state()
    {
        return $this->belongsTo(States::class);
    }

    public function properties()
    {
        return $this->hasMany(Properties::class);
    }
}
