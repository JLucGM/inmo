<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrenciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currencies = [
            [
                'name' => 'Peso argentino',
                'slug' => 'ars',
                'code' => 'ARS',
                'symbol' => '$',
            ],
            [
                'name' => 'Boliviano',
                'slug' => 'bob',
                'code' => 'BOB',
                'symbol' => 'Bs',
            ],
            [
                'name' => 'Real',
                'slug' => 'brl',
                'code' => 'BRL',
                'symbol' => 'R$',
            ],
            [
                'name' => 'Unidad de fomento',
                'slug' => 'clf',
                'code' => 'CLF',
                'symbol' => 'UF',
            ],
            [
                'name' => 'Peso chileno',
                'slug' => 'clp',
                'code' => 'CLP',
                'symbol' => '$',
            ],
            [
                'name' => 'Peso colombiano',
                'slug' => 'cop',
                'code' => 'COP',
                'symbol' => '$',

            ],
            [
                'name' => 'Colones',
                'slug' => 'crc',
                'code' => 'CRC',
                'symbol' => '₡',
            ],
            [
                'name' => 'Peso cubano convertible',
                'slug' => 'cuc',
                'code' => 'CUC',
                'symbol' => '',
            ],
            [
                'name' => 'Peso cubano',
                'slug' => 'cup',
                'code' => 'CUP',
                'symbol' => '$',
            ],
            [
                'name' => 'Peso dominicano',
                'slug' => 'dop',
                'code' => 'DOP',
                'symbol' => '$',
            ],
            [
                'name' => 'Euro',
                'slug' => 'eur',
                'code' => 'EUR',
                'symbol' => '€',
            ],
            [
                'name' => 'Quetzal guatemalteco',
                'slug' => 'gtq',
                'code' => 'GTQ',
                'symbol' => 'Q',
            ],
            [
                'name' => 'Lempira',
                'slug' => 'hnl',
                'code' => 'HNL',
                'symbol' => 'L',
            ],
            [
                'name' => 'Peso mexicano',
                'slug' => 'mxn',
                'code' => 'MXN',
                'symbol' => '$',
            ],
            [
                'name' => 'Cordoba',
                'slug' => 'nio',
                'code' => 'NIO',
                'symbol' => 'C$',
            ],
            [
                'name' => 'Balboa',
                'slug' => 'pab',
                'code' => 'PAB',
                'symbol' => 'B/',
            ],
            [
                'name' => 'Soles',
                'slug' => 'pen',
                'code' => 'PEN',
                'symbol' => 'S/',
            ],
            [
                'name' => 'Guarani',
                'slug' => 'pyg',
                'code' => 'PYG',
                'symbol' => '₲',
            ],
            [
                'name' => 'Dolar',
                'slug' => 'usd',
                'code' => 'USD',
                'symbol' => 'U$S',
            ],
            [
                'name' => 'Peso uruguayo',
                'slug' => 'uyu',
                'code' => 'UYU',
                'symbol' => '$',
            ],
            [
                'name' => 'Bolivar',
                'slug' => 'ves',
                'code' => 'VES',
                'symbol' => 'Bs.',
            ],
        ];

        foreach ($currencies as $currencyData) {
            Currency::create($currencyData);
        }
    }
}
