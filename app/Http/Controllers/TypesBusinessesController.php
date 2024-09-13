<?php

namespace App\Http\Controllers;

use App\Models\TypesBusinesses;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypesBusinessesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typesBusinesses = TypesBusinesses::all();

        return Inertia::render('TypesBusinesses/Index', compact('typesBusinesses'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TypesBusinesses/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name');

        TypesBusinesses::create($data);

        return to_route('typesBusinesses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TypesBusinesses $typesBusinesses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypesBusinesses $typesBusiness)
    {
        return Inertia::render('TypesBusinesses/Edit', compact('typesBusiness'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypesBusinesses $typesBusiness)
    {
        $data = $request->only('name');

        $typesBusiness->update($data);

        return to_route('typesBusinesses.edit', $typesBusiness);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypesBusinesses $typesBusiness)
    {
        $typesBusiness->delete();

    }
}
