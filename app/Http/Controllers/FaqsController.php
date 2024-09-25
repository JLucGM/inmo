<?php

namespace App\Http\Controllers;

use App\Models\Faqs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faqs = Faqs::all();

        return Inertia::render('Faqs/Index', compact('faqs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Faqs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only('title','content','status');

        Faqs::create($data);

        return to_route('faqs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Faqs $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faqs $faqs)
    {
        return Inertia::render('Faqs/Edit', compact('faqs'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faqs $faqs)
    {
        $data = $request->only('title','content','status');

        $faqs->update($data);

        return to_route('faqs.edit', $faqs);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faqs $faqs)
    {
        $faqs->delete();
    }
}
