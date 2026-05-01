import { Label } from '@/Components/ui/label';
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { useEffect } from 'react';

export default function LocationSelect({ 
    countries = [], 
    states = [], 
    cities = [], 
    data, 
    setData, 
    errors = {},
    className = "space-y-4",
    hasAllOption = false
}) {
    // Convertir de forma segura los valores actuales a string para la validación estricta de Base UI
    const selectedCountry = data.country_id?.toString() || "";
    const selectedState = data.state_id?.toString() || "";
    const selectedCity = data.city_id?.toString() || "";

    // Derivar opciones filtradas directamente del estado sincronizado
    const filteredStates = states?.filter(s => s.country_id?.toString() === selectedCountry) || [];
    const filteredCities = cities?.filter(c => c.state_id?.toString() === selectedState) || [];

    const handleCountryChange = (val) => {
        const finalVal = val === "all" ? "" : val;
        // Usar sintaxis atómica/callback de setData para evitar colisiones
        setData(prev => ({
            ...prev,
            country_id: finalVal,
            state_id: "",
            city_id: ""
        }));
    };

    const handleStateChange = (val) => {
        const finalVal = val === "all" ? "" : val;
        setData(prev => ({
            ...prev,
            state_id: finalVal,
            city_id: ""
        }));
    };

    const handleCityChange = (val) => {
        const finalVal = val === "all" ? "" : val;
        setData('city_id', finalVal);
    };

    return (
        <div className={className}>
            <div>
                <Label htmlFor="country_id">País</Label>
                <ShadcnSelect value={selectedCountry || (hasAllOption ? "all" : "")} onValueChange={handleCountryChange}>
                    <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar país" /></SelectTrigger>
                    <SelectContent>
                        {hasAllOption && <SelectItem value="all">Todos</SelectItem>}
                        {countries?.map(c => (
                            <SelectItem value={c.id.toString()} key={c.id}>{c.name}</SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
                {errors.country_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.country_id}</AlertDescription></Alert>}
            </div>
            <div>
                <Label htmlFor="state_id">Estado / Región</Label>
                <ShadcnSelect value={selectedState || (hasAllOption ? "all" : "")} onValueChange={handleStateChange} disabled={!selectedCountry && !hasAllOption}>
                    <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                    <SelectContent>
                        {hasAllOption && <SelectItem value="all">Todos</SelectItem>}
                        {filteredStates?.map(s => (
                            <SelectItem value={s.id.toString()} key={s.id}>{s.name}</SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
                {errors.state_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.state_id}</AlertDescription></Alert>}
            </div>
            <div>
                <Label htmlFor="city_id">Ciudad</Label>
                <ShadcnSelect value={selectedCity || (hasAllOption ? "all" : "")} onValueChange={handleCityChange} disabled={!selectedState && !hasAllOption}>
                    <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Seleccionar ciudad" /></SelectTrigger>
                    <SelectContent>
                        {hasAllOption && <SelectItem value="all">Todos</SelectItem>}
                        {filteredCities?.map(c => (
                            <SelectItem value={c.id.toString()} key={c.id}>{c.name}</SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
                {errors.city_id && <Alert variant="destructive" className="mt-2 py-2"><AlertDescription>{errors.city_id}</AlertDescription></Alert>}
            </div>
        </div>
    );
}
