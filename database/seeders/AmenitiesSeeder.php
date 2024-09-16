<?php

namespace Database\Seeders;

use App\Models\Amenities;
use Illuminate\Database\Seeder;

class AmenitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $amenities = [
            ['name' => 'Generales','slug' => 'generales'],
            ['name' =>'Acepta mascotas', 'slug' => 'Acepta mascotas'],
            ['name' =>'Piscina', 'slug' => 'piscina'],
            ['name' => 'Parrilla', 'slug' => 'parrilla'],
            ['name' => 'Agua Corriente', 'slug' => 'agua-corriente'],
            ['name' => 'Patio', 'slug' => 'patio'],
            ['name' => 'Comedor', 'slug' => 'comedor'],
            ['name' => 'Terraza', 'slug' => 'terraza'],
            ['name' => 'Aire Acondicionado', 'slug' => 'aire-acondicionado'],
            ['name' => 'Amoblado', 'slug' => 'amoblado'],
            ['name' => 'Alarma', 'slug' => 'alarma'],
            ['name' => 'Calefacción', 'slug' => 'calefaccion'],
            ['name' => 'Portones eléctricos', 'slug' => 'portones-electricos'],
            ['name' => 'Seguridad 24hs', 'slug' => 'seguridad-24hs'],
            ['name' => 'Sauna', 'slug' => 'sauna'],
            ['name' => 'Bosque', 'slug' => 'bosque'],
        ];

        foreach ($amenities as $amenitiesData) {
            Amenities::create($amenitiesData);
        }
    }
}
