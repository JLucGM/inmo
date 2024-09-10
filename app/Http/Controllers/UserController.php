<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        if($request->hasFile('avatar')){
            $file = $request->file('avatar');
            $imageName = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images/avatars', $imageName, 'public');            $data['avatar'] = 'images/avatars/' . $imageName;
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

        if($request->hasFile('avatar')){
            $file = $request->file('avatar');
            $imageName = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images/avatars', $imageName, 'public');            $data['avatar'] = 'images/avatars/' . $imageName;
        }

        $user->update($data);

        return to_route('user.edit', $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
    }
}
