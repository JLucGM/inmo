<?php

namespace App\Http\Controllers;

use App\Models\TypesProperties;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypesPropertiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typesproperties = TypesProperties::all();

        return Inertia::render('TypesProperties/Index', compact('typesproperties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TypesProperties/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name');

        TypesProperties::create($data);

        return to_route('typesproperties.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TypesProperties $typeproperty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypesProperties $typeproperty)
    {
        return Inertia::render('TypesProperties/Edit', compact('typeproperty'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypesProperties $typeproperty)
    {
        $data = $request->only('name');

        $typeproperty->update($data);

        return to_route('typesproperties.edit', $typeproperty);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypesProperties $typeproperty)
    {
        $typeproperty->delete();
    }
}
