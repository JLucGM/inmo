<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pages\StoreRequest;
use App\Http\Requests\Pages\UpdateRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.pages.index')->only('index');
        $this->middleware('can:admin.pages.create')->only('create', 'store');
        $this->middleware('can:admin.pages.edit')->only('edit', 'update');
        $this->middleware('can:admin.pages.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page = Page::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Pages/Index', compact('page','role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Pages/Create', compact('role','permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'body', 'status');

        // AGREGAR image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/pages'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/pages/' . $nombreImagen); // Guarda la URL completa
        } else {
            $data['image'] = asset('img/pages/default.jpg'); // Guarda la URL del default si no hay imagen
        }

        Page::create($data);

        return to_route('pages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Pages/Edit', compact('page','role','permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Page $page)
    {
        $data = $request->only('name', 'body', 'status');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/pages'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/pages/' . $nombreImagen); // Guarda la URL completa

            // Eliminar la imagen anterior si no es la imagen por defecto
            if ($page->image != asset('img/pages/default.jpg')) {
                unlink(public_path('img/pages/' . basename($page->image))); // Elimina la imagen anterior
            }
        }

        $page->update($data);

        return to_route('pages.edit', $page);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        if ($page->image && $page->image != 'default.jpg' && file_exists(public_path('img/pages/' . $page->image))) {
            unlink(public_path('img/pages/' . $page->image));
        }

        $page->delete();
    }
}
