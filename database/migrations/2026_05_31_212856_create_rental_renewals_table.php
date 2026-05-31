<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rental_renewals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_id')->constrained('rentals')->cascadeOnDelete();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('monthly_rent', 10, 2);
            $table->integer('payment_day');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rental_renewals');
    }
};
