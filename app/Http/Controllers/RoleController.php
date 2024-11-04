<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
// use Spatie\Permission\Models\Role;

class RoleController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:admin.role.index')->only('index');
        $this->middleware('can:admin.role.create')->only('create', 'store');
        $this->middleware('can:admin.role.edit')->only('edit', 'update');
        $this->middleware('can:admin.role.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return Inertia::render('Roles/Index', compact('roles'));
        }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();
        
        return Inertia::render('Roles/Create',compact('permissions'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $data = $request->only('name', 'permissions');

        $role = Role::create($data);

        if (!empty($data['permissions'])) {

            // dd($data['permissions']);
            $role->syncPermissions($data['permissions']); // Asigna los permisos al rol
        }

        return to_route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $roles)
    {
        $permissions = Permission::all();
    $assignedPermissions = $roles->permissions()->pluck('id')->toArray();
// dd($assignedPermissions);
    return Inertia::render('Roles/Edit', compact('roles', 'permissions', 'assignedPermissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $roles)
    {
        $data = $request->only('name');

        $roles->update($data);

        $roles->permissions()->sync($request->permissions); // Esto actualizará los permisos asociados al rol


        return to_route('roles.edit', $roles);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $roles)
    {
        // dd($roles);
        $roles->delete();
    }
}
