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
            $table->string('logo')->nullable();
            $table->string('logo_footer')->nullable();
            $table->string('favicon')->nullable();
            $table->mediumText('direction')->nullable();
            $table->string('description')->notNullable(); // Descripción del sitio
            $table->string('portadaBlog')->default();
            $table->string('portadaFaq')->default();
            $table->string('portadaContact')->default();
            $table->string('portadaAnunciar')->default();
            $table->string('titleBlog')->default();
            $table->string('titleFaq')->default();
            $table->string('titleContact')->default();
            $table->string('titleAnunciar')->default();
            $table->text('descriptionBlog')->default();
            $table->text('descriptionFaq')->default();
            $table->text('descriptionContact')->default();
            $table->text('descriptionAnunciar')->default();
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
