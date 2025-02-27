<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use App\Models\Property;
use App\Models\StatusContact;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $user = Auth::user(); // Obtener el usuario autenticado



        $startDate = now();
        $endDate = now()->addDays(7);

        // Inicializar la consulta para las tareas
        $taskQuery = Task::with('typeTask', 'statusContact')
            ->whereBetween('start_time', [$startDate, $endDate]);

        // Verificar si el usuario es Super Admin
        if ($user->role === 'super Admin') {
            // Si es Super Admin, no filtramos por user_id
            $tasks = $taskQuery->get();
            $contacts = Contacts::count(); // Contar todos los contactos
            $properties = Property::count(); // Contar todas las propiedades
        } else {
            // Si no es Super Admin, filtramos por user_id
            $tasks = $taskQuery->where('user_id', $userId)->get();
            $contacts = Contacts::where('user_id', $userId)->count(); // Contar contactos del usuario
            $properties = Property::where('user_id', $userId)->count(); // Contar propiedades del usuario
        }

        // Contar las tareas
        $taskCounts = Task::select('status_contacts_id', DB::raw('count(*) as count'))
            ->when($user->role !== 'super Admin', function ($query) use ($userId) {
                return $query->where('user_id', $userId);
            })
            ->groupBy('status_contacts_id')
            ->get()
            ->pluck('count', 'status_contacts_id');

        // Obtener los nombres de estado
        $statusNames = StatusContact::pluck('name', 'id');

        // Formatear los conteos
        $formattedCounts = [];
        foreach ($statusNames as $id => $statusName) {
            $formattedCounts[$statusName] = $taskCounts->get($id, 0);
        }

        // $newStatusId = StatusContact::where('name', 'new')->value('id');s

        $roles = $user->getRoleNames();
        $permission = $user->getAllPermissions();

        $propertiesByMonth = Property::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Transformar los datos para el gráfico
        $monthlyCountsProperties = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthlyCountsProperties[$i] = $propertiesByMonth->where('month', $i)->first()->count ?? 0; // Usa 0 si no hay propiedades en ese mes
        }

        $contactsByMonth = Contacts::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('created_at', now()->year) // Filtra por el año actual
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Transformar los datos para el gráfico
        $monthlyCountsContacts = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthlyCountsContacts[$i] = $contactsByMonth->where('month', $i)->first()->count ?? 0; // Usa 0 si no hay propiedades en ese mes
        }


        return Inertia::render('Dashboard', [
            'taskCounts' => $formattedCounts,
            'contacts' => $contacts,
            'properties' => $properties,
            'tasks' => $tasks,
            'roles' => $roles,
            'permission' => $permission,
            'propertyCounts' => array_values($monthlyCountsProperties),
            'contactsCounts' => array_values($monthlyCountsContacts),

        ]);
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
