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
            ['name' => 'new',],            
            ['name' => 'in progress',],            
            ['name' => 'converted',],            
            ['name' => 'recovered',],            
            ['name' => 'lost',],            
        ];

        foreach ($statuscontact as $statuscontactData) {
            StatusContact::create($statuscontactData);
        }
    }
}
