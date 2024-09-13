<?php

namespace App\Http\Controllers;

use App\Models\Amenities;
use App\Models\CategoryAmenities;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmenitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $amenities = Amenities::all();

        return Inertia::render('Amenities/Index', compact('amenities'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categoryAmenities = CategoryAmenities::all();
        return Inertia::render('Amenities/Create', compact('categoryAmenities'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name', 'category_amenities_id');

        Amenities::create($data);

        return to_route('amenities.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Amenities $amenity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amenities $amenity)
    {
        $categoryAmenities = CategoryAmenities::all();
        $selectedCategoryAmenitiesId = $amenity->category_amenities_id; // Retrieve the currently selected state ID
        return Inertia::render('Amenities/Edit', compact('amenity', 'categoryAmenities', 'selectedCategoryAmenitiesId'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Amenities $amenity)
    {
        $data = $request->only('name', 'category_amenities_id');

        $amenity->update($data);

        return to_route('amenities.edit', $amenity);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amenities $amenity)
    {
        $amenity->delete();
    }
}
