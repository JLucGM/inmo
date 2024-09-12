<?php

use App\Http\Controllers\PhyStatesController;
use App\Http\Controllers\ProfileController;
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
});

require __DIR__ . '/auth.php';
