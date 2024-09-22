<?php

namespace App\Http\Controllers;

use App\Http\Requests\Countries\StoreRequest;
use App\Http\Requests\Countries\UpdateRequest;
use App\Models\Countries;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountriesController extends Controller
{
    /**
     * Display a listing of the resource.s
     */
    public function index()
    {
        $countries = Countries::all();

        return Inertia::render('Countries/Index', compact('countries'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Countries/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name');

        Countries::create($data);

        return to_route('countries.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Countries $countries)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Countries $country)
    {
        return Inertia::render('Countries/Edit', compact('country'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Countries $country)
    {
        $data = $request->only('name');

        $country->update($data);

        return to_route('countries.edit', $country);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Countries $country)
    {
        $country->delete();
    }
}
