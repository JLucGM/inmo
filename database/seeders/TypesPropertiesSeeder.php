<?php

namespace Database\Seeders;

use App\Models\TipoPropiedad;
use App\Models\TypesProperties;
use Illuminate\Database\Seeder;

class TypesPropertiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'house'],
            ['name' => 'apartment'],
            ['name' => 'office'],
            ['name' => 'warehouses'],
            ['name' => 'stores'],
            ['name' => 'townhouse'],
            ['name' => 'plot/land'],
            ['name' => 'commercial lot'],
            ['name' => 'farm'],
            ['name' => 'chalet'],
            ['name' => 'country house'],
            ['name' => 'hotels'],
            ['name' => 'studio apartment'],
            ['name' => 'building'],
            ['name' => 'beach plot'],
            ['name' => 'hostel'],
            ['name' => 'condominium'],
            ['name' => 'duplex'],
            ['name' => 'office'],
            ['name' => 'penthouse'],
            ['name' => 'bungalow'],
            ['name' => 'cabin'],
            ['name' => 'garage'],
        ];

        foreach ($data as $TypesPropertiesData) {
            TypesProperties::create($TypesPropertiesData);
        }
    }
}
