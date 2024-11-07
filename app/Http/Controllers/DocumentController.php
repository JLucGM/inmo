<?php

namespace App\Http\Controllers;

use App\Http\Requests\Documents\StoreRequest;
use App\Models\Contacts;
use App\Models\Document;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DocumentController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:admin.documents.index')->only('index');
        $this->middleware('can:admin.documents.create')->only('create','store');
        $this->middleware('can:admin.documents.edit')->only('edit','update');
        $this->middleware('can:admin.documents.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $documents = Document::with('user','contact','property')->get();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();
        
        return Inertia::render('Documents/Index', compact('documents', 'role','permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // dd('create');
        $properties = Property::all();
        $contacts = Contacts::all();
        $users = User::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Documents/Create', compact('properties', 'contacts','users', 'role','permission'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'body', 'status','contact_id','property_id','user_id');

        $data['user_id'] = Auth::id();

        Document::create($data);

        return to_route('documents.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        $properties = Property::all();
        $contacts = Contacts::all();
        $users = User::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Documents/Edit', compact('document','properties', 'contacts','users', 'role','permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        $data = $request->only('name', 'body', 'status','contact_id',
        'property_id',
        'user_id');

        $document->update($data);

        return to_route('documents.edit', $document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $document->delete();
    }
}
