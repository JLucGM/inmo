<?php

namespace Database\Seeders;

use App\Models\Estado;
use App\Models\Countries;
use App\Models\States;
use Illuminate\Database\Seeder;

class StatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Estados
        $estados = [
            // Crear los estados de Venezuela
            ['name' => 'Amazonas', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Anzoátegui', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Apure', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Aragua', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Barinas', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Bolívar', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Carabobo', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Cojedes', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Delta Amacuro', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Distrito Capital', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Falcón', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Guárico', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Lara', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Mérida', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Miranda', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Monagas', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Nueva Esparta', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Portuguesa', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Sucre', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Táchira', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Trujillo', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'La Guaira', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Yaracuy', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Zulia', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Distrito Capital', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],
            ['name' => 'Dependencias Federales', 'country_id' => Countries::where('name', 'Venezuela')->first()->id],

            // Crear los estados de República Dominicana
            ['name' => 'Azua', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Bahoruco', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Barahona', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Dajabón', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Duarte', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'El Seibo', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Elías Piña', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Espaillat', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Hato Mayor', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Hermanas Mirabal', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Independencia', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'La Altagracia', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'La Romana', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'La Vega', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'María Trinidad Sánchez', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Monseñor Nouel', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Monte Cristi', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Monte Plata', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Pedernales', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Peravia', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Puerto Plata', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Sánchez Ramírez', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'San Cristóbal', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'San José de Ocoa', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'San Juan', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'San Pedro de Macorís', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Santiago', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Santiago Rodríguez', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Santo Domingo', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
            ['name' => 'Valverde', 'country_id' => Countries::where('name', 'República Dominicana')->first()->id],
        ];


        foreach ($estados as $estado) {
            States::create($estado);
        }
    
    }
}
