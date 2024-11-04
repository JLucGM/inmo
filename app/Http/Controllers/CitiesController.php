<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cities\StoreRequest;
use App\Http\Requests\Cities\UpdateRequest;
use App\Models\Cities;
use App\Models\States;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class CitiesController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.cities.index')->only('index');
        $this->middleware('can:admin.cities.create')->only('create','store');
        $this->middleware('can:admin.cities.edit')->only('edit','update');
        $this->middleware('can:admin.cities.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = Cities::with('state')->get();
        $state = States::all();

        return Inertia::render('Cities/Index', compact('cities','state'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $state = States::all();

        return Inertia::render('Cities/Create', compact('state'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        //dd($request);
        $data = $request->only('name', 'state_id');

        Cities::create($data);

        return to_route('cities.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cities $cities)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cities $city)
    {
        $states = States::all();
        $selectedStateId = $city->state_id; // Retrieve the currently selected state ID
        return Inertia::render('Cities/Edit', compact('city', 'states', 'selectedStateId'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Cities $city)
    {
        $data = $request->only('name', 'state_id');

        $city->update($data);

        return to_route('cities.edit', $city);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cities $city)
    {
        $city->delete();
    }
}
