<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page = Page::all();

        return Inertia::render('Pages/Index', compact('page'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name','body','status');

        // AGREGAR image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/pages'), $nombreImagen);
            $data['image'] = $nombreImagen;
        }

        Page::create($data);

        return to_route('pages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        return Inertia::render('Pages/Edit', compact('page'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        $data = $request->only('name','body','status');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/pages'), $nombreImagen);
            $data['image'] = $nombreImagen;
            if ($page->image != 'default.jpg') {
                // Delete the existing image
                unlink(public_path('img/pages/' . $page->image));
            }
        } 

        $page->update($data);

        return to_route('pages.edit', $page);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        if ($page->image && $page->image != 'default.jpg' && file_exists(public_path('img/pages/' . $page->image))) {
            unlink(public_path('img/pages/' . $page->image));
        }

        $page->delete();

    }
}
