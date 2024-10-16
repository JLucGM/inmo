<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use App\Models\Infoweb;
use App\Models\Property;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function welcome()
    {
        $setting = Setting::first();
        $slides = Slide::where('status', '1')->first();
        $properties = Property::with('country', 'state', 'city')->get();
        $infoweb = Infoweb::all();
        $testimonials = Testimonial::all();
        $user = User::all();

        return Inertia::render('Welcome', compact('setting', 'slides', 'properties', 'infoweb', 'testimonials', 'user'));
    }

    public function frontendShow(Property $property)
    {
        $property = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'user')->find($property->id);
        $setting = Setting::with('currency')->first();
        $images = json_decode($property->images);
        $propertyAmenities = $property->amenities;
        //  dd( $setting->currency);
        return Inertia::render('Frontend/Property', compact('property', 'setting', 'images', 'propertyAmenities'));
    }

    public function storeContact(Request $request, $property)
    {
        //  dd($request, $property);
        $data = $request->only(
            'name',
            'email',
            'phone',
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

        // return to_route('property.show', $property);
    }
}
