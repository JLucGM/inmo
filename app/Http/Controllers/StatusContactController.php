<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatusContacts\StoreRequest;
use App\Http\Requests\StatusContacts\UpdateRequest;
use App\Models\StatusContact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuscontacts = StatusContact::all();

        return Inertia::render('StatusContacts/Index', compact('statuscontacts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('StatusContacts/Create');

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
        return Inertia::render('StatusContacts/Edit', compact('statusContact'));

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
