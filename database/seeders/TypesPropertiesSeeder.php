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
            ['name' => 'house', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'apartment' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'office' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'warehouses' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'stores' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'townhouse' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'plot/land' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'commercial lot' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'farm' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'chalet' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'country house' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'hotels' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'studio apartment' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'building' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'beach plot' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'hostel' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'condominium' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'duplex' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'office' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'penthouse' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'bungalow' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'cabin' , 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'garage' , 'image' => asset('img/typeProperties/default.jpg')],
        ];

        foreach ($data as $TypesPropertiesData) {
            TypesProperties::create($TypesPropertiesData);
        }
    }
}
