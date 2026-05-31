<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalRenewal extends Model
{
    use HasFactory;

    protected $fillable = [
        'rental_id',
        'start_date',
        'end_date',
        'monthly_rent',
        'payment_day',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date:Y-m-d',
            'end_date' => 'date:Y-m-d',
            'monthly_rent' => 'decimal:2',
        ];
    }

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }
}
