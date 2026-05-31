<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rental_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_id')->constrained('rentals')->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->date('due_date');
            $table->date('paid_date')->nullable();
            $table->date('period_start')->nullable();
            $table->date('period_end')->nullable();
            $table->enum('status', ['pending', 'paid', 'overdue', 'partial'])->default('pending');
            $table->decimal('late_fee', 10, 2)->nullable();
            $table->string('payment_method')->nullable();
            $table->string('reference')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rental_payments');
    }
};
