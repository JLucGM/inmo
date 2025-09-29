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
            ['name' => 'Casa', 'image' => asset('img/typeProperties/casa.png')],
            ['name' => 'Apartamento', 'image' => asset('img/typeProperties/apartamento.png')],
            ['name' => 'Oficina', 'image' => asset('img/typeProperties/oficina.png')],
            ['name' => 'Bodega', 'image' => asset('img/typeProperties/bodega.png')],
            ['name' => 'Tienda', 'image' => asset('img/typeProperties/tienda.png')],
            ['name' => 'Casa Adosada', 'image' => asset('img/typeProperties/casaaadosada.png')],
            ['name' => 'Terreno/Lote', 'image' => asset('img/typeProperties/terrenolote.png')],
            ['name' => 'Lote Comercial', 'image' => asset('img/typeProperties/lotecomercial.png')],
            ['name' => 'Finca', 'image' => asset('img/typeProperties/finca.jpg')],
            ['name' => 'Chalet', 'image' => asset('img/typeProperties/chalet.png')],
            ['name' => 'Casa de Campo', 'image' => asset('img/typeProperties/casacampo.png')],
            ['name' => 'Hoteles', 'image' => asset('img/typeProperties/hotel.png')],
            ['name' => 'Apartamento Estudio', 'image' => asset('img/typeProperties/apartamentoestudio.png')],
            ['name' => 'Edificio', 'image' => asset('img/typeProperties/edificio.png')],
            ['name' => 'Terreno en la Playa', 'image' => asset('img/typeProperties/playa.jpg')],
            ['name' => 'Hostal', 'image' => asset('img/typeProperties/hostal.jpg')],
            ['name' => 'Condominio', 'image' => asset('img/typeProperties/condominio.jpg')],
            ['name' => 'Dúplex', 'image' => asset('img/typeProperties/duplex.jpg')],
            ['name' => 'Ático', 'image' => asset('img/typeProperties/atico.jpg')],
            ['name' => 'Bungalow', 'image' => asset('img/typeProperties/bungalow.jpg')],
            ['name' => 'Cabaña', 'image' => asset('img/typeProperties/cabana.jpg')],
            ['name' => 'Garaje', 'image' => asset('img/typeProperties/garaje.jpg')],
        ];

        foreach ($data as $TypesPropertiesData) {
            TypesProperties::create($TypesPropertiesData);
        }
    }
}
