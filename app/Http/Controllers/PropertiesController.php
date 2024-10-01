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
use Illuminate\Support\Facades\Auth;
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
        $phystate = PhyStates::all();
        $amenities = Amenity::all();

        return Inertia::render('Properties/Create', compact('country', 'state', 'city', 'typepropety', 'typebusiness', 'phystate', 'amenities'));
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

        // AGREGAR main
        if ($request->hasFile('main')) {
            $image = $request->file('main');
            $nombreImagen = time() . '-' .$image->getClientOriginalName();
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
                        'name' => time() . '-' .$image->getClientOriginalName()
                    ];
                    $image->move(public_path('img/properties'), time() . '-' .$image->getClientOriginalName());
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
        $propertyAmenities = $property->amenities;
        $main = $property->main;
        $images = json_decode($property->images);

        return Inertia::render('Properties/Edit', compact('property', 'country', 'typepropety', 'typebusiness', 'country', 'state', 'city', 'users', 'phystate', 'amenities', 'propertyAmenities', 'images', 'main',));
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
            // Delete previous main image
            if ($property->main && file_exists(public_path("/img/properties/" . $property->main))) {
                @unlink(public_path("/img/properties/" . $property->main));
            }

            $mainImage = $request->file('main');
            $mainImageName = time() . '-' .$mainImage->getClientOriginalName();
            $mainImage->move(public_path("/img/properties/"), $mainImageName);

            $property->main = $mainImageName;
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
                            'name' => $filename,
                        ];
                    }
                }
            } else {
                // Single file upload
                $filename = time() . '-' . $files->getClientOriginalName();
                $uploadSuccess = $files->move(public_path("/img/properties/"), $filename);

                if ($uploadSuccess) {
                    $images[] = [
                        'id' => count($property->images) + 1,
                        'name' => $filename,
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

        $position = array_search($imageId, array_column($images, 'id'));

        if ($position !== false) {
            $imagePath = public_path("/img/properties/" . $images[$position]['name']);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

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
        PropertyAmenity::where('property_id', $property->id)->delete();

        if ($property->main != 'default.jpg') {
            // Delete the existing main
            unlink(public_path('img/properties/' . $property->main));
        }

        if ($property->images != 'default.jpg') {
            // Decodificar el JSON de imágenes
            $images = json_decode($property->images, true);

            // Eliminar cada imagen individualmente
            foreach ($images as $image) {
                unlink(public_path('img/properties/' . $image['name']));
            }
        }

        $property->delete();
    }
}
