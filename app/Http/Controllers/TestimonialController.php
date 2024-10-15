<?php

namespace App\Http\Controllers;

use App\Http\Requests\Testimonials\StoreRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonial = Testimonial::all();

        return Inertia::render('Testimonials/Index', compact('testimonial'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Testimonials/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name','text');

        // AGREGAR avatar
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $nombreavatar = $avatar->getClientOriginalName();
            $avatar->move(public_path('img/testimonials'), $nombreavatar);
            $data['avatar'] = $nombreavatar;
        } else {
            $data['avatar'] = "default.jpg";
        }

        Testimonial::create($data);

        return to_route('testimonial.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Testimonials/Edit', compact('testimonial'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->only('name', 'text');

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $nombreavatar = $avatar->getClientOriginalName();
            $avatar->move(public_path('img/testimonials'), $nombreavatar);
            $data['avatar'] = $nombreavatar;
            if ($testimonial->avatar != 'default.jpg') {
                // Delete the existing avatar
                unlink(public_path('img/testimonials/' . $testimonial->avatar));
                
            }
        }

        $testimonial->update($data);

        return to_route('testimonial.edit', $testimonial);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar != 'default.jpg') {
            // Delete the existing avatar
            unlink(public_path('img/testimonials/' . $testimonial->avatar));
        }

        $testimonial->delete();
    }
}
