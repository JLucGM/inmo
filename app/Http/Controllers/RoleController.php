<?php

namespace App\Http\Controllers;

use App\Http\Requests\Roles\StoreRequest;
use App\Http\Requests\Roles\UpdateRequest;
use App\Models\Permission;
use App\Models\Role;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:admin.role.index')->only('index');
        $this->middleware('can:admin.role.create')->only('create', 'store');
        $this->middleware('can:admin.role.edit')->only('edit', 'update');
        $this->middleware('can:admin.role.delete')->only('destroy');
    }

    public function index(): Response
    {
        $roles = Role::all();

        return Inertia::render('Roles/Index', compact('roles'));
    }

    public function create(): Response
    {
        $permissions = Permission::all();

        return Inertia::render('Roles/Create', compact('permissions'));
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $role = Role::create($data);

        if (!empty($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return to_route('roles.index');
    }

    public function edit(Role $role): Response
    {
        $permissions = Permission::all();
        $assignedPermissions = $role->permissions()->pluck('id')->toArray();

        return Inertia::render('Roles/Edit', compact('role', 'permissions', 'assignedPermissions'));
    }

    public function update(UpdateRequest $request, Role $role)
    {
        $data = $request->validated();

        $role->update($data);

        if (!empty($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return to_route('roles.edit', $role);
    }

    public function destroy(Role $role)
    {
        $role->delete();
    }
}
