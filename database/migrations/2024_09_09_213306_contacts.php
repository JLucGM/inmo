<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->text('name')->notNullable();
            $table->string('slug')->unique();
            $table->text('email')->nullable();
            $table->text('phone')->nullable();
            $table->text('identificación_contact')->nullable();
            $table->date('birthdate')->nullable();
            $table->text('min_budget')->nullable();
            $table->text('max_budget')->nullable();
            $table->text('bedrooms')->nullable();
            $table->text('bathrooms')->nullable();
            $table->mediumText('description')->nullable();
            $table->mediumText('direction')->nullable();
            $table->foreignId('types_contacts_id')->nullable()->constrained();
            $table->foreignId('status_contacts_id')->nullable()->constrained();
            $table->foreignId('origin_id')->nullable()->constrained();
            $table->foreignId('types_properties_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('state_id')->nullable()->constrained();
            $table->foreignId('city_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacts');
    }
};
