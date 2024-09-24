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
         Schema::create('slides', function (Blueprint $table) {
            $table->id('id');
            $table->text('name')->nullable();
            $table->string('slug')->unique();
            $table->string('image');
            $table->longText('text')->nullable();
            $table->string('link')->nullable();
            $table->enum('status',['0','1'])->default('0');
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
        Schema::drop('slides');
        
    }
};
