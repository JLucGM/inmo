<?php

namespace App\Http\Controllers;

use App\Models\Countries;
use App\Models\States;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $states = States::all();

        return Inertia::render('States/Index', compact('states'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $country = Countries::all();
        return Inertia::render('States/Create', compact('country'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        //dd($request);
        $data = $request->only('name','country_id');

        States::create($data);

        return to_route('states.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(States $states)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(States $state)
    {
        return Inertia::render('States/Edit', compact('state'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, States $state)
    {
        $data = $request->only('name');

        $state->update($data);

        return to_route('states.edit', $state);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(States $state)
    {
        $state->delete();
    }
}
