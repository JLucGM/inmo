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
        // Definición de las comodidades y características de las propiedades.
        // Se han añadido más opciones de tecnología, sostenibilidad y servicios.
        // Cada amenity ahora incluye 'icon_svg' con el código SVG de Heroicons (outline, 24x24).
        $Amenities = [
            // Comodidades básicas e infraestructura
            [
                'name' => 'agua potable',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25a.375.375 0 01.375.375v14.25a.375.375 0 01-.75 0V2.625a.375.375 0 01.375-.375zM12 8.25a.375.375 0 01.375.375v5.25a.375.375 0 01-.75 0V8.625a.375.375 0 01.375-.375zM12 14.25a.375.375 0 01.375.375v1.5a.375.375 0 01-.75 0v-1.5a.375.375 0 01.375-.375z" /></svg>' // Cloud (para agua/lluvia).
            ],
            [
                'name' => 'alcantarillado',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H4.875l-.75 1.5H3.75z" /></svg>' // Funnel (para drenaje).
            ],
            [
                'name' => 'electricidad',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75A5.25 5.25 0 001.5 18.75h-3v-2.25A2.25 2.25 0 013 16.5h3.75a.75.75 0 00.75-.75V6.75a3 3 0 016 0v3.75a.75.75 0 001.5 0V12h3v2.25a2.25 2.25 0 01-2.25 2.25h-3v3a.75.75 0 00-.75.75H9v-3a.75.75 0 00-.75-.75H3z" /></svg>' // Bolt.
            ],
            [
                'name' => 'red de gas natural',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L16.5 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>' // Fire (para gas).
            ],
            [
                'name' => 'alumbrado público',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189M12 5.25a5.25 5.25 0 00-5.25 5.25v1.5a5.25 5.25 0 0010.5 0V10.5A5.25 5.25 0 0012 5.25z" /></svg>' // Light-bulb.
            ],
            [
                'name' => 'asfalto',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m-10.5 0h19.5M3 3h18" /></svg>' // Road (adaptado de arrows).
            ],
            [
                'name' => 'internet / wifi',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25a9.764 9.764 0 012.555.337A5.972 5.972 0 0118.59 3.03a5.969 5.969 0 01.474.065 4.48 4.48 0 00-.978 2.025c-.09.457.133.901.467 1.226C20.07 7.822 21 9.811 21 12z" /></svg>' // Wifi.
            ],
            [
                'name' => 'ascensor',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' // Building-office-2 (para ascensor en edificio).
            ],

            // Seguridad y accesos
            [
                'name' => 'seguridad 24/7',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' // Shield-check.
            ],
            [
                'name' => 'garita de seguridad',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.5H4.5m0 0v-4.5m15 4.5H14.25v4.5h5.25m0 0v-4.5m0 4.5H19.5" /></svg>' // Building-office.
            ],
            [
                'name' => 'muros perimetrales',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5M12 5.25V21m-3-15h6" /></svg>' // Rectangle-stack (para muros).
            ],
            [
                'name' => 'portones eléctricos',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5h16.5M3.75 16.5h16.5" /></svg>' // Lock-open (para portones).
            ],
            [
                'name' => 'alarma',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M15 12h3.75M15 15h3.75M21 4.25V21a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 21V4.25a2.25 2.25 0 012.25-2.25H18.75a2.25 2.25 0 012.25 2.25z" /></svg>' // Bell.
            ],
            [
                'name' => 'cámaras de vigilancia',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' // Eye.
            ],
            [
                'name' => 'conserjería/recepción',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 014.5 6h15a.75.75 0 01.75.75v.75m-7.5-3l1.5-1.5m-1.5 1.5l-1.5-1.5m-7.5 6v.75A.75.75 0 004.5 12h15a.75.75 0 01.75.75v.75m-7.5-3l1.5-1.5m-1.5 1.5l-1.5-1.5M12 18.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" /></svg>' // Cog (para servicio/recepción).
            ],

            // Sostenibilidad y Tecnología
            [
                'name' => 'paneles solares',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Sun.
            ],
            [
                'name' => 'punto de carga para vehículos eléctricos',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3M21 3v1.5M18.75 8.25H21M3 21v-1.5M21 21v-1.5M7.5 17.25h10.5M12 2.25v19.5m-9-9h18" /></svg>' // Bolt (para carga eléctrica).
            ],
            [
                'name' => 'sistema de captación de agua de lluvia',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25a.375.375 0 01.375.375v14.25a.375.375 0 01-.75 0V2.625a.375.375 0 01.375-.375zM12 8.25a.375.375 0 01.375.375v5.25a.375.375 0 01-.75 0V8.625a.375.375 0 01.375-.375zM12 14.25a.375.375 0 01.375.375v1.5a.375.375 0 01-.75 0v-1.5a.375.375 0 01.375-.375z" /></svg>' // Cloud (para lluvia).
            ],
            [
                'name' => 'ventanas de doble acristalamiento',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5l16.5-9v18m-16.5 0l16.5 9m0 0V21m0 3v-3m-6-9h4.5" /></svg>' // Window (adaptado de arrows para vidrio).
            ],
            [
                'name' => 'termostato inteligente',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25l3.375-3.375a3.75 3.75 0 11-4.5 5.25l3.375-3.375M15 12a3 3 0 11-6 0 3 3 0 016 0zM4.5 4.5a.75.75 0 00.75.75h15a.75.75 0 000-1.5H5.25a.75.75 0 00-.75.75z" /></svg>' // Thermometer.
            ],
            [
                'name' => 'cerradura inteligente',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' // Lock-closed.
            ],
            [
                'name' => 'iluminación LED',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189M12 5.25a5.25 5.25 0 00-5.25 5.25v1.5a5.25 5.25 0 0010.5 0V10.5A5.25 5.25 0 0012 5.25z" /></svg>' // Light-bulb.
            ],            
            // Espacios interiores y equipamiento
            [
                'name' => 'aire acondicionado',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>' // Wind (para AC).
            ],
            [
                'name' => 'calefacción central',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM5.25 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM18.75 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Fire (para calefacción).
            ],
            [
                'name' => 'amueblado',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.5H4.5m0 0v-4.5m15 4.5H14.25v4.5h5.25m0 0v-4.5m0 4.5H19.5" /></svg>' // Home (para amueblado).
            ],
            [
                'name' => 'cocina equipada',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zM12 19.25l-7.5-7.5V6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.25 6.75v4.5l-7.5 7.5z" /></svg>' // Beaker (para cocina/equipada).
            ],
            [
                'name' => 'despensa',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h19.5a3 3 0 013 3v12a3 3 0 01-3 3H2.25a3 3 0 01-3-3V6a3 3 0 013 3zm1.5 0v6h18V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6z" /></svg>' // Archive (para despensa).
            ],
            [
                'name' => 'walk-in closet',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 12v6m4-6v6m1.5-6V4.25a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 4.25V10M19.5 10V6a2.25 2.25 0 00-2.25-2.25h-.75a2.25 2.25 0 00-2.25 2.25v4" /></svg>' // Shopping-bag (para closet).
            ],
                        [
                'name' => 'chimenea',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM5.25 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM18.75 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Fire.
            ],
            [
                'name' => 'jacuzzi interior',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L16.5 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>' // Sparkles (para burbujas/jacuzzi).
            ],
            [
                'name' => 'oficina / estudio',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 18.361A23.448 23.448 0 0112 22.25 23.448 23.448 0 0119.74 18.36M3.27 6.462A23.448 23.448 0 0112 2.25 23.448 23.448 0 0120.73 6.46M16.5 18.361a23.448 23.448 0 00-3.74 3.89m-7.5-3.89a23.448 23.448 0 00-3.74-3.89M15 14.25a4.5 4.5 0 00-9 0m9 0v3.75m-7.5-3.75a4.5 4.5 0 00-9 0m9 0v3.75" /></svg>' // Academic-cap.
            ],
            [
                'name' => 'sótano',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5C13.5 4.562 15.062 3 16.875 3H18a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25h-5.625A2.25 2.25 0 0112.75 19.5v-1.5a1.125 1.125 0 01-1.125-1.125h-1.5a3.375 3.375 0 00-3.375 3.375v2.625M6 13.125V21" /></svg>' // Arrow-down (para sótano).
            ],

            [
                'name' => 'lavandería',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>' // Swatch (para lavandería).
            ],
            [
                'name' => 'contador de electricidad individual',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75A5.25 5.25 0 001.5 18.75h-3v-2.25A2.25 2.25 0 013 16.5h3.75a.75.75 0 00.75-.75V6.75a3 3 0 016 0v3.75a.75.75 0 001.5 0V12h3v2.25a2.25 2.25 0 01-2.25 2.25h-3v3a.75.75 0 00-.75.75H9v-3a.75.75 0 00-.75-.75H3z" /></svg>' // Bolt.
            ],
            
            // Espacios exteriores y comunes
                        [
                'name' => 'piscina',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L16.5 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>' // Sparkles (para piscina cubierta).
            ],
            [
                'name' => 'garage',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.5H4.5m0 0v-4.5m15 4.5H14.25v4.5h5.25m0 0v-4.5m0 4.5H19.5" /></svg>' // Home (para garaje residencial).
            ],
            [
                'name' => 'estacionamiento de visitas',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5L7.5 3.75m0 0L12 7.5m-4.5 0l4.5 4.5M7.5 15.75l-2.25 2.25m0 0L3.75 21l3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' // Map-pin (para estacionamiento).
            ],
            [
                'name' => 'parrilla / área de BBQ',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM5.25 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM18.75 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Fire (para parrilla/BBQ).
            ],
            [
                'name' => 'balcón',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM6 18.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM15 18.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Arrow-up-right (para balcón exterior).
            ],
            [
                'name' => 'terraza',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L16.5 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>' // Sparkles (para terraza abierta).
            ],
            [
                'name' => 'jardín privado',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25a.75.75 0 01.75.75v12.75a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 8.25a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 14.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" /></svg>' // Cloud (para jardín/lluvia, o leaf si prefieres).
            ],
            [
                'name' => 'sistema de riego automático',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25a.75.75 0 01.75.75v12.75a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 8.25a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 14.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" /></svg>' // Cloud (para riego/lluvia).
            ],
            [
                'name' => 'zona de juegos infantiles',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 006.372-6.369l.001-.003M15 19.128l-3.75-3.75m0 0a3 3 0 01-3-3 3 3 0 00-6 3c0 1.657 1.007 3.082 2.518 3.72m13.5-3.72a3 3 0 00-3-3m0 0a3 3 0 01-3 3 3 3 0 00-3-3m12 0a9.295 9.295 0 00-3.692-3.292 9.295 9.295 0 00-3.292-3.692 3.045 3.045 0 00-3.044 3.044v2.28L9.75 12m6.75 11.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>' // User-group (para niños/juegos).
            ],
            [
                'name' => 'cancha deportiva',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM6 18.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM15 18.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Trophy (para deportiva).
            ],
            [
                'name' => 'sauna',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM5.25 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM18.75 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' // Fire (para sauna/calor).
            ],
            [
                'name' => 'áreas verdes',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.75a.75.75 0 01.75.75v8.19l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l2.47 2.47V3.5a.75.75 0 01.75-.75zM12 18.25a.75.75 0 01.75.75v-8.19l-2.47 2.47a.75.75 0 11-1.06-1.06l3.75-3.75a.75.75 0 011.06 0l3.75 3.75a.75.75 0 11-1.06 1.06L12 10.56v8.19a.75.75 0 01-.75.75z" /></svg>' // Leaf (para bosque/naturaleza).
            ],
            [
                'name' => 'cerca del mar',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25a.75.75 0 01.75.75v14.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 8.25a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 14.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" /></svg>' // Cloud (para mar/agua).
            ],
            [
                'name' => 'cerca de la ciudad',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.5H4.5m0 0v-4.5m15 4.5H14.25v4.5h5.25m0 0v-4.5m0 4.5H19.5" /></svg>' // Building-office (para ciudad).
            ],
            [
                'name' => 'cerca de escuelas',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 18.361A23.448 23.448 0 0112 22.25 23.448 23.448 0 0119.74 18.36M3.27 6.462A23.448 23.448 0 0112 2.25 23.448 23.448 0 0120.73 6.46M16.5 18.361a23.448 23.448 0 00-3.74 3.89m-7.5-3.89a23.448 23.448 0 00-3.74-3.89M15 14.25a4.5 4.5 0 00-9 0m9 0v3.75m-7.5-3.75a4.5 4.5 0 00-9 0m9 0v3.75" /></svg>' // Academic-cap.
            ],
            [
                'name' => 'cerca de hospitales',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-.25-3M8.367 12.8A3 3 0 118.25 9.75m4.5 0a3 3 0 11-4.5 0m4.5 0h.75M8.25 9.75a3 3 0 01-3-3V5.25A3 3 0 018.25 2.25h3.5A3 3 0 0115 5.25v3.75a3 3 0 01-3 3m-6 0h.75m5.25 0H15" /></svg>' // Heart (para salud/hospital).
            ],
            [
                'name' => 'cerca de centros comerciales',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 12v6m4-6v6m1.5-6V4.25a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 4.25V10M19.5 10V6a2.25 2.25 0 00-2.25-2.25h-.75a2.25 2.25 0 00-2.25 2.25v4" /></svg>' // Shopping-bag.
            ],
            [
                'name' => 'cerca de transporte público',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 7.5l16.5-9v18m-16.5 0l16.5 9m0 0V21m0 3v-3m-6-9h4.5" /></svg>' // Map-pin (para transporte).
            ],
            [
                'name' => 'gimnasio',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 006.372-6.369l.001-.003M15 19.128l-3.75-3.75m0 0a3 3 0 01-3-3 3 3 0 00-6 3c0 1.657 1.007 3.082 2.518 3.72m13.5-3.72a3 3 0 00-3-3m0 0a3 3 0 01-3 3 3 3 0 00-3-3m12 0a9.295 9.295 0 00-3.692-3.292 9.295 9.295 0 00-3.292-3.692 3.045 3.045 0 00-3.044 3.044v2.28L9.75 12m6.75 11.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>' // User-group (para gimnasio/grupo).
            ],
            [
                'name' => 'club house',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.5H4.5m0 0v-4.5m15 4.5H14.25v4.5h5.25m0 0v-4.5m0 4.5H19.5" /></svg>' // Home (para club house).
            ],
                        [
                'name' => 'mascotas permitidas',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>' // Heart (para mascotas/pet-friendly).
            ],
            [
                'name' => 'vistas al mar',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' // Eye (para vistas).
            ],
            [
                'name' => 'vistas a la montaña',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' // Eye.
            ],
            [
                'name' => 'accesible para discapacitados',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m0 0H3.75m8.25 0H21" /></svg>' // Cog (para accesibilidad/adaptaciones).
            ],
            [
                'name' => 'rampas y ascensores adaptados',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' // Building-office-2 (para rampas/ascensores).
            ],
            [
                'name' => 'baños adaptados',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5h6.75V7.5a2.25 2.25 0 012.25-2.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-3.75H4.5a2.25 2.25 0 01-2.25-2.25s0-4.5 2.25-4.5z" /></svg>' // Rectangle-stack (para baños).
            ],
            [
                'name' => 'zona de yoga / meditación',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>' // Heart-pulse (para yoga/meditación).
            ]
        ];

        foreach ($Amenities as $AmenitiesData) {
            Amenity::create($AmenitiesData);
        }
    }
}
