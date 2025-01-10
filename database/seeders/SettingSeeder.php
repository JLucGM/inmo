<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\SettingGeneral;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settingGeneral = [
            [
                'name' => 'Inmobilia2',
                'currency_id' => 1,
                'logo' => asset('img/setting/default.png'), // URL completa para el logo
                'logo_footer' => asset('img/setting/default.png'), // URL completa para el logo del pie de página
                'favicon' => asset('img/setting/favicon.ico'),
                'phone' => '+58 424-290-9870',
                'direction' => 'Av. Américo Vespucio, CC Caribean Mall C3-105',
                'email' => 'soporte@softandnet.com',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                'portadaBlog' => asset('img/setting/banner-propertie2.png'),
                'portadaFaq' => asset('img/setting/banner-propertie2.png'),
                'portadaContact' => asset('img/setting/banner-propertie2.png'),
                'portadaAnunciar' => asset('img/setting/banner-propertie2.png'),
                'titleBlog' => 'Blog',
                'titleFaq' => 'FAQ',
                'titleContact' => 'Contact',
                'titleAnunciar' => 'Publish property',
                'descriptionBlog' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                'descriptionFaq' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                'descriptionContact' => 'Su portal de propiedades inmobiliarias de confianza.',
                'descriptionAnunciar' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                // 'facebook' => 'www.facebook.com',
                // 'twitter' => 'www.twitter.com',
                'instagram' => 'knots.agency',
                // 'linkedin' => 'www.linkedin.com',
                'titleInfoSection' => 'Información de la sección',
            'descriptionInfoSection' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
            'titleTeamSection' => 'Equipo de trabajo',
            'descriptionTeamSection' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
            ],
        ];

        foreach ($settingGeneral as $settingGeneralData) {
            Setting::create($settingGeneralData);
        }
    }
}
