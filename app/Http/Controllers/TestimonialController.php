<?php

namespace App\Http\Controllers;

use App\Http\Requests\Testimonials\StoreRequest;
use App\Http\Requests\Testimonials\UpdateRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TestimonialController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:admin.testimonials.index')->only('index');
        $this->middleware('can:admin.testimonials.create')->only('create', 'store');
        $this->middleware('can:admin.testimonials.edit')->only('edit', 'update');
        $this->middleware('can:admin.testimonials.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonial = Testimonial::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Testimonials/Index', compact('testimonial','role', 'permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Testimonials/Create', compact('role', 'permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'text');

        // AGREGAR avatar
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $nombreAvatar = time() . '_' . $avatar->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $avatar->move(public_path('img/testimonials'), $nombreAvatar);

            // Guardar la ruta completa
            $data['avatar'] = asset('img/testimonials/' . $nombreAvatar); // Guarda la URL completa
        } else {
            $data['avatar'] = asset('img/testimonials/default.jpg'); // Guarda la URL por defecto
        }

        Testimonial::create($data); // Crea el nuevo testimonio

        return to_route('testimonial.index'); // Redirige a la lista de testimonios
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Testimonial $testimonial)
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Testimonials/Edit', compact('testimonial','role','permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Testimonial $testimonial)
    {
        $data = $request->only('name', 'text');

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $nombreAvatar = time() . '_' . $avatar->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $avatar->move(public_path('img/testimonials'), $nombreAvatar);

            // Guardar la ruta completa
            $data['avatar'] = asset('img/testimonials/' . $nombreAvatar); // Guarda la URL completa

            // Eliminar el avatar existente si no es el por defecto
            if ($testimonial->avatar != 'default.jpg') {
                // Eliminar el avatar existente
                unlink(public_path('img/testimonials/' . basename($testimonial->avatar)));
            }
        } else {
            // Si no se sube un nuevo avatar, conservar el existente
            $data['avatar'] = $testimonial->avatar; // Mantener la URL existente
        }

        $testimonial->update($data); // Actualizar el testimonio con los nuevos datos

        return to_route('testimonial.edit', $testimonial); // Redirigir a la edición del testimonio
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar != 'default.jpg') {
            // Delete the existing avatar
            unlink(public_path('img/testimonials/' . $testimonial->avatar));
        }

        $testimonial->delete();
    }
}
