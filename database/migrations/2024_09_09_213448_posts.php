<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->longText('name')->notNullable();
            $table->string('slug')->unique();
            $table->longText('content')->notNullable();
            $table->text('extract')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->longText('image')->nullable();
            $table->foreignId('category_post_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};

