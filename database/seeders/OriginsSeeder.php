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
            ['name' => 'no means'],                      
            ['name' => 'web'],                      
            ['name' => 'email'],                      
            ['name' => 'phone'],                      
        ];

        foreach ($origin as $originData) {
            Origins::create($originData);
        }
    }
    }
