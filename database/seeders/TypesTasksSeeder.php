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
            ['name' => 'event'],
            ['name' => 'meeting'],
        ];

        foreach ($data as $typetask) {
            TypeTasks::create($typetask);
        }
    }
}
