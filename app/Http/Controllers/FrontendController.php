<?php

namespace App\Http\Controllers;

use App\Http\Requests\Frontend\StoreContactRequest;
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
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    private function getSetting()
    {
        return Cache::remember('frontend_setting', 3600, function () {
            return Setting::with('currency')->first();
        });
    }

    private function getActivePages()
    {
        return Cache::remember('frontend_pages', 3600, function () {
            return Page::where('status', '1')->get();
        });
    }

    public function welcome(): Response
    {
        $setting = $this->getSetting();
        $slides = Slide::where('status', '1')->get();
        $pages = $this->getActivePages();
        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user', 'media')->where('status', '1')->take(8)->get();
        $typeProperties = TypesProperties::all();
        $infoweb = Infoweb::take(12)->get();
        $posts = Post::where('status', 1)->take(12)->get();
        $testimonials = Testimonial::orderBy('created_at', 'desc')
            ->take(12)
            ->get();
        $user = User::whereHas('roles', function ($query) {
            $query->where('name', 'agente');
        })->get();

        return Inertia::render('Welcome', compact('setting', 'slides', 'properties', 'posts', 'infoweb', 'testimonials', 'user', 'pages', 'typeProperties'));
    }

    public function frontendShow(Property $property): Response
    {
        $property = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user', 'media')->find($property->id);
        $setting = $this->getSetting();
        $propertyAmenities = $property->amenities;
        $pages = $this->getActivePages();
        return Inertia::render('Frontend/Property', compact('property', 'setting', 'propertyAmenities', 'pages'));
    }


    public function blog(): Response
    {
        $setting = $this->getSetting();
        $posts = Post::with('categoryPost', 'user')->where('status', 1)->get();
        $pages = $this->getActivePages();

        return Inertia::render('Frontend/Blog', compact('setting', 'posts', 'pages'));
    }

    public function postsShow($slug): Response
    {
        $posts = Post::with('categoryPost', 'user')->where('slug', $slug)->firstOrFail();
        $setting = $this->getSetting();
        $pages = $this->getActivePages();

        return Inertia::render('Frontend/PostShow', compact('setting', 'posts', 'pages'));
    }


    public function faqs(): Response
    {
        $setting = $this->getSetting();
        $faqs = Faqs::all();
        $pages = $this->getActivePages();

        return Inertia::render('Frontend/Faqs', compact('setting', 'faqs', 'pages'));
    }

    public function ContactPage(): Response
    {
        $setting = $this->getSetting();
        $pages = $this->getActivePages();

        return Inertia::render('Frontend/Contact', compact('setting', 'pages'));
    }

    public function pagesShow($slug): Response
    {
        $page = Page::where('slug', $slug)->firstOrFail();
        $pages = $this->getActivePages();
        $setting = $this->getSetting();

        return Inertia::render('Frontend/Pages', compact('setting', 'pages', 'page'));
    }

    public function storeContactPages(StoreContactRequest $request)
    {
        $data = $request->validated();

        $randomUser = User::whereHas('roles', function ($query) {
            $query->where('name', 'agente');
        })->inRandomOrder()->first();

        if (!$randomUser) {
            return back()->withErrors(['error' => 'No se puede crear el contacto: No existen usuarios con rol agente.']);
        }

        $data['user_id'] = $randomUser->id;

        Contacts::create($data);
    }

    public function storeContact(StoreContactRequest $request)
    {
        $property = $request->input('property_id');
        $data = $request->validated();

        $contact = null;
        if (!empty($data['identificación_contact'])) {
            $contact = Contacts::where('identificación_contact', $data['identificación_contact'])->first();
        }

        if (!$contact) {
            $contact = Contacts::create($data);
        }

        $existsRelation = ContactProperty::where('contact_id', $contact->id)
            ->where('property_id', $property)
            ->exists();

        if (!$existsRelation) {
            ContactProperty::create([
                'contact_id' => $contact->id,
                'property_id' => $property,
            ]);
        }
    }


    public function propertiesList(Request $request): Response
    {
        $setting = $this->getSetting();
        $pages = $this->getActivePages();

        $query = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user', 'media')
            ->where('status', '1');

        if ($request->filled('typeProperty')) {
            $model = TypesProperties::where('slug', $request->input('typeProperty'))->first();
            if ($model) $query->where('types_properties_id', $model->id);
        }
        if ($request->filled('minPrice')) {
            $query->where('price', '>=', $request->float('minPrice'));
        }
        if ($request->filled('maxPrice')) {
            $query->where('price', '<=', $request->float('maxPrice'));
        }
        if ($request->filled('phyState')) {
            $model = PhyStates::where('slug', $request->input('phyState'))->first();
            if ($model) $query->where('phy_states_id', $model->id);
        }
        if ($request->filled('typeBusiness')) {
            $model = TypesBusinesses::where('slug', $request->input('typeBusiness'))->first();
            if ($model) $query->where('types_businesses_id', $model->id);
        }
        if ($request->filled('country')) {
            $model = Countries::where('slug', $request->input('country'))->first();
            if ($model) $query->where('countries_id', $model->id);
        }
        if ($request->filled('state')) {
            $model = States::where('slug', $request->input('state'))->first();
            if ($model) $query->where('states_id', $model->id);
        }
        if ($request->filled('city')) {
            $model = Cities::where('slug', $request->input('city'))->first();
            if ($model) $query->where('cities_id', $model->id);
        }

        $properties = $query->paginate(12)->withQueryString();

        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $phyStates = PhyStates::all();
        $typeBusinesses = TypesBusinesses::all();
        $typeProperties = TypesProperties::all();
        $filters = $request->only(['typeProperty', 'minPrice', 'maxPrice', 'phyState', 'typeBusiness', 'country', 'state', 'city']);

        return Inertia::render('Frontend/PropertiesList', compact(
            'setting', 'pages', 'properties', 'countries', 'states', 'cities',
            'phyStates', 'typeBusinesses', 'typeProperties', 'filters'
        ));
    }

    public function typePropertiesList($slug, Request $request): Response
    {
        $setting = $this->getSetting();
        $pages = $this->getActivePages();

        $typeProperty = TypesProperties::where('slug', $slug)->firstOrFail();

        $query = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user', 'media')
            ->where('status', '1')
            ->where('types_properties_id', $typeProperty->id);

        if ($request->filled('minPrice')) {
            $query->where('price', '>=', $request->float('minPrice'));
        }
        if ($request->filled('maxPrice')) {
            $query->where('price', '<=', $request->float('maxPrice'));
        }
        if ($request->filled('phyState')) {
            $model = PhyStates::where('slug', $request->input('phyState'))->first();
            if ($model) $query->where('phy_states_id', $model->id);
        }
        if ($request->filled('typeBusiness')) {
            $model = TypesBusinesses::where('slug', $request->input('typeBusiness'))->first();
            if ($model) $query->where('types_businesses_id', $model->id);
        }
        if ($request->filled('country')) {
            $model = Countries::where('slug', $request->input('country'))->first();
            if ($model) $query->where('countries_id', $model->id);
        }
        if ($request->filled('state')) {
            $model = States::where('slug', $request->input('state'))->first();
            if ($model) $query->where('states_id', $model->id);
        }
        if ($request->filled('city')) {
            $model = Cities::where('slug', $request->input('city'))->first();
            if ($model) $query->where('cities_id', $model->id);
        }

        $properties = $query->paginate(12)->withQueryString();

        $filters = array_merge(
            $request->only(['minPrice', 'maxPrice', 'phyState', 'typeBusiness', 'country', 'state', 'city']),
            ['typeProperty' => $typeProperty->slug]
        );

        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $phyStates = PhyStates::all();
        $typeBusinesses = TypesBusinesses::all();
        $typeProperties = TypesProperties::all();

        return Inertia::render('Frontend/PropertiesList', compact(
            'setting', 'pages', 'properties', 'countries', 'states', 'cities',
            'phyStates', 'typeBusinesses', 'typeProperties', 'filters'
        ));
    }
}
