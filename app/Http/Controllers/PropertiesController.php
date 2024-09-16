<?php

namespace App\Http\Controllers;

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
use Inertia\Inertia;

class PropertiesController extends Controller
{
    /**
     * Display a listing of the resource.s
     */
    public function index()
    {
        $properties = Property::all();

        return Inertia::render('Properties/Index', compact('properties'));
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
        $users = User::all();
        $phystate = PhyStates::all();
        $amenities = Amenity::all();
        $statuses = Status::all();

        return Inertia::render('Properties/Create', compact('country', 'state', 'city', 'typepropety', 'typebusiness', 'users', 'phystate', 'amenities', 'statuses'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request);
        $data = $request->only(
            'name',
            'price',
            'slug',
            'description',
            'bedrooms',
            'bathrooms',
            'totalMeters',
            'builtMeters',
            'garages',
            'direction',
            'status_id',
            'types_properties_id',
            'phy_states_id',
            'types_businesses_id',
            'user_id',
            'country_id',
            'state_id',
            'city_id',
        );

        // $data = $request->input('publish', 0);

        // AGREGAR main
        if ($request->hasFile('main')) {
            $image = $request->file('main');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/properties'), $nombreImagen);
            $data['main'] = $nombreImagen;
        } else {
            $data['main'] = "default.jpg";
        }

        // GUARDA NOMBRE Y GUARDA IMAGENES DE GALLERIA
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            if (is_array($images)) {
                $nombreImagen = [];
                foreach ($images as $index => $image) {
                    $nombreImagen[$index] = [
                        'id' => $index + 1, // Asigna un ID basado en el índice del array
                        'name' => $image->getClientOriginalName()
                    ];
                    $image->move(public_path('img/properties'), $image->getClientOriginalName());
                }
                $jsonImagenes = json_encode($nombreImagen);

                $data['images'] = $jsonImagenes;
            } else {
                $nombreImagen = [
                    'id' => 1, // Asigna un ID de 1 para la única imagen
                    'name' => $images->getClientOriginalName()
                ];
                $images->move(public_path('img/properties'), $images->getClientOriginalName());

                $data['images'] = json_encode($nombreImagen);
            }
        } else {
            $data['images'] = "default.jpg";
        }

        $property = Property::create($data);

        $amenitiesIds = $request->input('amenitiy');
        foreach ($amenitiesIds as $amenityId) {
            PropertyAmenity::create([
                'property_id' => $property->id,
                'amenity_id' => $amenityId,
            ]);
        }

        return to_route('properties.index');
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
        $statuses = Status::all();
        $propertyAmenities = $property->amenities;

        return Inertia::render('Properties/Edit', compact('property','country', 'typepropety', 'typebusiness', 'country', 'state', 'city', 'users', 'phystate', 'amenities', 'statuses','propertyAmenities'));
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
            'bedrooms',
            'bathrooms',
            'totalMeters',
            'builtMeters',
            'garages',
            'direction',
            'status_id',
            'types_properties_id',
            'phy_states_id',
            'types_businesses_id',
            'user_id',
            'country_id',
            'state_id',
            'city_id',
        );

//         // Actualizar imagen principal
//     if ($request->hasFile('main')) {
//         // Eliminar imagen principal anterior
//         if ($property->main != 'default.jpg') {
//             unlink(public_path('img/properties/' . $property->main));
//         }

//         $propertyId = $property->id;
//     $folderPath = 'img/properties/property_' . $propertyId;
//     $image = $request->file('main');
//     $imageName = $image->getClientOriginalName();
//     $image->move(public_path($folderPath), $imageName);
//     $data['main'] = $imageName;
//     }

//     // Actualizar imágenes de galería
// if ($request->hasFile('images')) {
//     // Eliminar imágenes de galería anteriores
//     $imagenesAnteriores = json_decode($property->images, true);
//     if ($imagenesAnteriores !== null) {
//         foreach ($imagenesAnteriores as $imagen) {
//             unlink(public_path('img/properties/' . $imagen['name']));
//         }
//     }

//     $images = $request->file('images');
//     $nombreImagenes = [];
//     foreach ($images as $index => $image) {
//         $nombreImagenes[$index] = [
//             'id' => $index + 1, // Asigna un ID basado en el índice del array
//             'name' => $image->getClientOriginalName()
//         ];
//         $image->move(public_path('img/properties'), $image->getClientOriginalName());
//     }
//     $jsonImagenes = json_encode($nombreImagenes);
//     $data['images'] = $jsonImagenes;
// }


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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $property->delete();
    }
}
