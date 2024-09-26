<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactProperty extends Model
{
    use HasFactory;

    //protected $table = 'contact_properties';
    protected $table = 'contact_properties';


    protected $fillable = [
        'contact_id',
        'property_id',
    ];

}
