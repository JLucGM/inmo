<?php

namespace Database\Seeders;

use App\Models\StatusContact;
use Illuminate\Database\Seeder;

class StatusContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuscontact = [
            ['name' => 'Nuevo'],
            ['name' => 'En progreso'],
            ['name' => 'Convertido'],
            ['name' => 'Recuperado'],
            ['name' => 'Perdido'],
            ['name' => 'Finalizado'],
        ];

        foreach ($statuscontact as $statuscontactData) {
            StatusContact::create($statuscontactData);
        }
    }
}
