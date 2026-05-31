<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'tenant_id',
        'user_id',
        'start_date',
        'end_date',
        'monthly_rent',
        'deposit_amount',
        'payment_day',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date:Y-m-d',
            'end_date' => 'date:Y-m-d',
            'monthly_rent' => 'decimal:2',
            'deposit_amount' => 'decimal:2',
        ];
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function tenant()
    {
        return $this->belongsTo(Contacts::class, 'tenant_id');
    }

    public function agent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payments()
    {
        return $this->hasMany(RentalPayment::class);
    }

    public function renewals()
    {
        return $this->hasMany(RentalRenewal::class)->orderBy('start_date', 'asc');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
