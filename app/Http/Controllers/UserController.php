<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = User::all();

        return Inertia::render('User/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'email', 'phone', 'status');

        $data['password'] = bcrypt($request['password']);

        // AGREGAR AVATAR
        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/profile'), $nombreImagen);

            // Guardar la ruta completa del avatar
            $data['avatar'] = asset('img/profile/' . $nombreImagen); // Guarda la URL completa
        } else {
            $data['avatar'] = asset('img/profile/default.jpg'); // Guarda la URL por defecto
        }

        User::create($data); // Crear el nuevo usuario

        return to_route('user.index'); // Redirigir a la lista de usuarios
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->only('name', 'email', 'phone', 'status');

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request['password']);
        }

        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/profile'), $nombreImagen);

            // Guardar la ruta completa del avatar
            $data['avatar'] = asset('img/profile/' . $nombreImagen); // Guarda la URL completa

            // Eliminar la imagen existente si no es el por defecto
            if ($user->avatar != 'default.jpg') {
                // Eliminar la imagen existente
                unlink(public_path('img/profile/' . basename($user->avatar)));
            }
        } else {
            // Si no se sube una nueva imagen, conservar la existente
            $data['avatar'] = $user->avatar; // Mantener la URL existente
        }

        $user->update($data); // Actualizar el usuario con los nuevos datos

        return to_route('user.edit', $user); // Redirigir a la edición del usuario
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Eliminar el avatar del usuario, pero no el default.jpg
        if ($user->avatar && $user->avatar != 'default.jpg' && file_exists(public_path('img/profile/' . $user->avatar))) {
            unlink(public_path('img/profile/' . $user->avatar));
        }

        $user->delete();
    }
}
