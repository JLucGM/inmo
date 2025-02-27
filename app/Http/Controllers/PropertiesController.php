<?php

namespace App\Http\Controllers;

use App\Http\Requests\Properties\StoreRequest;
use App\Models\Amenities;
use App\Models\Amenity;
use App\Models\Cities;
use App\Models\Countries;
use App\Models\PhyStates;
use App\Models\Properties;
use App\Models\Property;
use App\Models\PropertyAmenity;
use App\Models\States;
use App\Models\Status;
use App\Models\TypesBusinesses;
use App\Models\TypesProperties;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $properties = Property::with('country', 'state', 'city', 'phyState', 'typeBusiness', 'typeProperty', 'user')->get();
        
        $user = Auth::user();
        
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Properties/Index', compact('properties','role','permission'));
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

        return Inertia::render('Properties/Create', compact('country', 'state', 'city', 'typepropety', 'typebusiness', 'phystate', 'amenities','role','permission'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        //dd($request);
        $data = $request->only(
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
        );

        $data['user_id'] = Auth::id();

        // AGREGAR main
        // Manejo de la imagen principal
        if ($request->hasFile('main')) {
            $image = $request->file('main');
            $nombreImagen = time() . '-' . $image->getClientOriginalName();
            $image->move(public_path('img/properties'), $nombreImagen);
            $data['main'] = asset('img/properties/' . $nombreImagen); // Guarda la URL completa
        } else {
            $data['main'] = asset('img/properties/default.jpg'); // Guarda la URL del default si no hay imagen
        }

        // Manejo de las imágenes de galería
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            $nombreImagenes = [];

            if (is_array($images)) {
                foreach ($images as $index => $image) {
                    $nombreImagen = time() . '-' . $image->getClientOriginalName();
                    $image->move(public_path('img/properties'), $nombreImagen);
                    $nombreImagenes[] = [
                        'id' => $index + 1, // Asigna un ID basado en el índice del array
                        'name' => asset('img/properties/' . $nombreImagen) // Guarda la URL completa
                    ];
                }
                $data['images'] = json_encode($nombreImagenes);
            } else {
                $nombreImagen = time() . '-' . $images->getClientOriginalName();
                $images->move(public_path('img/properties'), $nombreImagen);
                $data['images'] = json_encode([[
                    'id' => 1, // Asigna un ID de 1 para la única imagen
                    'name' => asset('img/properties/' . $nombreImagen) // Guarda la URL completa
                ]]);
            }
        } else {
            $data['images'] = json_encode([[
                'id' => 1, // ID por defecto si no hay imágenes
                'name' => asset('img/properties/default.jpg') // Guarda la URL del default
            ]]);
        }

        $property = Property::create($data);

        $amenitiesIds = $request->input('amenitiy');
        foreach ($amenitiesIds as $amenityId) {
            PropertyAmenity::create([
                'property_id' => $property->id,
                'amenity_id' => $amenityId,
            ]);
        }

        // return to_route('properties.index');
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
        $country = Countries::all();
        $state = States::all();
        $city = Cities::all();
        $typepropety = TypesProperties::all();
        $typebusiness = TypesBusinesses::all();
        $users = User::all();
        $phystate = PhyStates::all();
        $amenities = Amenity::all();
        $propertyAmenities = $property->amenities;
        $main = $property->main;
        $images = json_decode($property->images);

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Properties/Edit', compact('property', 'country', 'typepropety', 'typebusiness', 'country', 'state', 'city', 'users', 'phystate', 'amenities', 'propertyAmenities', 'images', 'main','role','permission'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        $data = $request->only(
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
        );

        $data['user_id'] = Auth::id();

        if ($request->has('amenity')) {
            $currentAmenities = $property->amenities->pluck('id')->toArray();
            $newAmenities = $request->input('amenity');

            // Remove amenities that are no longer selected
            $amenitiesToRemove = array_diff($currentAmenities, $newAmenities);
            $property->amenities()->detach($amenitiesToRemove);

            // Add new amenities
            $property->amenities()->sync($newAmenities);
        }
        $property->update($data);

        return to_route('properties.edit', $property);
    }

    public function updateImages(Request $request, $id)
    {
        $property = Property::find($id);

        //dd($request->images);
        if ($request->hasFile('main')) {
            // Eliminar la imagen principal anterior
            if ($property->main && file_exists(public_path("/img/properties/" . basename($property->main)))) {
                @unlink(public_path("/img/properties/" . basename($property->main)));
            }

            $mainImage = $request->file('main');
            $mainImageName = time() . '-' . $mainImage->getClientOriginalName();
            $mainImage->move(public_path("/img/properties/"), $mainImageName);

            // Guardar la URL completa de la imagen principal
            $property->main = asset('img/properties/' . $mainImageName);
        }

        if ($request->hasFile('images')) {
            $images = [];
            $files = $request->file('images');

            // Check if $files is an array (multiple files) or a single file instance
            if (is_array($files)) {
                foreach ($files as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $uploadSuccess = $file->move(public_path("/img/properties/"), $filename);

                    if ($uploadSuccess) {
                        $images[] = [
                            'id' => count(json_decode($property->images, true)) + 1,
                            'name' => asset('img/properties/' . $filename), // Guarda la URL completa
                        ];
                    }
                }
            } else {
                // Carga de un solo archivo
                $filename = time() . '-' . $files->getClientOriginalName();
                $uploadSuccess = $files->move(public_path("/img/properties/"), $filename);

                if ($uploadSuccess) {
                    $images[] = [
                        'id' => count(json_decode($property->images, true)) + 1,
                        'name' => asset('img/properties/' . $filename), // Guarda la URL completa
                    ];
                }
            }

            $existingImages = json_decode($property->images, true);
            $property->images = json_encode(array_merge($existingImages, $images));
        }

        // Save changes
        $property->save();

        return redirect()->route('properties.edit', $property)
            ->with('property', $property)
            ->with('images', $property->images)
            ->with('success', 'Imagenes guardadas correctamente');
    }

    public function deleteImage($id, $imageId)
    {
        $property = Property::findOrFail($id);

        $images = json_decode($property->images, true);

        if (!is_array($images)) {
            return redirect()->back()->with('error', 'No se pudo eliminar la imagen. El arreglo de imágenes no es válido.');
        }

        // Buscar la posición de la imagen a eliminar
        $position = array_search($imageId, array_column($images, 'id'));

        if ($position !== false) {
            // Obtener la ruta completa de la imagen
            $imagePath = public_path("/img/properties/" . basename($images[$position]['name']));

            // Eliminar el archivo si existe
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }

            // Eliminar la imagen del array y reindexar
            unset($images[$position]);
            $images = array_values($images);
            $property->images = json_encode($images);
            $property->save();

            return redirect()->back()->with('success', 'Imagen eliminada correctamente');
        }

        return redirect()->back()->with('error', 'No se pudo encontrar la imagen para eliminar');
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
