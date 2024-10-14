<?php

namespace App\Http\Controllers;

use App\Models\Infoweb;
use App\Models\Property;
use App\Models\Setting;
use App\Models\Slide;
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

        return Inertia::render('Welcome', compact('setting','slides','properties','infoweb'));
    }

}
