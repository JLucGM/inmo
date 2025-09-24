<?php

namespace Database\Seeders;

use App\Models\PhyState;
use App\Models\PhyStates;
use Illuminate\Database\Seeder;

class PhyStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'Usado'],
            ['name' => 'Reformado'],
            ['name' => 'A estrenar'],
            ['name' => 'En construcción'],
            ['name' => 'Nuevo'],
            ['name' => 'Antiguo'],
            ['name' => 'Obra nueva'],
            ['name' => 'A rehabilitar'],
            ['name' => 'Para reformar'],
            ['name' => 'Buen estado'],
            ['name' => 'Excelente estado'],
            ['name' => 'A reformar'],
        ];

        foreach ($data as $PhyState) {
            PhyStates::create($PhyState);
        }
    }
}
