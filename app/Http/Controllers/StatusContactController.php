<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatusContacts\StoreRequest;
use App\Http\Requests\StatusContacts\UpdateRequest;
use App\Models\StatusContact;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StatusContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.statuscontact.index')->only('index');
        $this->middleware('can:admin.statuscontact.create')->only('create','store');
        $this->middleware('can:admin.statuscontact.edit')->only('edit','update');
        $this->middleware('can:admin.statuscontact.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuscontacts = StatusContact::all();
        
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('StatusContacts/Index', compact('statuscontacts','role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('StatusContacts/Create', compact('role','permission'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name');

        StatusContact::create($data);

        return to_route('statuscontacts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(StatusContact $statusContact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StatusContact $statusContact)
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('StatusContacts/Edit', compact('statusContact','role','permission'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, StatusContact $statusContact)
    {
        $data = $request->only('name');

        $statusContact->update($data);

        return to_route('statuscontacts.edit', $statusContact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StatusContact $statusContact)
    {
        $statusContact->delete();

    }
}
