<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmenitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Amenities = [
            ['name' =>'pets allowed'],
            ['name' =>'swimming pool'],
            ['name' =>'garage'],
            ['name' =>'gym'],
            ['name' => 'grill'],
            ['name' => 'bright'],
            ['name' => 'perimeter walls'],
            ['name' => 'individual electric meter'],
            ['name' => 'security booth'],
            ['name' => 'indoor pool'],
            ['name' => 'running water'],
            ['name' => 'sewer'],
            ['name' => 'electricity'],
            ['name' => 'natural gas network'],
            ['name' => 'internet / wifi'],
            ['name' => 'television'],
            ['name' => 'balcony'],
            ['name' => 'patio'],
            ['name' => 'dining room'],
            ['name' => 'terrace'],
            ['name' => 'air conditioning'],
            ['name' => 'furnished'],
            ['name' => 'alarm'],
            ['name' => 'heating'],
            ['name' => 'public lighting'],
            ['name' => 'asphalt'],
            ['name' => 'microwave'],
            ['name' => 'dishwasher'],
            ['name' => 'washing machine'],
            ['name' => 'dryer'],
            ['name' => 'shared services'],
            ['name' => 'electric gates'],
            ['name' => '24/7 security'],
            ['name' => 'swimming pool'],
            ['name' => 'sauna'],
            ['name' => 'forest'],
        ];

        foreach ($Amenities as $AmenitiesData) {
            Amenity::create($AmenitiesData);
        }
    }
}
