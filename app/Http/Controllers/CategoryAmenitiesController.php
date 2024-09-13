<?php

namespace App\Http\Controllers;

use App\Models\CategoryAmenities;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryAmenitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryamenities = CategoryAmenities::all();

        return Inertia::render('CategoryAmenities/Index', compact('categoryamenities'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CategoryAmenities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name');

        CategoryAmenities::create($data);

        return to_route('category-amenities.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryAmenities $categoryAmenity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryAmenities $categoryAmenity)
    {
        return Inertia::render('CategoryAmenities/Edit', compact('categoryAmenity'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CategoryAmenities $categoryAmenity)
    {
        $data = $request->only('name');

        $categoryAmenity->update($data);

        return to_route('category-amenities.edit', $categoryAmenity);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryAmenities $categoryAmenity)
    {
        $categoryAmenity->delete();
    }
}
