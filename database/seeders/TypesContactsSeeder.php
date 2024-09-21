<?php

namespace Database\Seeders;

use App\Models\TypesContacts;
use Illuminate\Database\Seeder;

class TypesContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'client'],
            ['name' => 'owner'],
            ['name' => 'tenant'],
        ];

        foreach ($data as $TypeBusiness) {
            TypesContacts::create($TypeBusiness);
        }
    }
}
