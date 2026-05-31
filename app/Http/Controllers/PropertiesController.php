<?php

namespace App\Http\Controllers;

use App\Http\Requests\Properties\StoreRequest;
use App\Http\Requests\Properties\UpdateImagesRequest;
use App\Http\Requests\Properties\UpdateRequest;
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
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
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
    public function index(Request $request): Response
    {
        $statusFilter = $request->query('status');

        $query = Property::select('id', 'slug', 'name', 'price', 'identification', 'direction', 'status', 'country_id', 'state_id', 'city_id', 'phy_states_id', 'types_businesses_id', 'types_properties_id', 'user_id', 'created_at')
            ->with([
                'media' => fn($q) => $q->where('collection_name', 'images'),
                'country:id,name',
                'state:id,name',
                'city:id,name',
                'phyState:id,name',
                'typeBusiness:id,name',
                'typeProperty:id,name',
                'user:id,name'
            ]);

        if ($statusFilter !== null && $statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        $properties = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        $statuses = [
            ['name' => 'Borrador', 'slug' => '0'],
            ['name' => 'Activo', 'slug' => '1'],
            ['name' => 'Vendido', 'slug' => '2'],
        ];

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'statuses' => $statuses,
            'statusFilter' => $statusFilter ?? 'all'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $typeProperties = TypesProperties::all();
        $typeBusinesses = TypesBusinesses::all();
        $phyStates = PhyStates::all();
        $amenities = Amenity::all();

        return Inertia::render('Properties/Create', compact('countries', 'states', 'cities', 'typeProperties', 'typeBusinesses', 'phyStates', 'amenities'));
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
        $amenitiesIds = $request->input('amenity', []);
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
    public function edit(Property $property): Response
    {
        $property->load(['media', 'amenities', 'country', 'state', 'city', 'phyState', 'typeProperty', 'typeBusiness']);
        $countries = Countries::all();
        $states = States::all();
        $cities = Cities::all();
        $typeProperties = TypesProperties::all();
        $typeBusinesses = TypesBusinesses::all();
        $users = User::all();
        $phyStates = PhyStates::all();
        $amenities = Amenity::all();

        return Inertia::render('Properties/Edit', compact(
            'property',
            'countries',
            'states',
            'cities',
            'typeProperties',
            'typeBusinesses',
            'users',
            'phyStates',
            'amenities'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Property $property)
    {
        $data = $request->validated();

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

    public function updateImages(UpdateImagesRequest $request, Property $property)
    {
        $request->validated();
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
