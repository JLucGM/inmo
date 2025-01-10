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
            $table->string('description')->notNullable(); // Descripcbión del sitio
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
            $table->text('instagram')->default();
            $table->text('token_instagram')->nullable();
            $table->tinyInteger('status_banner')->default(1);
            $table->tinyInteger('status_products_list')->default(1);
            $table->tinyInteger('status_info_section')->default(1);
            $table->tinyInteger('status_testimonials')->default(1);
            $table->tinyInteger('status_team')->default(1);
            $table->tinyInteger('status_instagram_posts')->default(0);
            $table->string('titleInfoSection')->default();
            $table->text('descriptionInfoSection')->default();
            $table->string('titleTeamSection')->default();
            $table->text('descriptionTeamSection')->default();
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
