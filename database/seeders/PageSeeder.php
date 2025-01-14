<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pages')->insert([
            [
                'name' => 'Sobre Nosotros',
                'slug' => 'sobre-nosotros',
                'body' => 'Conoce más sobre nuestra empresa, nuestra misión y visión, y el equipo que hace todo posible.',
                'status' => '1', // Activo
                'image' => asset('img/pages/default.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Servicios',
                'slug' => 'servicios',
                'body' => 'Descubre los servicios que ofrecemos para ayudarte a encontrar la propiedad de tus sueños.',
                'status' => '1', // Activo
                'image' => asset('img/pages/default.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Términos y Servicios',
                'slug' => 'terminos-y-servicios',
                'body' => 'Estos son los términos y condiciones que rigen el uso de nuestros servicios. Al utilizar nuestros servicios, usted acepta cumplir con estos términos. Nos reservamos el derecho de modificar estos términos en cualquier momento.',
                'status' => '1', // Activo
                'image' => asset('img/pages/default.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Políticas de Privacidad',
                'slug' => 'politicas-de-privacidad',
                'body' => 'Nuestra política de privacidad describe cómo recopilamos, usamos y protegemos su información personal. Nos comprometemos a proteger su privacidad y a utilizar su información de acuerdo con esta política.',
                'status' => '1', // Activo
                'image' => asset('img/pages/default.jpg'), // Asegúrate de que la imagen exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
