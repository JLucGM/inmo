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
use App\Models\States;
use App\Models\Status;
use App\Models\StatusContact;
use App\Models\TypesContacts;
use App\Models\TypesProperties;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contacts::with('user')->with('typecontact')->with('statuscontact')->with('origin')->with('typeproperty')->with('country')->with('state')->with('city')->orderBy('name', 'asc')->get();
        $properties = Property::all();

        return Inertia::render('Contacts/Index', compact('contacts', 'properties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $country = Countries::all();
        $state = States::all();
        $city = Cities::all();
        $typepropety = TypesProperties::all();
        $users = User::all();
        $statuses = StatusContact::all();
        $typecontacts = TypesContacts::all();
        $origins = Origins::all();

        return Inertia::render('Contacts/Create', compact('country', 'state', 'city', 'typepropety', 'users', 'statuses', 'typecontacts', 'origins'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        //dd($request);
        $data = $request->only(
            'name',
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

        Contacts::create($data);

        return to_route('contacts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contacts $contacts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contacts $contacts)
    {
        $country = Countries::all();
        $state = States::all();
        $city = Cities::all();
        $typepropety = TypesProperties::all();
        $users = User::all();
        $statuses = StatusContact::all();
        $typecontacts = TypesContacts::all();
        $origins = Origins::all();

        return Inertia::render('Contacts/Edit', compact('contacts', 'country', 'state', 'city', 'typepropety', 'users', 'statuses', 'typecontacts', 'origins'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Contacts $contacts)
    {
        //dd($request);
        $data = $request->only(
            'name',
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

        return to_route('contacts.edit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contacts $contacts)
    {
        $contacts->delete();
    }

    public function cross(Request $request)
    {
        //dd($request);
        $contactId = $request->input('contact_id');
        $propertyId = $request->input('property_id');

        ContactProperty::create([
            'contact_id' => $contactId,
            'property_id' => $propertyId,
        ]);

        // Resto de la lógica del controlador
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
