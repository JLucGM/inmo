<?php

namespace Database\Seeders;

use App\Models\TypesBusinesses;
use Illuminate\Database\Seeder;

class TypeBusinessSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['name' => 'En venta'],
            ['name' => 'En alquiler'],
        ];

        foreach ($data as $item) {
            TypesBusinesses::firstOrCreate(['name' => $item['name']], $item);
        }
    }
}
