<?php

use App\Http\Controllers\CitiesController;
use App\Http\Controllers\CountriesController;
use App\Http\Controllers\PhyStatesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatesController;
use App\Http\Controllers\TypesBusinessesController;
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
});

require __DIR__ . '/auth.php';
