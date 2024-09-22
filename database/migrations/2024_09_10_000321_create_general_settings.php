<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->notNullable(); // Nombre del sitio
            $table->string('slug')->unique();
            $table->string('email')->notNullable();
            $table->string('phone')->nullable();
            $table->string('logo')->default('default');
            $table->string('logo_footer')->default('default');
            $table->string('favicon')->default('default');
            $table->mediumText('direction')->nullable();
            $table->string('description')->notNullable(); // Descripción del sitio
            $table->foreignId('currency_id')->nullable()->constrained()->onDelete('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
};
