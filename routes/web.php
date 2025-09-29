<?php

use App\Http\Controllers\AmenitiesController;
use App\Http\Controllers\CategoryPostController;
use App\Http\Controllers\CitiesController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\CountriesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\InfowebController;
use App\Http\Controllers\OriginsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PhyStatesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertiesController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SlideController;
use App\Http\Controllers\StatesController;
use App\Http\Controllers\StatusContactController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\TypesBusinessesController;
use App\Http\Controllers\TypesContactsController;
use App\Http\Controllers\TypesPropertiesController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontendController::class, 'welcome'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

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
    // Rutas para imágenes (agregar nuevas sin eliminar existentes, y eliminar específica)
    Route::post('properties/{property}/images', [PropertiesController::class, 'updateImages'])->name('properties.updateImages');
    Route::delete('properties/{property}/images/{media}', [PropertiesController::class, 'deleteImage'])->name('properties.deleteImage');


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
    Route::post('contacts-properties/cross/{contact_id}/{property_id}', [ContactsController::class, 'cross'])->name('contacts-properties.cross');    //Route::delete('contacts-properties/delete', [ContactsController::class, 'deleteProperty'])->name('contacts-properties.delete');
    Route::get('/contacts/{contactId}/properties', [ContactsController::class, 'getContactProperties'])->name('contacts.get-contact-properties');
    Route::delete('/contacts-properties/{contactId}/{propertyId}', [ContactsController::class, 'deleteProperty'])->name('contacts-properties.delete');

    Route::get('category-post', [CategoryPostController::class, 'index'])->name('category-post.index');
    Route::get('category-post/create', [CategoryPostController::class, 'create'])->name('category-post.create');
    Route::post('category-post', [CategoryPostController::class, 'store'])->name('category-post.store');
    Route::get('category-post/{categoryPost}/edit', [CategoryPostController::class, 'edit'])->name('category-post.edit');
    Route::post('category-post/{categoryPost}', [CategoryPostController::class, 'update'])->name('category-post.update');
    Route::delete('category-post/{categoryPost}', [CategoryPostController::class, 'destroy'])->name('category-post.destroy');

    Route::get('post', [PostController::class, 'index'])->name('post.index');
    Route::get('post/create', [PostController::class, 'create'])->name('post.create');
    Route::post('post', [PostController::class, 'store'])->name('post.store');
    Route::get('post/{posts}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('post/{posts}', [PostController::class, 'update'])->name('post.update');
    Route::delete('post/{posts}', [PostController::class, 'destroy'])->name('post.destroy');

    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::get('settings/create', [SettingController::class, 'create'])->name('settings.create');
    Route::post('settings', [SettingController::class, 'store'])->name('settings.store');
    Route::get('settings/{setting}/edit', [SettingController::class, 'edit'])->name('settings.edit');
    Route::post('settings/{setting}', [SettingController::class, 'update'])->name('settings.update');
    Route::delete('settings/{setting}', [SettingController::class, 'destroy'])->name('settings.destroy');

    Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::get('tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    Route::post('tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::get('calendary', [TaskController::class, 'calendary'])->name('tasks.calendary');

    Route::get('slides', [SlideController::class, 'index'])->name('slides.index');
    Route::get('slides/create', [SlideController::class, 'create'])->name('slides.create');
    Route::post('slides', [SlideController::class, 'store'])->name('slides.store');
    Route::get('slides/{slide}/edit', [SlideController::class, 'edit'])->name('slides.edit');
    Route::post('slides/{slide}', [SlideController::class, 'update'])->name('slides.update');
    Route::delete('slides/{slide}', [SlideController::class, 'destroy'])->name('slides.destroy');
    Route::post('toggle-status/{slide}', [SlideController::class, 'toggleStatus'])->name('slides.toggle-status');

    Route::get('info-web', [InfowebController::class, 'index'])->name('info-web.index');
    Route::get('info-web/create', [InfowebController::class, 'create'])->name('info-web.create');
    Route::post('info-web', [InfowebController::class, 'store'])->name('info-web.store');
    Route::get('info-web/{infoweb}/edit', [InfowebController::class, 'edit'])->name('info-web.edit');
    Route::post('info-web/{infoweb}', [InfowebController::class, 'update'])->name('info-web.update');
    Route::delete('info-web/{infoweb}', [InfowebController::class, 'destroy'])->name('info-web.destroy');

    Route::get('testimonial', [TestimonialController::class, 'index'])->name('testimonial.index');
    Route::get('testimonial/create', [TestimonialController::class, 'create'])->name('testimonial.create');
    Route::post('testimonial', [TestimonialController::class, 'store'])->name('testimonial.store');
    Route::get('testimonial/{testimonial}/edit', [TestimonialController::class, 'edit'])->name('testimonial.edit');
    Route::post('testimonial/{testimonial}', [TestimonialController::class, 'update'])->name('testimonial.update');
    Route::delete('testimonial/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonial.destroy');

    Route::get('pages', [PageController::class, 'index'])->name('pages.index');
    Route::get('pages/create', [PageController::class, 'create'])->name('pages.create');
    Route::post('pages', [PageController::class, 'store'])->name('pages.store');
    Route::get('pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
    Route::post('pages/{page}', [PageController::class, 'update'])->name('pages.update');
    Route::delete('pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy');

    Route::get('faqs', [FaqsController::class, 'index'])->name('faqs.index');
    Route::get('faqs/create', [FaqsController::class, 'create'])->name('faqs.create');
    Route::post('faqs', [FaqsController::class, 'store'])->name('faqs.store');
    Route::get('faqs/{faqs}/edit', [FaqsController::class, 'edit'])->name('faqs.edit');
    Route::post('faqs/{faqs}', [FaqsController::class, 'update'])->name('faqs.update');
    Route::delete('faqs/{faqs}', [FaqsController::class, 'destroy'])->name('faqs.destroy');

    Route::get('documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('documents/create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('documents/{document}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::post('documents/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::delete('documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('roles/create', [RoleController::class, 'create'])->name('roles.create');
    Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
    Route::get('roles/{roles}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    Route::post('roles/{roles}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('roles/{roles}', [RoleController::class, 'destroy'])->name('roles.destroy');
});

Route::get('property/{property}', [FrontendController::class, 'frontendShow'])->name('property.show');
Route::post('contact/{property}', [FrontendController::class, 'storeContact'])->name('storeContact.store');
Route::get('contact', [FrontendController::class, 'ContactPage'])->name('ContactPage.index');
Route::post('contact', [FrontendController::class, 'storeContactPages'])->name('ContactPage.store');
Route::get('faqs', [FrontendController::class, 'faqs'])->name('faqs.show');
Route::get('blog', [FrontendController::class, 'blog'])->name('blog.show');
Route::get('posts/{slug}', [FrontendController::class, 'postsShow'])->name('posts.show');
Route::get('pages/{slug}', [FrontendController::class, 'pagesShow'])->name('pages.show');
Route::get('properties', [FrontendController::class, 'propertiesList'])->name('propertiesList.show');
Route::get('types-properties/{typeProperty}', [FrontendController::class, 'typePropertiesList'])->name('typePropertiesList.show');

require __DIR__ . '/auth.php';
