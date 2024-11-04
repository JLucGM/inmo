<?php

namespace App\Http\Controllers;

use App\Models\CategoryPost;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class CategoryPostController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.categoriesPost.index')->only('index');
        $this->middleware('can:admin.categoriesPost.create')->only('create','store');
        $this->middleware('can:admin.categoriesPost.edit')->only('edit','update');
        $this->middleware('can:admin.categoriesPost.delete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryPost = CategoryPost::all();

        return Inertia::render('CategoryPosts/Index', compact('categoryPost'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CategoryPosts/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('name');

        CategoryPost::create($data);

        return to_route('category-post.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryPost $categoryPost)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryPost $categoryPost)
    {
        return Inertia::render('CategoryPosts/Edit', compact('categoryPost'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CategoryPost $categoryPost)
    {
        $data = $request->only('name');

        $categoryPost->update($data);

        return to_route('category-post.edit', $categoryPost);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryPost $categoryPost)
    {
        $categoryPost->delete();
    }
}
