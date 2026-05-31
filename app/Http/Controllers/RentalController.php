<?php

namespace App\Http\Controllers;

use App\Http\Requests\Rentals\StoreRentalRequest;
use App\Http\Requests\Rentals\UpdateRentalRequest;
use App\Http\Requests\Rentals\StorePaymentRequest;
use App\Models\Rental;
use App\Models\RentalPayment;
use App\Models\RentalRenewal;
use App\Models\Property;
use App\Models\Contacts;
use App\Models\TypesBusinesses;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RentalController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin.rentals.index')->only('index');
        $this->middleware('can:admin.rentals.create')->only('create', 'store');
        $this->middleware('can:admin.rentals.edit')->only('edit', 'update');
        $this->middleware('can:admin.rentals.delete')->only('destroy');
    }

    public function index(Request $request): Response
    {
        $statusFilter = $request->query('status');
        $user = Auth::user();

        $query = Rental::select('id', 'property_id', 'tenant_id', 'user_id', 'start_date', 'end_date', 'monthly_rent', 'payment_day', 'status', 'created_at')
            ->with([
                'property:id,name,slug,status',
                'property.media' => fn($q) => $q->where('collection_name', 'images'),
                'tenant:id,name,email,phone',
                'agent:id,name',
            ]);

        if ($statusFilter && $statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        $rentals = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        $statuses = [
            ['name' => 'Pendiente', 'slug' => 'pending'],
            ['name' => 'Activo', 'slug' => 'active'],
            ['name' => 'Vencido', 'slug' => 'expired'],
            ['name' => 'Terminado', 'slug' => 'terminated'],
        ];

        return Inertia::render('Rentals/Index', [
            'rentals' => $rentals,
            'statuses' => $statuses,
            'statusFilter' => $statusFilter ?? 'all',
        ]);
    }

    public function create(): Response
    {
        $rentalTypeId = TypesBusinesses::where('name', 'En alquiler')->value('id');

        $properties = Property::select('id', 'name', 'slug', 'price', 'status')
            ->with(['media' => fn($q) => $q->where('collection_name', 'images')])
            ->where('types_businesses_id', $rentalTypeId)
            ->where('status', '1')
            ->whereDoesntHave('rentals', fn($q) => $q->whereIn('status', ['pending', 'active']))
            ->get();

        $agents = User::select('id', 'name')->get();

        return Inertia::render('Rentals/Create', [
            'properties' => $properties,
            'agents' => $agents,
        ]);
    }

    public function store(StoreRentalRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $rental = Rental::create($data);

        $rental->renewals()->create([
            'start_date' => $rental->start_date,
            'end_date' => $rental->end_date,
            'monthly_rent' => $rental->monthly_rent,
            'payment_day' => $rental->payment_day,
        ]);

        if ($rental->status === 'active') {
            $this->generatePayments($rental);
        }

        Property::where('id', $rental->property_id)->update(['status' => '3']);

        return to_route('rentals.edit', $rental);
    }

    public function show(Rental $rental): Response
    {
        $rental->load([
            'property' => fn($q) => $q->with(['media' => fn($m) => $m->where('collection_name', 'images'), 'country:id,name', 'state:id,name', 'city:id,name']),
            'tenant',
            'agent',
            'payments' => fn($q) => $q->orderBy('due_date', 'asc'),
            'renewals',
        ]);

        return Inertia::render('Rentals/Show', [
            'rental' => $rental,
        ]);
    }

    public function edit(Rental $rental): Response
    {
        $rental->load([
            'property:id,name,slug,status',
            'property.media' => fn($q) => $q->where('collection_name', 'images'),
            'tenant:id,name,email,phone',
            'agent:id,name',
        ]);

        $rentalTypeId = TypesBusinesses::where('name', 'En alquiler')->value('id');

        $properties = Property::select('id', 'name', 'slug', 'price', 'status')
            ->with(['media' => fn($q) => $q->where('collection_name', 'images')])
            ->where('types_businesses_id', $rentalTypeId)
            ->whereIn('status', ['1', '3'])
            ->whereDoesntHave('rentals', fn($q) => $q
                ->whereIn('status', ['pending', 'active'])
                ->where('id', '!=', $rental->id)
            )
            ->get();

        $agents = User::select('id', 'name')->get();

        return Inertia::render('Rentals/Edit', [
            'rental' => $rental,
            'properties' => $properties,
            'agents' => $agents,
        ]);
    }

    public function update(UpdateRentalRequest $request, Rental $rental)
    {
        $data = $request->validated();
        $rental->update($data);

        if ($rental->wasChanged('monthly_rent') && $rental->status === 'active') {
            $rental->payments()->where('status', 'pending')->update(['amount' => $rental->monthly_rent]);
        }

        if ($rental->wasChanged('status') && $rental->status !== 'active') {
            Property::where('id', $rental->property_id)->where('status', '3')->update(['status' => '1']);
        }

        if ($rental->status === 'active') {
            Property::where('id', $rental->property_id)->where('status', '1')->update(['status' => '3']);
        }

        return to_route('rentals.edit', $rental);
    }

    public function destroy(Rental $rental)
    {
        $propertyId = $rental->property_id;
        $rental->payments()->delete();
        $rental->delete();

        Property::where('id', $propertyId)->where('status', '3')->update(['status' => '1']);

        return to_route('rentals.index');
    }

    public function renew(Request $request, Rental $rental)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $renewal = $rental->renewals()->create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'monthly_rent' => $rental->monthly_rent,
            'payment_day' => $rental->payment_day,
        ]);

        $this->generatePayments($rental, $renewal->start_date, $renewal->end_date);

        return to_route('rentals.show', $rental);
    }

    public function storePayment(StorePaymentRequest $request, Rental $rental)
    {
        $data = $request->validated();
        $data['rental_id'] = $rental->id;

        $payment = RentalPayment::create($data);

        if ($payment->paid_date && $payment->status === 'paid') {
            $amount = $payment->amount + ($payment->late_fee ?? 0);
            $payment->update(['amount' => $amount]);
        }

        return to_route('rentals.show', $rental);
    }

    public function markPayment(Rental $rental, RentalPayment $payment)
    {
        $payment->update([
            'status' => 'paid',
            'paid_date' => now()->format('Y-m-d'),
        ]);

        return to_route('rentals.show', $rental);
    }

    public function getProperties(Request $request)
    {
        $term = $request->query('q');
        $rentalTypeId = TypesBusinesses::where('name', 'En alquiler')->value('id');

        $properties = Property::select('id', 'name', 'slug')
            ->where('types_businesses_id', $rentalTypeId)
            ->where('status', '1')
            ->whereDoesntHave('rentals', fn($q) => $q->whereIn('status', ['pending', 'active']))
            ->when($term, fn($q) => $q->where('name', 'like', "%{$term}%"))
            ->limit(20)
            ->get();

        return response()->json($properties);
    }

    public function getContacts(Request $request)
    {
        $term = $request->query('q');
        $contacts = Contacts::select('id', 'name', 'email', 'phone')
            ->when($term, fn($q) => $q->where('name', 'like', "%{$term}%")
                ->orWhere('email', 'like', "%{$term}%")
                ->orWhere('phone', 'like', "%{$term}%"))
            ->limit(20)
            ->get();

        return response()->json($contacts);
    }

    private function generatePayments(Rental $rental, ?string $startDate = null, ?string $endDate = null)
    {
        $start = Carbon::parse($startDate ?? $rental->start_date);
        $end = $endDate ? Carbon::parse($endDate) : $start->copy()->addYear();
        $paymentDay = (int) $rental->payment_day;

        $current = $start->copy()->startOfMonth();
        if ($paymentDay < $start->day) {
            $current->addMonth();
        }
        $current->day(min($paymentDay, $current->daysInMonth));

        while ($current <= $end) {
            $periodStart = $current->copy()->startOfMonth();
            $periodEnd = $current->copy()->endOfMonth();

            RentalPayment::create([
                'rental_id' => $rental->id,
                'amount' => $rental->monthly_rent,
                'due_date' => $current->format('Y-m-d'),
                'period_start' => $periodStart->format('Y-m-d'),
                'period_end' => $periodEnd->format('Y-m-d'),
                'status' => 'pending',
            ]);

            $current->addMonth();
        }
    }
}
