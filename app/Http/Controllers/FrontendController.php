<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\ContactProperty;
use App\Models\Contacts;
use App\Models\Countries;
use App\Models\Faqs;
use App\Models\Infoweb;
use App\Models\Page;
use App\Models\PhyStates;
use App\Models\Post;
use App\Models\Property;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\States;
use App\Models\Testimonial;
use App\Models\TypesBusinesses;
use App\Models\TypesProperties;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function welcome()
    {
        $setting = Setting::with('currency')->first();
        $slides = Slide::where('status', '1')->get();
        $pages = Page::where('status', '1')->get();
        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user', 'media')->where('status', '1')->take(8)->get();
        $typeProperties = TypesProperties::all();
        $infoweb = Infoweb::take(12)->get();
        $posts = Post::where('status', 1)->take(12)->get();
        $testimonials = Testimonial::orderBy('created_at', 'desc') // Más recientes primero; cambia por 'id' o 'order_column' si prefieres
            ->take(12) // Limita a 12 (envía todos si hay menos)
            ->get();
        $user = User::role('agente')->get();
        // dd($typeProperties);
        return Inertia::render('Welcome', compact('setting', 'slides', 'properties', 'posts', 'infoweb', 'testimonials', 'user', 'pages', 'typeProperties'));
    }

    public function frontendShow(Property $property)
    {
        $property = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user', 'media')->find($property->id);
        $setting = Setting::with('currency')->first();
        $propertyAmenities = $property->amenities;
        $pages = Page::all();
        //  dd('Frontend/Property');
        return Inertia::render('Frontend/Property', compact('property', 'setting', 'propertyAmenities', 'pages'));
    }


    public function blog()
    {
        $setting = Setting::with('currency')->first();
        $posts = Post::with('categoryPost', 'user')->where('status', 1)->get();
        $pages = Page::all();

        return Inertia::render('Frontend/Blog', compact('setting', 'posts', 'pages'));
    }

    public function postsShow($slug)
    {
        $posts = Post::with('categoryPost', 'user')->where('slug', $slug)->firstOrFail(); // Esto lanzará un 404 si no se encuentra el post
        $setting = Setting::with('currency')->first();
        $pages = Page::all();

        // dd($posts);
        // $posts = Post::with('categoryPost', 'user')->where('status', 1)->get();

        return Inertia::render('Frontend/PostShow', compact('setting', 'posts', 'pages'));
    }


    public function faqs()
    {
        $setting = Setting::with('currency')->first();
        $faqs = Faqs::all();
        $pages = Page::all();

        return Inertia::render('Frontend/Faqs', compact('setting', 'faqs', 'pages'));
    }

    public function ContactPage()
    {
        $setting = Setting::with('currency')->first();
        $pages = Page::all();

        return Inertia::render('Frontend/Contact', compact('setting', 'pages'));
    }

    public function pagesShow($slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail(); // Esto lanzará un 404 si no se encuentra el post
        $pages = Page::all(); // Esto lanzará un 404 si no se encuentra el post

        // dd($pages);
        $setting = Setting::with('currency')->first();

        return Inertia::render('Frontend/Pages', compact('setting', 'pages', 'page'));
    }

    public function storeContactPages(Request $request)
    {
        $data = $request->only(
            'name',
            'email',
            'phone',
            'description',
            'types_contacts_id',
            'types_properties_id',
            'status_contacts_id',
            'origin_id',
            'country_id',
            'state_id',
            'city_id',
        );

        $randomUser  = User::whereHas('roles', function ($query) {
            $query->where('name', 'agente');
        })->inRandomOrder()->first();

        if (!$randomUser) {
            throw new \Exception('No se puede crear el contacto: No existen usuarios con rol agente.');
        }

        $data['user_id'] = $randomUser->id;

        Contacts::create($data);
    }

    public function storeContact(Request $request)
    {
        $property = $request->input('property_id');
        $data = $request->only(
            'name',
            'email',
            'phone',
            'description',
            'types_contacts_id',
            'types_properties_id',
            'status_contacts_id',
            'origin_id',
            'user_id',
            'country_id',
            'state_id',
            'city_id',
        );

        // Buscar contacto existente por email
        $contact = Contacts::where('email', $data['email'])->first();

        if (!$contact) {
            // No existe, crear nuevo contacto
            $contact = Contacts::create($data);
        }

        // Verificar si ya existe la relación para evitar duplicados
        $existsRelation = ContactProperty::where('contact_id', $contact->id)
            ->where('property_id', $property)
            ->exists();

        if (!$existsRelation) {
            // Crear la relación solo si no existe
            ContactProperty::create([
                'contact_id' => $contact->id,
                'property_id' => $property,
            ]);
        }
    }


    public function propertiesList()
    {
        $pages = Page::all();
        $setting = Setting::with('currency')->first();
        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user', 'media')->where('status', '1')->get();
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $phyStates = PhyStates::all();
        $typeBusinesses = TypesBusinesses::all();
        $typeProperties = TypesProperties::all(); // Asegúrate de que este modelo exista y esté relacionado
        // dd('Frontend/PropertiesList');
        return Inertia::render('Frontend/PropertiesList', compact('setting', 'pages', 'properties', 'countries', 'states', 'cities', 'phyStates', 'typeBusinesses', 'typeProperties'));
    }

    public function typePropertiesList($slug)
    {
        $pages = Page::all();
        $setting = Setting::with('currency')->first();

        $typeProperty = TypesProperties::where('slug', $slug)->firstOrFail();

        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user', 'media')
            ->where('status', '1')
            ->where('types_properties_id', $typeProperty->id)
            ->get();

        // Pasar filtro para que React lo use
        $filters = ['typeProperty' => $typeProperty->id];

        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $phyStates = PhyStates::all();
        $typeBusinesses = TypesBusinesses::all();
        $typeProperties = TypesProperties::all();

        return Inertia::render('Frontend/PropertiesList', compact(
            'setting',
            'pages',
            'properties',
            'countries',
            'states',
            'cities',
            'phyStates',
            'typeBusinesses',
            'typeProperties',
            'filters'
        ));
    }
}
