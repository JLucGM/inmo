<?php

namespace Database\Seeders;

use App\Models\CategoryPost;
use Illuminate\Database\Seeder;

class CategoryPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categorias = [
            [
                'name' => 'Sin categoria',
            ],            
        ];

        foreach ($categorias as $categoriasData) {
            CategoryPost::create($categoriasData);
        }
    }
}
