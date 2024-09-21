<?php

namespace Database\Seeders;

use App\Models\Countries;
use Illuminate\Database\Seeder;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $countries = [
            ['name' => 'Venezuela'],
            ['name' => 'República Dominicana'],
        ];
        
        foreach ($countries as $country) {
            Countries::create($country);
        } 
    }
}
