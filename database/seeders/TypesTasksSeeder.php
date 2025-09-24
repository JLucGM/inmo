<?php

namespace Database\Seeders;

use App\Models\TypeTasks;
use Illuminate\Database\Seeder;

class TypesTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'Evento'],
            ['name' => 'Reunión'],
            ['name' => 'Llamada'],
            ['name' => 'Correo electrónico'],
            ['name' => 'Tarea'],
            ['name' => 'Recordatorio'],
            ['name' => 'Otro'],
        ];

        foreach ($data as $typetask) {
            TypeTasks::create($typetask);
        }
    }
}
