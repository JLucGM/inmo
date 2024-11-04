<?php

namespace App\Http\Controllers;

use App\Http\Requests\InfoWeb\StoreRequest;
use App\Http\Requests\InfoWeb\UpdateRequest;
use App\Models\Infoweb;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class InfowebController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.info-webs.index')->only('index');
        $this->middleware('can:admin.info-webs.create')->only('create','store');
        $this->middleware('can:admin.info-webs.edit')->only('edit','update');
        $this->middleware('can:admin.info-webs.delete')->only('destroy');
    }
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
    public function store(StoreRequest $request)
    {
        $data = $request->only('name','text');

        // AGREGAR image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/setting'), $nombreImagen);
            
            // Guardar la ruta completa
            $data['image'] = asset('img/setting/' . $nombreImagen); // Guarda la URL completa
        } else {
            $data['image'] = asset('img/setting/default.jpg'); // Guarda la URL del default
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
    public function update(UpdateRequest $request, Infoweb $infoweb)
    {
        $data = $request->only('name','text');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/setting'), $nombreImagen);
            
            // Guardar la ruta completa
            $data['image'] = asset('img/setting/' . $nombreImagen); // Guarda la URL completa
    
            // Eliminar la imagen anterior si no es la imagen por defecto
            if ($infoweb->image != asset('img/setting/default.jpg')) {
                unlink(public_path('img/setting/' . basename($infoweb->image))); // Elimina la imagen anterior
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
