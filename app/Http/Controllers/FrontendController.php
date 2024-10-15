<?php

namespace App\Http\Controllers;

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
        $properties = Property::with('country','state','city')->get();   
        $infoweb = Infoweb::all();   
        $testimonials = Testimonial::all();  
        $user = User::all();

        return Inertia::render('Welcome', compact('setting','slides','properties','infoweb','testimonials','user'));
    }
    
    public function frontendShow(Property $property)
    {
        $property = Property::with('country','state','city','phyState')->find($property->id);
        $setting = Setting::first();
        $images = json_decode($property->images);
        $propertyAmenities = $property->amenities;
// dd( $property);
        return Inertia::render('Frontend/Property', compact('property','setting','images','propertyAmenities'));
    }

}
