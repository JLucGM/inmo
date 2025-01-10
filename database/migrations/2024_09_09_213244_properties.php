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
            $table->string('identification')->nullable(); //text
            $table->text('description')->nullable();
            $table->string('main')->default('default.jpg'); //text
            $table->string('images')->nullable(); //text
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('totalMeters')->nullable();
            $table->string('builtMeters')->nullable();
            $table->string('garages')->nullable();
            $table->string('direction')->nullable();
            $table->string('coordinate')->nullable();
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
