<?php

namespace App\Http\Controllers;

use App\Http\Requests\States\StoreRequest;
use App\Http\Requests\States\UpdateRequest;
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
        $states = States::with('country')->get();
        $country = Countries::all();
        // $cities = Cities::with('state')->get();

        return Inertia::render('States/Index', compact('states', 'country'));
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
    public function store(StoreRequest $request)
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
    $country = Countries::all();
    $selectedCountryId = $state->country_id; // Retrieve the currently selected country ID
    return Inertia::render('States/Edit', compact('state', 'country', 'selectedCountryId'));
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, States $state)
    {
        $data = $request->only('name','country_id');

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
