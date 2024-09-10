<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('contacts_properties', function (Blueprint $table) {
            $table->foreignId('contact_id')->constrained();
            $table->foreignId('property_id')->constrained();
            $table->primary(['contact_id', 'property_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacts_properties');
    }
};
