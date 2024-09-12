<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('types_properties', function (Blueprint $table) {
            $table->id();
            $table->text('name')->notNullable();
            $table->string('slug')->unique();
            $table->string('image')->default('default.jpg');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('types_properties');
    }
};
