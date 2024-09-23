<?php

namespace App\Http\Controllers;

use App\Models\Infoweb;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfowebController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $infoweb = Infoweb::all();

        return Inertia::render('InfoWeb/Index', compact('infoweb'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('InfoWeb/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name','text');

        // AGREGAR image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/setting'), $nombreImagen);
            $data['image'] = $nombreImagen;
        } else {
            $data['image'] = "default.jpg";
        }

        Infoweb::create($data);

        return to_route('info-web.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Infoweb $infoweb)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Infoweb $infoweb)
    {
        return Inertia::render('InfoWeb/Edit', compact('infoweb'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Infoweb $infoweb)
    {
        $data = $request->only('name','text');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/setting'), $nombreImagen);
            $data['image'] = $nombreImagen;
            if ($infoweb->image != 'default.jpg') {
                // Delete the existing image
                unlink(public_path('img/setting/' . $infoweb->image));
            }
        } 

        $infoweb->update($data);

        return to_route('info-web.edit', $infoweb);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Infoweb $infoweb)
    {
        if ($infoweb->image != 'default.jpg') {
            // Delete the existing image
            unlink(public_path('img/setting/' . $infoweb->image));
        }

        $infoweb->delete();

    }
}
