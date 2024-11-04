<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posts\StoreRequest;
use App\Models\CategoryPost;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.posts.index')->only('index');
        $this->middleware('can:admin.posts.create')->only('create', 'store');
        $this->middleware('can:admin.posts.edit')->only('edit', 'update');
        $this->middleware('can:admin.posts.delete')->only('destroy');
    }
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
        $data = $request->only('name', 'content', 'status', 'extract', 'category_post_id');
        $data['user_id'] = Auth::id();
        $data['status'] = $request->input('status') === '1' ? true : false;


        // AGREGAR image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/posts'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/posts/' . $nombreImagen); // Guarda la URL completa
        } else {
            $data['image'] = asset('img/posts/default.jpg'); // Guarda la URL del default si no hay imagen
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

        return Inertia::render('Posts/Edit', compact('posts', 'categryposts'));
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
            $nombreImagen = time() . '_' . $image->getClientOriginalName(); // Asegúrate de que el nombre sea único
            $image->move(public_path('img/posts'), $nombreImagen);

            // Guardar la ruta completa
            $data['image'] = asset('img/posts/' . $nombreImagen); // Guarda la URL completa

            // Eliminar la imagen anterior si no es la imagen por defecto
            if ($posts->image != asset('img/posts/default.jpg')) {
                unlink(public_path('img/posts/' . basename($posts->image))); // Elimina la imagen anterior
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
        if ($posts->image != asset('img/posts/default.jpg')) {
            // Extraer el nombre del archivo de la URL completa
            $nombreImagen = basename($posts->image);

            // Delete the existing image
            unlink(public_path('img/posts/' . $nombreImagen));
        }
        $posts->delete();
    }
}
