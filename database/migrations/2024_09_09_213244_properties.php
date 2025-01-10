<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->text('name')->notNullable();
            $table->string('slug')->unique();
            $table->text('price')->nullable();
            $table->text('identification')->unique()->nullable();
            $table->MediumText('description')->nullable();
            $table->string('main')->default('default.jpg');
            $table->string('images')->nullable();
            $table->text('bedrooms')->nullable();
            $table->text('bathrooms')->nullable();
            $table->text('totalMeters')->nullable();
            $table->text('builtMeters')->nullable();
            $table->text('garages')->nullable();
            $table->text('direction')->nullable();
            $table->text('coordinate')->nullable();
            $table->enum('status',['0','1'])->default('0');
            // $table->foreignId('status_id')->constrained();
            $table->foreignId('types_properties_id')->constrained();
            $table->foreignId('phy_states_id')->nullable()->constrained();
            $table->foreignId('types_businesses_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('state_id')->nullable()->constrained();
            $table->foreignId('city_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
