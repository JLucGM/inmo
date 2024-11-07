<?php

namespace App\Http\Controllers;

use App\Http\Requests\TypesContacts\StoreRequest;
use App\Http\Requests\TypesContacts\UpdateRequest;
use App\Models\TypesContacts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TypesContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typesContacts = TypesContacts::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('TypesContacts/Index', compact('typesContacts', 'role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('TypesContacts/Create', compact( 'role','permission'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name');

        TypesContacts::create($data);

        return to_route('typesContacts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TypesContacts $typesContact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypesContacts $typesContact)
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('TypesContacts/Edit', compact('typesContact','role','permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, TypesContacts $typesContact)
    {
        $data = $request->only('name');

        $typesContact->update($data);

        return to_route('typesContacts.edit', $typesContact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypesContacts $typesContact)
    {
        $typesContact->delete();
    }
}
