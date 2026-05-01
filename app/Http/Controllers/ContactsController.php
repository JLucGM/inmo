<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contacts\StoreRequest;
use App\Http\Requests\Contacts\UpdateRequest;
use App\Models\Cities;
use App\Models\ContactProperty;
use App\Models\Contacts;
use App\Models\Countries;
use App\Models\Origins;
use App\Models\Property;
use App\Models\Setting;
use App\Models\States;
use App\Models\Status;
use App\Models\StatusContact;
use App\Models\TypesContacts;
use App\Models\TypesProperties;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactsController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.contactos.index')->only('index');
        $this->middleware('can:admin.contactos.create')->only('create', 'store');
        $this->middleware('can:admin.contactos.edit')->only('edit', 'update');
        $this->middleware('can:admin.contactos.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $contacts = Contacts::select('id', 'slug', 'name', 'email', 'phone', 'user_id', 'country_id', 'state_id', 'city_id', 'types_contacts_id', 'status_contacts_id', 'origin_id', 'types_properties_id', 'created_at')
            ->with([
                'user:id,name',
                'country:id,name',
                'state:id,name',
                'city:id,name',
                'typecontact:id,name',
                'statuscontact:id,name',
                'origin:id,name',
                'typeproperty:id,name'
            ])
            ->where('user_id', $user->id) // Filtra por user_id
            ->orderBy('name', 'asc')
            ->paginate(15);

        return Inertia::render('Contacts/Index', compact('contacts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $typeProperties = TypesProperties::all();
        $users = User::all();
        $statuses = StatusContact::all();
        $typeContacts = TypesContacts::all();
        $origins = Origins::all();

        return Inertia::render('Contacts/Create', compact('countries', 'states', 'cities', 'typeProperties', 'users', 'statuses', 'typeContacts', 'origins'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        //dd($request);
        $data = $request->only(
            'name',
            'identificación_contact',
            'slug',
            'description',
            'bedrooms',
            'bathrooms',
            'direction',
            'email',
            'phone',
            'birthdate',
            'min_budget',
            'max_budget',
            'bedrooms',
            'bathrooms',
            'types_contacts_id',
            'status_contacts_id',
            'origin_id',
            'types_properties_id',
            'country_id',
            'state_id',
            'city_id',
            'user_id',
        );
        $data['user_id'] = Auth::id();

        Contacts::create($data);

        return to_route('contacts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contacts $contacts)
    {
        $contact = $contacts->load('user', 'country', 'state', 'city', 'typecontact', 'statuscontact', 'origin', 'typeproperty');
        $properties = Property::with('country', 'state', 'city', 'typeproperty', 'user', 'amenities', 'media')->get();

        $setting = Setting::first();

        return Inertia::render('Contacts/Show', compact('contact', 'properties', 'setting'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contacts $contacts)
    {
        $contacts->load(['country', 'state', 'city', 'typecontact', 'statuscontact', 'origin', 'typeproperty']);
        
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $typeProperties = TypesProperties::all();
        $users = User::all();
        $statuses = StatusContact::all();
        $typeContacts = TypesContacts::all();
        $origins = Origins::all();

        return Inertia::render('Contacts/Edit', compact('contacts', 'countries', 'states', 'cities', 'typeProperties', 'users', 'statuses', 'typeContacts', 'origins'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Contacts $contacts)
    {
        //dd($request);
        $data = $request->only(
            'name',
            'identificación_contact',
            'slug',
            'description',
            'bedrooms',
            'bathrooms',
            'direction',
            'email',
            'phone',
            'birthdate',
            'min_budget',
            'max_budget',
            'bedrooms',
            'bathrooms',
            'types_contacts_id',
            'status_contacts_id',
            'origin_id',
            'types_properties_id',
            'country_id',
            'state_id',
            'city_id',
        );

        $data['user_id'] = Auth::id();

        $contacts->update($data);

        return to_route('contacts.edit', $contacts);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contacts $contacts)
    {
        $contacts->delete();
    }

    public function cross($contact_id, $property_id)
    {
        // Resto de la lógica del controlador
        ContactProperty::create([
            'contact_id' => $contact_id,
            'property_id' => $property_id,
        ]);
    }

    public function deleteProperty(Request $request, $contactId, $propertyId)
    {

        // dd("contactId".$contactId."propertyId".$propertyId);

        $contactProperty = ContactProperty::where('contact_id', $contactId)
            ->where('property_id', $propertyId)
            ->delete();
    }

    public function getContactProperties(Request $request, $contactId)
    {
        $contactProperties = ContactProperty::where('contact_id', $contactId)->get();
        return response()->json($contactProperties);
    }
}
