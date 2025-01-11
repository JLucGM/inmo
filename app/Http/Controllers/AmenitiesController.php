<?php

namespace App\Http\Controllers;

use App\Http\Requests\Amenities\StoreRequest;
use App\Http\Requests\Amenities\UpdateRequest;
use App\Models\Amenities;
use App\Models\Amenity;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AmenitiesController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.amenities-checks.index')->only('index');
        $this->middleware('can:admin.amenities-checks.create')->only('create','store');
        $this->middleware('can:admin.amenities-checks.edit')->only('edit','update');
        $this->middleware('can:admin.amenities-checks.delete')->only('destroy');
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $amenities = Amenity::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Amenities/Index', compact('amenities','role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Amenities/Create', compact('role', 'permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name');

        Amenity::create($data);

        return to_route('amenities.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Amenity $amenity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amenity $amenity)
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Amenities/Edit', compact('amenity', 'role', 'permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Amenity $amenity)
    {
        $data = $request->only('name', 'category_amenities_id');

        $amenity->update($data);

        return to_route('amenities.edit', $amenity);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amenity $amenity)
    {
        $amenity->delete();
    }
}
