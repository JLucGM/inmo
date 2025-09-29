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
            $table->mediumText('description')->notNullable(); // Descripcbión del sitio
            $table->string('portadaBlog')->default();
            $table->string('portadaFaq')->default();
            $table->string('portadaContact')->default();
            $table->string('portadaAnunciar')->default();
            $table->string('titleBlog')->default();
            $table->string('titleFaq')->default();
            $table->string('titleContact')->default();
            $table->string('titleAnunciar')->default();
            $table->string('titleTestimonials')->default();
            $table->string('descriptionBlog')->default(); //text
            $table->string('descriptionFaq')->default(); //text
            $table->string('descriptionContact')->default(); //text
            $table->string('descriptionAnunciar')->default(); //text
            $table->string('descriptionTestimonials')->default(); //text
            $table->string('instagram')->default(); //text
            $table->string('token_instagram')->nullable(); //text
            $table->tinyInteger('status_banner')->default(1);
            $table->tinyInteger('status_products_list')->default(1);
            $table->tinyInteger('status_info_section')->default(1);
            $table->tinyInteger('status_testimonials')->default(1);
            $table->tinyInteger('status_team')->default(1);
            $table->tinyInteger('status_instagram_posts')->default(0);
            $table->string('titleInfoSection')->default();
            $table->string('descriptionInfoSection')->default(); //text
            $table->string('titleTeamSection')->default();
            $table->string('descriptionTeamSection')->default(); //text
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
