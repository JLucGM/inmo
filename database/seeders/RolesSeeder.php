<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rolSuperAdmin = Role::firstOrCreate(['name' => 'super admin'], ['slug' => 'super-admin']);
        $rolAdmin = Role::firstOrCreate(['name' => 'admin'], ['slug' => 'admin']);
        $rolAgente = Role::firstOrCreate(['name' => 'agente'], ['slug' => 'agente']);
        $rolEditor = Role::firstOrCreate(['name' => 'editor'], ['slug' => 'editor']);

        Permission::firstOrCreate(['name' => 'admin.dashboard.charts'], ['description' => 'Ver graficos del dashboard'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.user.index'], ['description' => 'Ver lista de usuarios'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.user.create'], ['description' => 'Crear usuarios'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.user.edit'], ['description' => 'Editar usuarios'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.user.delete'], ['description' => 'Eliminar usuarios'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.role.index'], ['description' => 'Ver lista de roles'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.role.create'], ['description' => 'Crear roles'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.role.edit'], ['description' => 'Editar roles'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.role.delete'], ['description' => 'Eliminar roles'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.properties.index'], ['description' => 'Ver lista de propiedades'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.properties.create'], ['description' => 'Crear propiedades'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.properties.edit'], ['description' => 'Editar propiedades'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.properties.delete'], ['description' => 'Eliminnar propiedades'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);

        Permission::firstOrCreate(['name' => 'admin.rentals.index'], ['description' => 'Ver lista de rentas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.rentals.create'], ['description' => 'Crear rentas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.rentals.edit'], ['description' => 'Editar rentas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.rentals.delete'], ['description' => 'Eliminar rentas'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.categoriesPost.index'], ['description' => 'Ver lista de categorias'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.categoriesPost.create'], ['description' => 'Crear categorias'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.categoriesPost.edit'], ['description' => 'Editar categorias'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.categoriesPost.delete'], ['description' => 'Eliminar categorias'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);

        Permission::firstOrCreate(['name' => 'admin.countries.index'], ['description' => 'Ver lista de paises'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.countries.create'], ['description' => 'Crear paises'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.countries.edit'], ['description' => 'Editar paises'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.countries.delete'], ['description' => 'Eliminar paises'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.states.index'], ['description' => 'Ver lista de estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.states.create'], ['description' => 'Crear estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.states.edit'], ['description' => 'Editar estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.states.delete'], ['description' => 'Eliminar estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.cities.index'], ['description' => 'Ver lista de ciudades'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.cities.create'], ['description' => 'Crear estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.cities.edit'], ['description' => 'Editar estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.cities.delete'], ['description' => 'Eliminar estados'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.contactos.index'], ['description' => 'Ver lista de contactos'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.contactos.create'], ['description' => 'Crear contactos'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.contactos.edit'], ['description' => 'Editar contactos'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        Permission::firstOrCreate(['name' => 'admin.contactos.delete'], ['description' => 'Eliminar contactos'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);

        Permission::firstOrCreate(['name' => 'admin.tasks.index'], ['description' => 'Ver lista de tareas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.tasks.create'], ['description' => 'Crear tareas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.tasks.edit'], ['description' => 'Editar tareas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.tasks.delete'], ['description' => 'Eliminar tareas'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.tasks.calendary'], ['description' => 'Ver agenda'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente, $rolEditor]);

        Permission::firstOrCreate(['name' => 'admin.slides.index'], ['description' => 'Ver lista de slides'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.slides.create'], ['description' => 'Crear slides'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.slides.edit'], ['description' => 'Editar slides'])->syncRoles([$rolSuperAdmin, $rolAdmin]);
        Permission::firstOrCreate(['name' => 'admin.slides.delete'], ['description' => 'Eliminar slides'])->syncRoles([$rolSuperAdmin, $rolAdmin]);

        Permission::firstOrCreate(['name' => 'admin.info-webs.index'], ['description' => 'Ver lista de información principal'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.info-webs.create'], ['description' => 'Crear informacion'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.info-webs.edit'], ['description' => 'Editar información principal'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.info-webs.delete'], ['description' => ''])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.testimonials.index'], ['description' => 'Ver lista de testimonios'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.testimonials.create'], ['description' => 'Crear testimonios'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.testimonials.edit'], ['description' => 'Editar testimonios'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.testimonials.delete'], ['description' => 'Eliminar testimonios'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.setting-generals.index'], ['description' => 'Ver configuración general'])->syncRoles([$rolSuperAdmin]);
        // Permission::firstOrCreate(['name' => 'admin.setting-generals.create'], ['description' => 'Crear configuración general'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.setting-generals.edit'], ['description' => 'Editar configuración general'])->syncRoles([$rolSuperAdmin]);
        // Permission::firstOrCreate(['name' => 'admin.setting-generals.delete'], ['description' => 'Eliminar configuración general'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.amenities-checks.index'], ['description' => 'Ver lista de comididades'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.amenities-checks.create'], ['description' => 'Crear comodidades'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.amenities-checks.edit'], ['description' => 'Editar comodidades'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.amenities-checks.delete'], ['description' => 'Eliminar comodidades'])->syncRoles([$rolSuperAdmin]);

        // Permission::firstOrCreate(['name' => 'admin.negocios.index'], ['description' => 'Ver lista de negocios'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        // Permission::firstOrCreate(['name' => 'admin.negocios.create'], ['description' => 'Crear negocios'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        // Permission::firstOrCreate(['name' => 'admin.negocios.edit'], ['description' => 'Editar negocios'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);
        // Permission::firstOrCreate(['name' => 'admin.negocios.delete'], ['description' => 'Eliminar negocios'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolAgente]);

        Permission::firstOrCreate(['name' => 'admin.posts.index'], ['description' => 'Ver lista de posts'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.posts.create'], ['description' => 'Crear posts'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.posts.edit'], ['description' => 'Editar posts'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        Permission::firstOrCreate(['name' => 'admin.posts.delete'], ['description' => 'Eliminar posts'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);

        // Permission::firstOrCreate(['name' => 'admin.tags.index'], ['description' => 'Ver lista de tags'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        // Permission::firstOrCreate(['name' => 'admin.tags.create'], ['description' => 'Crear tags'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        // Permission::firstOrCreate(['name' => 'admin.tags.edit'], ['description' => 'Editar tags'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);
        // Permission::firstOrCreate(['name' => 'admin.tags.delete'], ['description' => 'Eliminar tags'])->syncRoles([$rolSuperAdmin, $rolAdmin, $rolEditor]);

        Permission::firstOrCreate(['name' => 'admin.faqs.index'], ['description' => 'Ver lista de faqs'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.faqs.create'], ['description' => 'Crear faqs'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.faqs.edit'], ['description' => 'Editar faqs'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.faqs.delete'], ['description' => 'Eliminar faqs'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.pages.index'], ['description' => 'Ver lista de páginas'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.pages.create'], ['description' => 'Crear páginas'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.pages.edit'], ['description' => 'Editar páginas'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.pages.delete'], ['description' => 'Eliminar páginas'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.phystates.index'], ['description' => 'Ver lista de estado fisico'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.phystates.create'], ['description' => 'Crear estado fisico'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.phystates.edit'], ['description' => 'Editar estado fisico'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.phystates.delete'], ['description' => 'Eliminar estado fisico'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.typebusiness.index'], ['description' => 'Ver lista de tipo de negocio'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.typebusiness.create'], ['description' => 'Crear tipo de negocio'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.typebusiness.edit'], ['description' => 'Editar tipo de negocio'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.typebusiness.delete'], ['description' => 'Eliminar tipo de negocio'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.typesProperties.index'], ['description' => 'Ver lista de tipo de negocio'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.typesProperties.create'], ['description' => 'Crear tipo de negocio'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.typesProperties.edit'], ['description' => 'Editar tipo de negocio'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.typesProperties.delete'], ['description' => 'Eliminar tipo de negocio'])->syncRoles([$rolSuperAdmin]);

        // Permission::firstOrCreate(['name' => 'admin.popups.index'], ['description' => 'Ver lista de popups'])->syncRoles([$rolSuperAdmin]);
        // Permission::firstOrCreate(['name' => 'admin.popups.create'], ['description' => 'Crear popups'])->syncRoles([$rolSuperAdmin]);
        // Permission::firstOrCreate(['name' => 'admin.popups.edit'], ['description' => 'Editar popups'])->syncRoles([$rolSuperAdmin]);
        // Permission::firstOrCreate(['name' => 'admin.popups.delete'], ['description' => 'Eliminar popups'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.customerstype.index'], ['description' => 'Ver lista de tipo de cliente'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.customerstype.create'], ['description' => 'Crear tipo de cliente'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.customerstype.edit'], ['description' => 'Editar tipo de cliente'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.customerstype.delete'], ['description' => 'Eliminar tipo de cliente'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.origin.index'], ['description' => 'Ver lista de medio de captación'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.origin.create'], ['description' => 'Crear medio de captación'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.origin.edit'], ['description' => 'Editar medio de captación'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.origin.delete'], ['description' => 'Eliminar medio de captación'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.statuscontact.index'], ['description' => 'Ver lista de status de contacto'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.statuscontact.create'], ['description' => 'Crear status de contacto'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.statuscontact.edit'], ['description' => 'Editar status de contacto'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.statuscontact.delete'], ['description' => 'Eliminar status de contacto'])->syncRoles([$rolSuperAdmin]);

        Permission::firstOrCreate(['name' => 'admin.documents.index'], ['description' => 'Ver lista de documentos'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.documents.create'], ['description' => 'Crear documentos'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.documents.edit'], ['description' => 'Editar documentos'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.documents.delete'], ['description' => 'Eliminar documentos'])->syncRoles([$rolSuperAdmin]);
        Permission::firstOrCreate(['name' => 'admin.documents.pdf'], ['description' => 'Descargar pdf de documentos'])->syncRoles([$rolSuperAdmin]);
    }
}
