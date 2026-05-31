<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'rental_id',
        'amount',
        'due_date',
        'paid_date',
        'period_start',
        'period_end',
        'status',
        'late_fee',
        'payment_method',
        'reference',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date:Y-m-d',
            'paid_date' => 'date:Y-m-d',
            'period_start' => 'date:Y-m-d',
            'period_end' => 'date:Y-m-d',
            'amount' => 'decimal:2',
            'late_fee' => 'decimal:2',
        ];
    }

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', 'overdue');
    }
}
