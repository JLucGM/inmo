<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('contact_properties', function (Blueprint $table) {
        $table->foreignId('contact_id')->constrained('contacts');
        $table->foreignId('property_id')->constrained('properties');
        $table->primary(['contact_id', 'property_id']);
        $table->timestamps();
    });
}

    public function down()
    {
        Schema::dropIfExists('contact_properties');
    }
};
