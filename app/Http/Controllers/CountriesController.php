<?php

namespace App\Http\Controllers;

use App\Http\Requests\Countries\StoreRequest;
use App\Http\Requests\Countries\UpdateRequest;
use App\Models\Countries;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CountriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.countries.index')->only('index');
        $this->middleware('can:admin.countries.create')->only('create', 'store');
        $this->middleware('can:admin.countries.edit')->only('edit', 'update');
        $this->middleware('can:admin.countries.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.s
     */
    public function index()
    {
        $countries = Countries::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Countries/Index', compact('countries','role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Countries/Create', compact('role','permission'));

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
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Countries/Edit', compact('country','role','permission'));

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
