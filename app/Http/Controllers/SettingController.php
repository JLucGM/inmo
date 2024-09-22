<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $setting = Setting::first();
        $currencies = Currency::all();

        return Inertia::render('Setting/Edit', compact('setting','currencies'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Setting $setting)
    {
        $data = $request->only('name','email',
        'phone',
        'direction',
        'description',
        'currency_id',);
        
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $nombrelogo = 'logo-'.$logo->getClientOriginalName();
            $logo->move(public_path('img/setting'), $nombrelogo);
            $data['logo'] = $nombrelogo;
            if ($setting->logo != 'default.png') {
                // Delete the existing logo
                unlink(public_path('img/setting/' . $setting->logo));
            }
        } 
        
        if ($request->hasFile('logo_footer')) {
            $logo_footer = $request->file('logo_footer');
            $nombrelogo_footer = 'logofooter-'.$logo_footer->getClientOriginalName();
            $logo_footer->move(public_path('img/setting'), $nombrelogo_footer);
            $data['logo_footer'] = $nombrelogo_footer;
            if ($setting->logo_footer != 'default.png') {
                // Delete the existing logo_footer
                unlink(public_path('img/setting/' . $setting->logo_footer));
            }
        } 
        
        if ($request->hasFile('favicon')) {
            $favicon = $request->file('favicon');
            $nombrefavicon = 'logofooter-'.$favicon->getClientOriginalName();
            $favicon->move(public_path('img/setting'), $nombrefavicon);
            $data['favicon'] = $nombrefavicon;
            if ($setting->favicon != 'default.png') {
                // Delete the existing favicon
                unlink(public_path('img/setting/' . $setting->favicon));
            }
        } 

        $setting->update($data);

        return to_route('settings.edit', $setting);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
