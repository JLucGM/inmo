<?php

namespace Database\Seeders;

use App\Models\TypeBusiness;
use App\Models\TypesBusinesses;
use Illuminate\Database\Seeder;

class TypeBusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'En venta'],
            ['name' => 'En alquiler'],
            ['name' => 'Obra nueva'],
            ['name' => 'Alquiler con opción a compra'],
            ['name' => 'Alquiler vacacional'],
            ['name' => 'Traspaso'],
            ['name' => 'Compartir'],
            ['name' => 'Venta de negocio'],
            ['name' => 'Alquiler de negocio'],
        ];

        foreach ($data as $TypeBusiness) {
            TypesBusinesses::create($TypeBusiness);
        }
    }
}
