<?php

namespace App\Http\Controllers;

use App\Http\Requests\TypesBusinesses\StoreRequest;
use App\Http\Requests\TypesBusinesses\UpdateRequest;
use App\Models\TypesBusinesses;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class TypesBusinessesController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.typebusiness.index')->only('index');
        $this->middleware('can:admin.typebusiness.create')->only('create','store');
        $this->middleware('can:admin.typebusiness.edit')->only('edit','update');
        $this->middleware('can:admin.typebusiness.delete')->only('destroy');
    }
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
    public function store(StoreRequest $request)
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
    public function update(UpdateRequest $request, TypesBusinesses $typesBusiness)
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
