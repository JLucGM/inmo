<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmenitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Amenities = [
            ['name' => 'mascotas permitidas'],
            ['name' => 'piscina'],
            ['name' => 'garaje'],
            ['name' => 'gimnasio'],
            ['name' => 'parrilla'],
            ['name' => 'luminoso'],
            ['name' => 'muros perimetrales'],
            ['name' => 'contador de electricidad individual'],
            ['name' => 'garita de seguridad'],
            ['name' => 'piscina cubierta'],
            ['name' => 'agua potable'],
            ['name' => 'alcantarillado'],
            ['name' => 'electricidad'],
            ['name' => 'red de gas natural'],
            ['name' => 'internet / wifi'],
            ['name' => 'televisión'],
            ['name' => 'balcón'],
            ['name' => 'patio'],
            ['name' => 'comedor'],
            ['name' => 'terraza'],
            ['name' => 'aire acondicionado'],
            ['name' => 'amueblado'],
            ['name' => 'alarma'],
            ['name' => 'calefacción'],
            ['name' => 'alumbrado público'],
            ['name' => 'asfalto'],
            ['name' => 'microondas'],
            ['name' => 'lavavajillas'],
            ['name' => 'lavadora'],
            ['name' => 'secadora'],
            ['name' => 'servicios compartidos'],
            ['name' => 'portones eléctricos'],
            ['name' => 'seguridad 24/7'],
            ['name' => 'piscina'],
            ['name' => 'sauna'],
            ['name' => 'bosque'],
        ];

        foreach ($Amenities as $AmenitiesData) {
            Amenity::create($AmenitiesData);
        }
    }
}
