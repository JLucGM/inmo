<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');

        $this->middleware('can:admin.user.index')->only('index');
        $this->middleware('can:admin.user.create')->only('create', 'store');
        $this->middleware('can:admin.user.edit')->only('edit', 'update');
        // $this->middleware('can:admin.user.delete')->only('delete');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $users = User::select('id', 'name', 'slug', 'email', 'phone', 'status', 'avatar', 'created_at')->paginate(15);
        $roles = Cache::remember('roles', 3600, function () {
            return Role::select('id', 'name')->get();
        });

        return Inertia::render('User/Index', compact('users', 'roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $roles = Role::all();

        return Inertia::render('User/Create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'email', 'phone', 'status', 'role');

        $data['password'] = bcrypt($request['password']);

        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $nombreImagen = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/profile', $nombreImagen);
            $data['avatar'] = Storage::url('profile/' . $nombreImagen);
        } else {
            $data['avatar'] = asset('img/profile/default.jpg');
        }

        $user = User::create($data); // Crear el nuevo usuario

        // Asignar el rol al usuario
        if ($request->filled('role')) {
            $user->assignRole($request->input('role'));
        }

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
    public function edit(User $user): Response
    {
        $user->load('roles');

        $roles = Role::all();

        return Inertia::render('User/Edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->only('name', 'email', 'phone', 'status', 'role');

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request['password']);
        }

        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $nombreImagen = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/profile', $nombreImagen);

            $oldAvatar = str_replace('/storage/', 'public/', $user->avatar);
            if ($user->avatar && !str_contains($user->avatar, 'default.jpg') && Storage::exists($oldAvatar)) {
                Storage::delete($oldAvatar);
            }

            $data['avatar'] = Storage::url('profile/' . $nombreImagen);
        } else {
            $data['avatar'] = $user->avatar;
        }

        $user->update($data); // Actualizar el usuario con los nuevos datos

        // Actualizar el rol del usuario
        if ($request->filled('role')) {
            // Sincronizar roles
            $user->syncRoles([$request->input('role')]);
        }

        return to_route('user.edit', $user); // Redirigir a la edición del usuario
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->avatar && !str_contains($user->avatar, 'default.jpg')) {
            $avatarPath = str_replace('/storage/', 'public/', $user->avatar);
            if (Storage::exists($avatarPath)) {
                Storage::delete($avatarPath);
            }
        }

        // Eliminar el usuario
        $user->delete();
    }
}
