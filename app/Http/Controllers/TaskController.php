<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tasks\StoreRequest;
use App\Models\Contacts;
use App\Models\Property;
use App\Models\StatusContact;
use App\Models\Task;
use App\Models\TypesContacts;
use App\Models\TypeTasks;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.tasks.index')->only('index');
        $this->middleware('can:admin.tasks.create')->only('create', 'store');
        $this->middleware('can:admin.tasks.edit')->only('edit', 'update');
        $this->middleware('can:admin.tasks.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $tasks = Task::with('contact', 'user','property','typeTask','statusContact')->where('user_id', $user->id)->get();

        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();
        
        return Inertia::render('Tasks/Index', compact('tasks', 'role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $statuses = StatusContact::all();
        $contacts = Contacts::all();
        $typetasks = TypeTasks::all();
        $properties = Property::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Tasks/Create', compact('statuses', 'contacts','typetasks','properties', 'role','permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name','start_time',
        'end_time',
        'status_contacts_id',
        'description',
        'contact_id',
        'types_tasks_id',
        'property_id',
        );

        $data['user_id'] = Auth::id();

        Task::create($data);

        return to_route('tasks.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $statuses = StatusContact::all();
        $contacts = Contacts::all();
        $typetasks = TypeTasks::all();
        $properties = Property::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Tasks/Edit', compact('task','statuses', 'contacts','typetasks','properties', 'role','permission'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $data = $request->only('name','start_time',
        'end_time',
        'status_contacts_id',
        'description',
        'contact_id',
        'types_tasks_id',
        'property_id',
        );

        $task->update($data);

        return to_route('tasks.edit', $task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
    }
    
    public function calendary()
    {
        $user = Auth::user();
        $tasks = Task::with('typeTask','statusContact')->where('user_id', $user->id)->get();

        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Tasks/Calendary', compact('tasks', 'role','permission'));
    }
}
