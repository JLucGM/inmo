<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AmenitiesSeeder::class);
        $this->call(TypesPropertiesSeeder::class);
        $this->call(PhyStateSeeder::class);
        $this->call(CountriesSeeder::class);
        $this->call(StatesSeeder::class);
        $this->call(CitiesSeeder::class);
        $this->call(StatusContactsSeeder::class);
        $this->call(OriginsSeeder::class);
        $this->call(TypeBusinessSeeder::class);
        $this->call(StatusesSeeder::class);
        $this->call(TypesContactsSeeder::class);
    }
}
