<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.setting-generals.index')->only('index');
        // $this->middleware('can:admin.setting-generals.create')->only('create', 'store');
        $this->middleware('can:admin.setting-generals.edit')->only('edit', 'update');
        // $this->middleware('can:admin.setting-generals.delete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $setting = Setting::first();
        $currencies = Currency::all();

        $user = Auth::user();
        $role = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        return Inertia::render('Setting/Edit', compact('setting', 'currencies', 'role', 'permission'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Setting $setting)
    {
        $data = $request->only(
            'name',
            'email',
            'phone',
            'direction',
            'description',
            'titleBlog',
            'titleFaq',
            'titleContact',
            'titleAnunciar',
            'titleTestimonials',
            'descriptionBlog',
            'descriptionFaq',
            'descriptionContact',
            'descriptionAnunciar',
            'descriptionTestimonials',
            'status_banner',
            'status_products_list',
            'status_info_section',
            'status_testimonials',
            'status_team',
            'status_instagram_posts',
            'instagram',
            'token_instagram',
            'titleInfoSection',
            'descriptionInfoSection',
            'titleTeamSection',
            'descriptionTeamSection',

            'currency_id'
        );

        // Manejo del logo
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoName = 'logo-' . time() . '-' . $logo->getClientOriginalName(); // Agregar timestamp para evitar conflictos
            $logo->move(public_path('img/setting'), $logoName);

            // Guardar la ruta completa
            $data['logo'] = asset('img/setting/' . $logoName); // Guarda la URL completa

            // Eliminar el logo existente
            if ($setting->logo && $setting->logo != asset('img/setting/default.png')) {
                $existingLogoPath = public_path('img/setting/' . basename($setting->logo)); // Usar la ruta completa
                if (file_exists($existingLogoPath)) {
                    @unlink($existingLogoPath);
                }
            }
        }

        // Manejo del logo del pie de página
        if ($request->hasFile('logo_footer')) {
            $logoFooter = $request->file('logo_footer');
            $logoFooterName = 'logofooter-' . time() . '-' . $logoFooter->getClientOriginalName();
            $logoFooter->move(public_path('img/setting'), $logoFooterName);

            // Guardar la ruta completa
            $data['logo_footer'] = asset('img/setting/' . $logoFooterName); // Guarda la URL completa

            // Eliminar el logo del pie de página existente
            if ($setting->logo_footer && $setting->logo_footer != asset('img/setting/default.png')) {
                $existingLogoFooterPath = public_path('img/setting/' . basename($setting->logo_footer)); // Usar la ruta completa
                if (file_exists($existingLogoFooterPath)) {
                    @unlink($existingLogoFooterPath);
                }
            }
        }

        // if ($request->hasFile('portadaBlog')) {
        //     $logoFooter = $request->file('portadaBlog');
        //     $logoFooterName = 'logofooter-' . time() . '-' . $logoFooter->getClientOriginalName();
        //     $logoFooter->move(public_path('img/setting'), $logoFooterName);

        //     // Guardar la ruta completa
        //     $data['portadaBlog'] = asset('img/setting/' . $logoFooterName); // Guarda la URL completa

        //     // Eliminar el logo del pie de página existente
        //     if ($setting->portadaBlog && $setting->portadaBlog != asset('img/setting/default.png')) {
        //         $existingLogoFooterPath = public_path('img/setting/' . basename($setting->portadaBlog)); // Usar la ruta completa
        //         if (file_exists($existingLogoFooterPath)) {
        //             @unlink($existingLogoFooterPath);
        //         }
        //     }
        // }

        if ($request->hasFile('portadaContact')) {
            $logoFooter = $request->file('portadaContact');
            $logoFooterName = 'logofooter-' . time() . '-' . $logoFooter->getClientOriginalName();
            $logoFooter->move(public_path('img/setting'), $logoFooterName);

            // Guardar la ruta completa
            $data['portadaContact'] = asset('img/setting/' . $logoFooterName); // Guarda la URL completa

            // Eliminar el logo del pie de página existente
            if ($setting->portadaContact && $setting->portadaContact != asset('img/setting/default.png')) {
                $existingLogoFooterPath = public_path('img/setting/' . basename($setting->portadaContact)); // Usar la ruta completa
                if (file_exists($existingLogoFooterPath)) {
                    @unlink($existingLogoFooterPath);
                }
            }
        }

        if ($request->hasFile('portadaFaq')) {
            $logoFooter = $request->file('portadaFaq');
            $logoFooterName = 'logofooter-' . time() . '-' . $logoFooter->getClientOriginalName();
            $logoFooter->move(public_path('img/setting'), $logoFooterName);

            // Guardar la ruta completa
            $data['portadaFaq'] = asset('img/setting/' . $logoFooterName); // Guarda la URL completa

            // Eliminar el logo del pie de página existente
            if ($setting->portadaFaq && $setting->portadaFaq != asset('img/setting/default.png')) {
                $existingLogoFooterPath = public_path('img/setting/' . basename($setting->portadaFaq)); // Usar la ruta completa
                if (file_exists($existingLogoFooterPath)) {
                    @unlink($existingLogoFooterPath);
                }
            }
        }

        if ($request->hasFile('portadaAnunciar')) {
            $logoFooter = $request->file('portadaAnunciar');
            $logoFooterName = 'logofooter-' . time() . '-' . $logoFooter->getClientOriginalName();
            $logoFooter->move(public_path('img/setting'), $logoFooterName);

            // Guardar la ruta completa
            $data['portadaAnunciar'] = asset('img/setting/' . $logoFooterName); // Guarda la URL completa

            // Eliminar el logo del pie de página existente
            if ($setting->portadaAnunciar && $setting->portadaAnunciar != asset('img/setting/default.png')) {
                $existingLogoFooterPath = public_path('img/setting/' . basename($setting->portadaAnunciar)); // Usar la ruta completa
                if (file_exists($existingLogoFooterPath)) {
                    @unlink($existingLogoFooterPath);
                }
            }
        }

        // Manejo del favicon
        if ($request->hasFile('favicon')) {
            $favicon = $request->file('favicon');
            $faviconName = 'favicon-' . time() . '-' . $favicon->getClientOriginalName();
            $favicon->move(public_path('img/setting'), $faviconName);

            // Guardar la ruta completa
            $data['favicon'] = asset('img/setting/' . $faviconName); // Guarda la URL completa

            // Eliminar el favicon existente
            if ($setting->favicon && $setting->favicon != asset('img/setting/default.png')) {
                $existingFaviconPath = public_path('img/setting/' . basename($setting->favicon)); // Usar la ruta completa
                if (file_exists($existingFaviconPath)) {
                    @unlink($existingFaviconPath);
                }
            }
        }

        // Actualizar los ajustes
        $setting->update($data); // Asegúrate de que $data contiene las rutas correctas

        return to_route('settings.edit', $setting);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
