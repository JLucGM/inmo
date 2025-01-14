<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('testimonials')->insert([
            [
                'name' => 'Juan Pérez',
                'slug' => 'juan-perez',
                'text' => 'Este es un testimonio de Juan Pérez. Estoy muy satisfecho con el servicio.',
                'avatar' => asset('img/testimonials/juan.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'María López',
                'slug' => 'maria-lopez',
                'text' => 'María López dice: ¡Excelente experiencia! Lo recomiendo al 100%.',
                'avatar' => asset('img/testimonials/maria.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Carlos García',
                'slug' => 'carlos-garcia',
                'text' => 'Carlos García comenta: Un servicio excepcional y un gran equipo.',
                'avatar' => asset('img/testimonials/carla.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
