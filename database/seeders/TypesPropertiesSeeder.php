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
            ['name' => 'Casa', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Apartamento', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Oficina', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Bodega', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Tienda', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Casa Adosada', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Terreno/Lote', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Lote Comercial', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Finca', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Chalet', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Casa de Campo', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Hoteles', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Apartamento Estudio', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Edificio', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Terreno en la Playa', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Hostal', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Condominio', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Dúplex', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Ático', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Bungalow', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Cabaña', 'image' => asset('img/typeProperties/default.jpg')],
            ['name' => 'Garaje', 'image' => asset('img/typeProperties/default.jpg')],
        ];

        foreach ($data as $TypesPropertiesData) {
            TypesProperties::create($TypesPropertiesData);
        }
    }
}
