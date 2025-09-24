<?php

namespace Database\Seeders;

use App\Models\Origin;
use App\Models\Origins;
use Illuminate\Database\Seeder;

class OriginsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $origin = [
            ['name' => 'Sin medios'],
            ['name' => 'Página web'],
            ['name' => 'Correo electrónico'],
            ['name' => 'Teléfono'],
        ];

        foreach ($origin as $originData) {
            Origins::create($originData);
        }
    }
}
