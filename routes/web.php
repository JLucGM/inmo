<?php

use App\Http\Controllers\AmenitiesController;
use App\Http\Controllers\CategoryAmenitiesController;
use App\Http\Controllers\CategoryPostController;
use App\Http\Controllers\CitiesController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\CountriesController;
use App\Http\Controllers\OriginsController;
use App\Http\Controllers\PhyStatesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertiesController;
use App\Http\Controllers\StatesController;
use App\Http\Controllers\StatusContactController;
use App\Http\Controllers\TypesBusinessesController;
use App\Http\Controllers\TypesContactsController;
use App\Http\Controllers\TypesPropertiesController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('users', [UserController::class, 'index'])->name('user.index');
    Route::get('users/create', [UserController::class, 'create'])->name('user.create');
    Route::post('users', [UserController::class, 'store'])->name('user.store');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::post('users/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('user.destroy');
    
    Route::get('typesproperties', [TypesPropertiesController::class, 'index'])->name('typesproperties.index');
    Route::get('typesproperties/create', [TypesPropertiesController::class, 'create'])->name('typesproperties.create');
    Route::post('typesproperties', [TypesPropertiesController::class, 'store'])->name('typesproperties.store');
    Route::get('typesproperties/{typeproperty}/edit', [TypesPropertiesController::class, 'edit'])->name('typesproperties.edit');
    Route::post('typesproperties/{typeproperty}', [TypesPropertiesController::class, 'update'])->name('typesproperties.update');
    Route::delete('typesproperties/{typeproperty}', [TypesPropertiesController::class, 'destroy'])->name('typesproperties.destroy');
    
    Route::get('phyStates', [PhyStatesController::class, 'index'])->name('phyStates.index');
    Route::get('phyStates/create', [PhyStatesController::class, 'create'])->name('phyStates.create');
    Route::post('phyStates', [PhyStatesController::class, 'store'])->name('phyStates.store');
    Route::get('phyStates/{phyState}/edit', [PhyStatesController::class, 'edit'])->name('phyStates.edit');
    Route::post('phyStates/{phyState}', [PhyStatesController::class, 'update'])->name('phyStates.update');
    Route::delete('phyStates/{phyState}', [PhyStatesController::class, 'destroy'])->name('phyStates.destroy');
    
    Route::get('typesBusinesses', [TypesBusinessesController::class, 'index'])->name('typesBusinesses.index');
    Route::get('typesBusinesses/create', [TypesBusinessesController::class, 'create'])->name('typesBusinesses.create');
    Route::post('typesBusinesses', [TypesBusinessesController::class, 'store'])->name('typesBusinesses.store');
    Route::get('typesBusinesses/{typesBusiness}/edit', [TypesBusinessesController::class, 'edit'])->name('typesBusinesses.edit');
    Route::post('typesBusinesses/{typesBusiness}', [TypesBusinessesController::class, 'update'])->name('typesBusinesses.update');
    Route::delete('typesBusinesses/{typesBusiness}', [TypesBusinessesController::class, 'destroy'])->name('typesBusinesses.destroy');
    
    Route::get('countries', [CountriesController::class, 'index'])->name('countries.index');
    Route::get('countries/create', [CountriesController::class, 'create'])->name('countries.create');
    Route::post('countries', [CountriesController::class, 'store'])->name('countries.store');
    Route::get('countries/{country}/edit', [CountriesController::class, 'edit'])->name('countries.edit');
    Route::post('countries/{country}', [CountriesController::class, 'update'])->name('countries.update');
    Route::delete('countries/{country}', [CountriesController::class, 'destroy'])->name('countries.destroy');
    
    Route::get('states', [StatesController::class, 'index'])->name('states.index');
    Route::get('states/create', [StatesController::class, 'create'])->name('states.create');
    Route::post('states', [StatesController::class, 'store'])->name('states.store');
    Route::get('states/{state}/edit', [StatesController::class, 'edit'])->name('states.edit');
    Route::post('states/{state}', [StatesController::class, 'update'])->name('states.update');
    Route::delete('states/{state}', [StatesController::class, 'destroy'])->name('states.destroy');
    
    Route::get('cities', [CitiesController::class, 'index'])->name('cities.index');
    Route::get('cities/create', [CitiesController::class, 'create'])->name('cities.create');
    Route::post('cities', [CitiesController::class, 'store'])->name('cities.store');
    Route::get('cities/{city}/edit', [CitiesController::class, 'edit'])->name('cities.edit');
    Route::post('cities/{city}', [CitiesController::class, 'update'])->name('cities.update');
    Route::delete('cities/{city}', [CitiesController::class, 'destroy'])->name('cities.destroy');
    
    Route::get('amenities', [AmenitiesController::class, 'index'])->name('amenities.index');
    Route::get('amenities/create', [AmenitiesController::class, 'create'])->name('amenities.create');
    Route::post('amenities', [AmenitiesController::class, 'store'])->name('amenities.store');
    Route::get('amenities/{amenity}/edit', [AmenitiesController::class, 'edit'])->name('amenities.edit');
    Route::post('amenities/{amenity}', [AmenitiesController::class, 'update'])->name('amenities.update');
    Route::delete('amenities/{amenity}', [AmenitiesController::class, 'destroy'])->name('amenities.destroy');
    
    Route::get('types-contacts', [TypesContactsController::class, 'index'])->name('typesContacts.index');
    Route::get('types-contacts/create', [TypesContactsController::class, 'create'])->name('typesContacts.create');
    Route::post('types-contacts', [TypesContactsController::class, 'store'])->name('typesContacts.store');
    Route::get('types-contacts/{typesContact}/edit', [TypesContactsController::class, 'edit'])->name('typesContacts.edit');
    Route::post('types-contacts/{typesContact}', [TypesContactsController::class, 'update'])->name('typesContacts.update');
    Route::delete('types-contacts/{typesContact}', [TypesContactsController::class, 'destroy'])->name('typesContacts.destroy');
    
    Route::get('properties', [PropertiesController::class, 'index'])->name('properties.index');
    Route::get('properties/create', [PropertiesController::class, 'create'])->name('properties.create');
    Route::post('properties', [PropertiesController::class, 'store'])->name('properties.store');
    Route::get('properties/{property}/edit', [PropertiesController::class, 'edit'])->name('properties.edit');
    Route::post('properties/{property}', [PropertiesController::class, 'update'])->name('properties.update');
    Route::delete('properties/{property}', [PropertiesController::class, 'destroy'])->name('properties.destroy');
    Route::post('/property/{id}/update-images', [PropertiesController::class, 'updateImages'])->name('property.updateImages');
    Route::post('/property/{id}/delete-image/{imageId}', [PropertiesController::class,'deleteImage'])->name('property.deleteImage');

    Route::get('statuscontacts', [StatusContactController::class, 'index'])->name('statuscontacts.index');
    Route::get('statuscontacts/create', [StatusContactController::class, 'create'])->name('statuscontacts.create');
    Route::post('statuscontacts', [StatusContactController::class, 'store'])->name('statuscontacts.store');
    Route::get('statuscontacts/{statusContact}/edit', [StatusContactController::class, 'edit'])->name('statuscontacts.edit');
    Route::post('statuscontacts/{statusContact}', [StatusContactController::class, 'update'])->name('statuscontacts.update');
    Route::delete('statuscontacts/{statusContact}', [StatusContactController::class, 'destroy'])->name('statuscontacts.destroy');
    
    Route::get('origins', [OriginsController::class, 'index'])->name('origins.index');
    Route::get('origins/create', [OriginsController::class, 'create'])->name('origins.create');
    Route::post('origins', [OriginsController::class, 'store'])->name('origins.store');
    Route::get('origins/{origins}/edit', [OriginsController::class, 'edit'])->name('origins.edit');
    Route::post('origins/{origins}', [OriginsController::class, 'update'])->name('origins.update');
    Route::delete('origins/{origins}', [OriginsController::class, 'destroy'])->name('origins.destroy');
    
    Route::get('contacts', [ContactsController::class, 'index'])->name('contacts.index');
    Route::get('contacts/create', [ContactsController::class, 'create'])->name('contacts.create');
    Route::post('contacts', [ContactsController::class, 'store'])->name('contacts.store');
    Route::get('contacts/{contacts}/edit', [ContactsController::class, 'edit'])->name('contacts.edit');
    Route::post('contacts/{contacts}', [ContactsController::class, 'update'])->name('contacts.update');
    Route::delete('contacts/{contacts}', [ContactsController::class, 'destroy'])->name('contacts.destroy');
    
    Route::get('category-post', [CategoryPostController::class, 'index'])->name('category-post.index');
    Route::get('category-post/create', [CategoryPostController::class, 'create'])->name('category-post.create');
    Route::post('category-post', [CategoryPostController::class, 'store'])->name('category-post.store');
    Route::get('category-post/{categoryPost}/edit', [CategoryPostController::class, 'edit'])->name('category-post.edit');
    Route::post('category-post/{categoryPost}', [CategoryPostController::class, 'update'])->name('category-post.update');
    Route::delete('category-post/{categoryPost}', [CategoryPostController::class, 'destroy'])->name('category-post.destroy');
});

require __DIR__ . '/auth.php';
