<?php

namespace Database\Seeders;

use App\Models\User;
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
        $this->call(CurrenciesSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(TypesTasksSeeder::class);
        $this->call(CategoryPostSeeder::class);
        $this->call(RolesSeeder::class);

        User::create([
            'name' => 'Jean Gouirand',
            'email' => 'elluc09@gmail.com',
            'password' => bcrypt('123456789'),
            'phone' => '0',
            'status' => '1',
            'avatar' => asset('img/profile/default.jpg'),
        ])->assignRole('super admin');
    }
}
