<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhyStates\StoreRequest;
use App\Http\Requests\PhyStates\UpdateRequest;
use App\Models\PhyStates;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PhyStatesController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.phystates.index')->only('index');
        $this->middleware('can:admin.phystates.create')->only('create','store');
        $this->middleware('can:admin.phystates.edit')->only('edit','update');
        $this->middleware('can:admin.phystates.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $phyStates = PhyStates::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('PhyStates/Index', compact('phyStates','role', 'permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('PhyStates/Create', compact('role', 'permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name');

        PhyStates::create($data);

        return to_route('phyStates.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(PhyStates $phyState)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PhyStates $phyState)
    {
        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('PhyStates/Edit', compact('phyState', 'role', 'permission'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, PhyStates $phyState)
    {
        $data = $request->only('name');

        $phyState->update($data);

        return to_route('phyStates.edit', $phyState);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhyStates $phyState)
    {
        $phyState->delete();

    }
}
