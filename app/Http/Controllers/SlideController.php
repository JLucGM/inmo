<?php

namespace App\Http\Controllers;

use App\Http\Requests\Slide\StoreRequest;
use App\Http\Requests\Slide\UpdateRequest;
use App\Models\Slide;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $slide = Slide::all();

        return Inertia::render('Slides/Index', compact('slide'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Slides/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'text', 'link', 'status');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/slides'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/slides/' . $nombreImagen); // Guarda la URL completa
        }

        Slide::create($data);

        return to_route('slides.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Slide $slide)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Slide $slide)
    {
        return Inertia::render('Slides/Edit', compact('slide'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Slide $slide)
    {
        $data = $request->only('name', 'text', 'link', 'status');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/slides'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/slides/' . $nombreImagen); // Guarda la URL completa

            // Eliminar la imagen existente si no es la imagen por defecto
            if ($slide->image && $slide->image != asset('img/slides/default.jpg')) {
                unlink(public_path('img/slides/' . basename($slide->image))); // Elimina la imagen anterior
            }
        }

        $slide->update($data); // Actualiza el slide con los nuevos datos

        return to_route('slides.edit', $slide);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slide $slide)
    {
        if ($slide->image != 'default.jpg') {
            // Delete the existing image
            unlink(public_path('img/slides/' . $slide->image));
        }

        $slide->delete();
    }

    public function toggleStatus(Request $request, Slide $slide)
    {
        $slide->update(['status' => $slide->status === 0 ? 1 : 0]);
        return redirect()->back();
    }
}
