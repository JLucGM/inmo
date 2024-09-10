<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('types_businesses', function (Blueprint $table) {
            $table->id();
            $table->text('name')->notNullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('types_businesses');
    }
};
