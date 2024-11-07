<?php

namespace App\Http\Controllers;

use App\Http\Requests\Slide\StoreRequest;
use App\Http\Requests\Slide\UpdateRequest;
use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SlideController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.slides.index')->only('index');
        $this->middleware('can:admin.slides.create')->only('create', 'store');
        $this->middleware('can:admin.slides.edit')->only('edit', 'update');
        $this->middleware('can:admin.slides.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $slide = Slide::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Slides/Index', compact('slide', 'role', 'permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Slides/Create', compact('role', 'permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'text', 'link', 'status');

        if (!str_starts_with($data['link'], 'https://')) {
            $data['link'] = 'https://' . $data['link'];
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $nombreArchivo = time() . '_' . $file->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $file->move(public_path('img/slides'), $nombreArchivo);

            // Guardar la ruta completa
            $data['image'] = asset('img/slides/' . $nombreArchivo); // Guarda la URL completa
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
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Slides/Edit', compact('slide','role', 'permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Slide $slide)
{
    $data = $request->only('name', 'text', 'link', 'status');

    if (!str_starts_with($data['link'], 'https://')) {
        $data['link'] = 'https://' . $data['link'];
    }

    // Eliminar la imagen existente si se está subiendo una nueva
    if ($request->hasFile('image')) {
        // Verificar si existe una imagen anterior y eliminarla
        if ($slide->image && $slide->image != asset('img/slides/default.jpg')) {
            unlink(public_path('img/slides/' . basename($slide->image))); // Elimina la imagen anterior
        }

        // Procesar la nueva imagen
        $image = $request->file('image');
        $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
        $image->move(public_path('img/slides'), $nombreImagen);

        // Guardar la ruta completa de la nueva imagen
        $data['image'] = asset('img/slides/' . $nombreImagen);
    }

    // Actualiza el slide con los nuevos datos
    $slide->update($data);

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
