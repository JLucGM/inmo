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
            ['name' => 'draft',],            
            ['name' => 'publish',],            
         
        ];

        foreach ($statuscontact as $statuscontactData) {
            Status::create($statuscontactData);
        }
    }
}
