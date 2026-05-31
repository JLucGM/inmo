<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("UPDATE properties SET price = REGEXP_REPLACE(price, '[^0-9.]', '') WHERE price IS NOT NULL AND price != ''");

        Schema::table('properties', function (Blueprint $table) {
            $table->decimal('price', 12, 2)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->text('price')->nullable()->change();
        });
    }
};
