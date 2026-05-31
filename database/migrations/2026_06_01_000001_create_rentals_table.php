<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->restrictOnDelete();
            $table->foreignId('tenant_id')->constrained('contacts')->restrictOnDelete();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('monthly_rent', 10, 2);
            $table->decimal('deposit_amount', 10, 2)->nullable();
            $table->integer('payment_day');
            $table->enum('status', ['active', 'expired', 'terminated', 'pending'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rentals');
    }
};
