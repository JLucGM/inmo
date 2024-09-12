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
    public function store(Request $request)
    {
        //dd($request);
        $data = $request->only('name', 'email', 'phone', 'status');

        $data['password'] = bcrypt($request['password']);

        // AGREGAR AVATAR
        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/profile'), $nombreImagen);
            $data['avatar'] = $nombreImagen;
        } else {
            $data['avatar'] = "default.jpg";
        }

        //$data['user_id'] =Auth::user()->id;

        User::create($data);

        return to_route('user.index');
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
    public function update(Request $request, User $user)
    {
        $data = $request->only('name', 'email', 'phone', 'status');

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request['password']);
        }

        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/profile'), $nombreImagen);
            $data['avatar'] = $nombreImagen;
            if ($user->avatar != 'default.jpg') {
                // Delete the existing image
                unlink(public_path('img/profile/' . $user->avatar));
            }
        } 

        $user->update($data);

        return to_route('user.edit', $user);
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
