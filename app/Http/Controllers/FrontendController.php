<?php

namespace App\Http\Controllers;

use App\Models\Cities;
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
        $slides = Slide::where('status', '1')->first();
        $pages = Page::where('status', '1')->get();
        $properties =Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user')->where('status', '1')->take(8)->get();
        $infoweb = Infoweb::all();
        $testimonials = Testimonial::all();
        $user = User::all();
// dd($pages);
        return Inertia::render('Welcome', compact('setting', 'slides', 'properties', 'infoweb', 'testimonials', 'user','pages'));
    }

    public function frontendShow(Property $property)
    {
        $property = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user')->find($property->id);
        $setting = Setting::with('currency')->first();
        $images = json_decode($property->images);
        $propertyAmenities = $property->amenities;
        $pages = Page::all();
        //  dd( $setting->currency);
        return Inertia::render('Frontend/Property', compact('property', 'setting', 'images', 'propertyAmenities','pages'));
    }

    
    public function blog()
    {
        $setting = Setting::with('currency')->first();
        $posts = Post::with('categoryPost', 'user')->where('status', 1)->get();
        $pages = Page::all();
        
        return Inertia::render('Frontend/Blog', compact('setting', 'posts','pages'));
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

        return Inertia::render('Frontend/Contact', compact('setting','pages'));

    }
    
    public function pagesShow($slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail(); // Esto lanzará un 404 si no se encuentra el post
        $pages = Page::all(); // Esto lanzará un 404 si no se encuentra el post

        // dd($pages);
        $setting = Setting::with('currency')->first();

        return Inertia::render('Frontend/Pages', compact('setting','pages','page'));

    }

    public function storeContactPages(Request $request)
    {
        //  dd($request, $property);
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

        Contacts::create($data);
    }
    
    public function storeContact(Request $request, $property)
    {
        //  dd($request, $property);
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

        Contacts::create($data);
    }

    public function propertiesList()
    {
        $pages = Page::all();
        $setting = Setting::with('currency')->first();
        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user')->where('status', '1')->get();
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $phyStates = PhyStates::all();
        $typeBusinesses = TypesBusinesses::all();
        $typeProperties = TypesProperties::all(); // Asegúrate de que este modelo exista y esté relacionado
        
        return Inertia::render('Frontend/PropertiesList', compact('setting','pages','properties','countries','states','cities','phyStates','typeBusinesses','typeProperties'));

    }

}
