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
                'logo' => 'default.png',
                'logo_footer' => 'default.png',
                'favicon' => 'favicon.ico',
                'phone' => '+58 424-290-9870',
                'direction' => 'Av. Américo Vespucio, CC Caribean Mall C3-105',
                'email' => 'soporte@softandnet.com',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                // 'portadaBlog' => 'banner-propertie2.png',
                // 'portadaFaq' => 'banner-propertie2.png',
                // 'portadaContact' => 'banner-propertie2.png',
                // 'portadaAnunciar' => 'banner-propertie2.png',
                // 'titleBlog' => 'Blog',
                // 'titleFaq' => 'FAQ',
                // 'titleContact' => 'Contact',
                // 'titleAnunciar' => 'Publish property',
                // 'descriptionBlog' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                // 'descriptionFaq' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                // 'descriptionContact' => 'Su portal de propiedades inmobiliarias de confianza.',
                // 'descriptionAnunciar' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum bibendum augue, maximus lacinia nisl tempus non.',
                // 'facebook' => 'www.facebook.com',
                // 'twitter' => 'www.twitter.com',
                // 'instagram' => 'https://www.instagram.com/knots.agency/',
                // 'linkedin' => 'www.linkedin.com',
            ],
        ];

        foreach ($settingGeneral as $settingGeneralData) {
            Setting::create($settingGeneralData);
        }
    }
}
