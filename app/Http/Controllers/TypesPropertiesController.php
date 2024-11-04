<?php

namespace App\Http\Controllers;

use App\Http\Requests\TypesProperties\StoreRequest;
use App\Http\Requests\TypesProperties\UpdateRequest;
use App\Models\TypesProperties;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class TypesPropertiesController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:admin.typesProperties.index')->only('index');
        $this->middleware('can:admin.typesProperties.create')->only('create', 'store');
        $this->middleware('can:admin.typesProperties.edit')->only('edit', 'update');
        $this->middleware('can:admin.typesProperties.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typesproperties = TypesProperties::all();

        return Inertia::render('TypesProperties/Index', compact('typesproperties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TypesProperties/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name');

        // AGREGAR imagen
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/typeProperties'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/typeProperties/' . $nombreImagen); // Guarda la URL completa
        } else {
            $data['image'] = asset('img/typeProperties/default.jpg'); // Guarda la URL por defecto
        }

        TypesProperties::create($data); // Crea el nuevo tipo de propiedad

        return to_route('typesproperties.index'); // Redirige a la lista de tipos de propiedades
    }

    /**
     * Display the specified resource.
     */
    public function show(TypesProperties $typeproperty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypesProperties $typeproperty)
    {
        return Inertia::render('TypesProperties/Edit', compact('typeproperty'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, TypesProperties $typeproperty)
    {
        $data = $request->only('name');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/typeProperties'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/typeProperties/' . $nombreImagen); // Guarda la URL completa

            // Eliminar la imagen existente si no es el por defecto
            if ($typeproperty->image != 'default.jpg') {
                // Eliminar la imagen existente
                unlink(public_path('img/typeProperties/' . basename($typeproperty->image)));
            }
        } else {
            // Si no se sube una nueva imagen, conservar la existente
            $data['image'] = $typeproperty->image; // Mantener la URL existente
        }

        $typeproperty->update($data); // Actualizar el tipo de propiedad con los nuevos datos

        return to_route('typesproperties.edit', $typeproperty); // Redirigir a la edición del tipo de propiedad
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypesProperties $typeproperty)
    {
        // Verificar si la imagen existe y no es la por defecto
        if ($typeproperty->image && $typeproperty->image != asset('img/typeProperties/default.jpg')) {
            // Extraer el nombre del archivo de la URL completa
            $nombreImagen = basename($typeproperty->image);

            // Verificar que el archivo exista antes de intentar eliminarlo
            if (file_exists(public_path('img/typeProperties/' . $nombreImagen))) {
                unlink(public_path('img/typeProperties/' . $nombreImagen));
            }
        }

        // Eliminar el tipo de propiedad
        $typeproperty->delete();
    }
}
