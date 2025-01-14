<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('slides')->insert([
            [
                'name' => 'Slide 1',
                'slug' => 'slide-1',
                'image' => asset('img/slides/slide1.png'), // Asegúrate de que la imagen exista
                'text' => 'Este es el texto del slide 1.',
                'link' => 'https://example.com/slide1',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Slide 2',
                'slug' => 'slide-2',
                'image' => asset('img/slides/slide2.jpg'), // Asegúrate de que la imagen exista
                'text' => 'Este es el texto del slide 2.',
                'link' => 'https://example.com/slide2',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Slide 3',
                'slug' => 'slide-3',
                'image' => asset('img/slides/slide3.jpg'), // Asegúrate de que la imagen exista
                'text' => 'Este es el texto del slide 3.',
                'link' => 'https://example.com/slide3',
                'status' => '0', // Inactivo
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
