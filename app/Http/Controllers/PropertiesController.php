<?php

namespace App\Http\Controllers;

use App\Http\Requests\Properties\StoreRequest;
use App\Models\Amenity;
use App\Models\Cities;
use App\Models\Countries;
use App\Models\PhyStates;
use App\Models\Property;
use App\Models\PropertyAmenity;
use App\Models\States;
use App\Models\TypesBusinesses;
use App\Models\TypesProperties;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PropertiesController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.properties.index')->only('index');
        $this->middleware('can:admin.properties.create')->only('create', 'store');
        $this->middleware('can:admin.properties.edit')->only('edit', 'update');
        $this->middleware('can:admin.properties.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.s
     */
    public function index()
    {
        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user', 'media')->get();

        $user = Auth::user();

        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Properties/Index', compact('properties', 'role', 'permission'));
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
        $typebusiness = TypesBusinesses::all();
        $phystate = PhyStates::all();
        $amenities = Amenity::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Properties/Create', compact('country', 'state', 'city', 'typepropety', 'typebusiness', 'phystate', 'amenities', 'role', 'permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        // dd($request->all());
        // Datos básicos (sin main ni images)
        $data = $request->only([
            'name',
            'price',
            'slug',
            'description',
            'identification',
            'bedrooms',
            'bathrooms',
            'totalMeters',
            'builtMeters',
            'garages',
            'direction',
            'coordinate',
            'status',
            'types_properties_id',
            'phy_states_id',
            'types_businesses_id',
            'country_id',
            'state_id',
            'city_id',
        ]);

        $data['user_id'] = Auth::id();

        // Crear la propiedad
        $property = Property::create($data);

        // Manejo de galería con MediaLibrary
        if ($request->hasFile('images')) {
            $images = $request->file('images');

            if (is_array($images)) {
                foreach ($images as $image) {
                    $property->addMedia($image)->toMediaCollection('images');
                }
            } else {
                $property->addMedia($images)->toMediaCollection('images');
            }
        } else {
            // Agregar imagen por defecto si no hay uploads
            $defaultPath = public_path('img/properties/default.jpg');
            if (file_exists($defaultPath)) {
                $property->addMedia($defaultPath)->toMediaCollection('images');
            }
        }

        // Relación con amenities usando modelo intermedio
        $amenitiesIds = $request->input('amenitiy', []);
        foreach ($amenitiesIds as $amenityId) {
            PropertyAmenity::create([
                'property_id' => $property->id,
                'amenity_id' => $amenityId,
            ]);
        }

        return to_route('properties.edit', $property);
    }



    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        $property->load('media', 'amenities');
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $typeProperties = TypesProperties::all();
        $typeBusinesses = TypesBusinesses::all();
        $users = User::all();
        $phyStates = PhyStates::all();
        $amenities = Amenity::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permissions = $user->getAllPermissions();

        Log::info('Edit method: Property loaded with media and amenities', [
            'property_id' => $property->id,
            'media_count' => $property->media->count(),
            'amenities_count' => $property->amenities->count(),
        ]);

        return Inertia::render('Properties/Edit', compact(
            'property',
            'countries',
            'states',
            'cities',
            'typeProperties',
            'typeBusinesses',
            'users',
            'phyStates',
            'amenities',
            'role',
            'permissions'
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'slug' => 'nullable|string|unique:properties,slug,' . $property->id,
            'description' => 'nullable|string',
            'identification' => 'nullable|string|max:255',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'totalMeters' => 'nullable|numeric|min:0',
            'builtMeters' => 'nullable|numeric|min:0',
            'garages' => 'nullable|integer|min:0',
            'direction' => 'nullable|string|max:500',
            'status' => ['required', Rule::in([0, 1, 2])],
            'types_properties_id' => 'required|exists:types_properties,id',
            'phy_states_id' => 'required|exists:phy_states,id',
            'types_businesses_id' => 'required|exists:types_businesses,id',
            'country_id' => 'required|exists:countries,id',
            'state_id' => 'required|exists:states,id',
            'city_id' => 'required|exists:cities,id',
            'amenity' => 'nullable|array',
            'amenity.*' => 'exists:amenities,id',
        ]);

        $data = $request->only([
            'name',
            'price',
            'slug',
            'description',
            'identification',
            'bedrooms',
            'bathrooms',
            'totalMeters',
            'builtMeters',
            'garages',
            'direction',
            'status',
            'types_properties_id',
            'phy_states_id',
            'types_businesses_id',
            'country_id',
            'state_id',
            'city_id',
        ]);

        // Actualizar la propiedad
        $property->update($data);
        // Sincronizar amenities (many-to-many)
        if ($request->has('amenity')) {
            $property->amenities()->sync($request->input('amenity', []));
        }

        // Manejo de imágenes: Agregar nuevas
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            foreach ($images as $image) {
                $property->addMedia($image)->toMediaCollection('images');
            }
        }
        // Manejo de imágenes: Eliminar específicas
        if ($request->has('images_to_delete') && is_array($request->input('images_to_delete'))) {
            $mediaIdsToDelete = $request->input('images_to_delete');
            foreach ($mediaIdsToDelete as $mediaId) {
                $media = Media::where('id', $mediaId)
                    ->where('model_type', Property::class)
                    ->where('model_id', $property->id)
                    ->where('collection_name', 'images')
                    ->first();
                if ($media) {
                    $media->delete();
                }
            }
        }

        return to_route('properties.edit', $property);
    }

    public function updateImages(Request $request, Property $property)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para múltiples imágenes
        ]);
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            foreach ($images as $image) {
                $property->addMedia($image)->toMediaCollection('images');
            }
        }
        return back()->with('success', 'Imágenes agregadas correctamente.');
    }

    public function deleteImage(Request $request, Property $property, Media $media)
    {
        // Verificar que la media pertenezca a la propiedad y a la colección 'images'
        if ($media->model_type === Property::class && $media->model_id === $property->id && $media->collection_name === 'images') {
            $media->delete();
            return back()->with('success', 'Imagen eliminada correctamente.');
        }
        return back()->withErrors(['error' => 'No se pudo eliminar la imagen.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        // Eliminar las amenidades asociadas a la propiedad
        PropertyAmenity::where('property_id', $property->id)->delete();

        // Eliminar la imagen principal si no es la imagen por defecto
        if ($property->main && $property->main !== 'default.jpg') {
            $mainImagePath = public_path('img/properties/' . basename($property->main));
            if (file_exists($mainImagePath)) {
                @unlink($mainImagePath);
            }
        }

        // Eliminar las imágenes de la galería si no son la imagen por defecto
        if ($property->images && $property->images !== 'default.jpg') {
            // Decodificar el JSON de imágenes
            $images = json_decode($property->images, true);

            // Eliminar cada imagen individualmente
            foreach ($images as $image) {
                $imagePath = public_path('img/properties/' . basename($image['name']));
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
            }
        }

        // Eliminar la propiedad de la base de datos
        $property->delete();
    }
}
