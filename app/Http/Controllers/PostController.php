<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posts\StoreRequest;
use App\Models\CategoryPost;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
// dd($posts);
        return Inertia::render('Posts/Index', compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categryposts = CategoryPost::all();

        return Inertia::render('Posts/Create', compact('categryposts'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'content','status', 'extract','category_post_id');
        $data['user_id'] = Auth::id();
        $data['status'] = $request->input('status') === '1' ? true : false;


        // AGREGAR image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/posts'), $nombreImagen);
            $data['image'] = $nombreImagen;
        } else {
            $data['image'] = "default.jpg";
        }

        Post::create($data);

        return to_route('post.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $posts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $posts)
    {
        $categryposts = CategoryPost::all();

        return Inertia::render('Posts/Edit', compact('posts','categryposts'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $posts)
    {
        $data = $request->only('name', 'content', 'status', 'extract', 'category_post_id');
        $data['user_id'] = Auth::id();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = $image->getClientOriginalName();
            $image->move(public_path('img/posts'), $nombreImagen);
            $data['image'] = $nombreImagen;
            if ($posts->image != 'default.jpg') {
                // Delete the existing image
                unlink(public_path('img/posts/' . $posts->image));
            }
        }

        $posts->update($data);

        return to_route('post.edit', $posts);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $posts)
    {
        if ($posts->image != 'default.jpg') {
            // Delete the existing image
            unlink(public_path('img/posts/' . $posts->image));
        }
        $posts->delete();
    }
}
