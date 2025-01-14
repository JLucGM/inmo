<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('faqs')->insert([
            [
                'name' => '¿Qué servicios ofrece la inmobiliaria?',
                'slug' => 'que-servicios-ofrece-la-inmobiliaria',
                'content' => 'Ofrecemos servicios de compra, venta y alquiler de propiedades, así como asesoría legal y financiera.',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '¿Cómo puedo vender mi propiedad?',
                'slug' => 'como-puedo-vender-mi-propiedad',
                'content' => 'Para vender su propiedad, contáctenos y le proporcionaremos una evaluación gratuita y asesoría en el proceso.',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '¿Qué documentos necesito para alquilar una propiedad?',
                'slug' => 'que-documentos-necesito-para-alquilar-una-propiedad',
                'content' => 'Necesitará una identificación válida, comprobante de ingresos y referencias personales.',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '¿Ofrecen financiamiento para la compra de propiedades?',
                'slug' => 'ofrecen-financiamiento-para-la-compra-de-propiedades',
                'content' => 'Sí, trabajamos con varias instituciones financieras para ofrecer opciones de financiamiento a nuestros clientes.',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '¿Cómo puedo programar una visita a una propiedad?',
                'slug' => 'como-puedo-programar-una-visita-a-una-propiedad',
                'content' => 'Puede programar una visita a través de nuestro sitio web o llamándonos directamente a nuestra oficina.',
                'status' => '1', // Activo
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
