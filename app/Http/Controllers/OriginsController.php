<?php

namespace App\Http\Controllers;

use App\Models\Origins;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OriginsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $origins = Origins::all();

        return Inertia::render('Origins/Index', compact('origins'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Origins/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name');

        Origins::create($data);

        return to_route('origins.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Origins $origins)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Origins $origins)
    {
        return Inertia::render('Origins/Edit', compact('origins'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Origins $origins)
    {
        $data = $request->only('name');

        $origins->update($data);

        return to_route('origins.edit', $origins);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Origins $origins)
    {
        $origins->delete();
    }
}
