<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\StatusContact;
use Illuminate\Database\Seeder;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuscontact = [
            ['name' => 'Borrador',],
            ['name' => 'Revisión',],
            ['name' => 'Publicado',],
            ['name' => 'Archivado',],
            ['name' => 'Publicar',],            
         
        ];

        foreach ($statuscontact as $statuscontactData) {
            Status::create($statuscontactData);
        }
    }
}
