import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import LocationSelect from '@/Components/LocationSelect';
import { Filter } from 'lucide-react';

function idToSlug(collection) {
  return Object.fromEntries(collection.map((item) => [item.id, item.slug]));
}
function slugToId(collection) {
  return Object.fromEntries(collection.map((item) => [item.slug, item.id]));
}

export default function FilterPropertyDialog({
  filters: initialFilters = {},
  typeProperties = [],
  phyStates = [],
  typeBusinesses = [],
  countries = [],
  states = [],
  cities = [],
  onApply,
  onClear,
}) {
  const [open, setOpen] = useState(false);

  const resetFilters = () => ({
    typeProperty: initialFilters.typeProperty || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    phyState: initialFilters.phyState || '',
    typeBusiness: initialFilters.typeBusiness || '',
    country: initialFilters.country || '',
    state: initialFilters.state || '',
    city: initialFilters.city || '',
  });

  const [localFilters, setLocalFilters] = useState(resetFilters);

  const handleOpenChange = (isOpen) => {
    if (isOpen) setLocalFilters(resetFilters());
    setOpen(isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onApply?.(localFilters);
    setOpen(false);
  };

  const handleClearDialog = () => {
    onClear?.();
    setOpen(false);
  };

  const countryIdToSlug = idToSlug(countries);
  const stateIdToSlug = idToSlug(states);
  const cityIdToSlug = idToSlug(cities);
  const countrySlugToId = slugToId(countries);
  const stateSlugToId = slugToId(states);
  const citySlugToId = slugToId(cities);

  const locationData = {
    country_id: countrySlugToId[localFilters.country]?.toString() || '',
    state_id: stateSlugToId[localFilters.state]?.toString() || '',
    city_id: citySlugToId[localFilters.city]?.toString() || '',
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger nativeButton={true} render={<Button variant="outline" size="sm" />}>
        <Filter className="size-4" />
        Filtros
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtros de propiedades</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="typeProperty">Tipo de propiedad</Label>
            <Select
              value={localFilters.typeProperty}
              onValueChange={(val) => setLocalFilters((prev) => ({ ...prev, typeProperty: val }))}
            >
              <SelectTrigger className="w-full mt-1" id="typeProperty">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {typeProperties.map((tp) => (
                  <SelectItem className="capitalize" key={tp.id} value={tp.slug}>{tp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Rango de precios</Label>
            <div className="flex mt-1 gap-2">
              <Input
                type="number"
                name="minPrice"
                placeholder="Mínimo"
                value={localFilters.minPrice}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="maxPrice"
                placeholder="Máximo"
                value={localFilters.maxPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phyState">Estado físico</Label>
            <Select
              value={localFilters.phyState}
              onValueChange={(val) => setLocalFilters((prev) => ({ ...prev, phyState: val }))}
            >
              <SelectTrigger className="w-full mt-1" id="phyState">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {phyStates.map((ps) => (
                  <SelectItem className="capitalize" key={ps.id} value={ps.slug}>{ps.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="typeBusiness">Tipo de negocio</Label>
            <Select
              value={localFilters.typeBusiness}
              onValueChange={(val) => setLocalFilters((prev) => ({ ...prev, typeBusiness: val }))}
            >
              <SelectTrigger className="w-full mt-1" id="typeBusiness">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {typeBusinesses.map((tb) => (
                  <SelectItem className="capitalize" key={tb.id} value={tb.slug}>{tb.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <LocationSelect
            className="space-y-4"
            hasAllOption={true}
            countries={countries}
            states={states}
            cities={cities}
            data={locationData}
            setData={(keyOrUpdater, val) => {
              if (typeof keyOrUpdater === 'function') {
                const simData = { country_id: locationData.country_id, state_id: locationData.state_id, city_id: locationData.city_id };
                const result = keyOrUpdater(simData);
                setLocalFilters((prev) => ({
                  ...prev,
                  country: countryIdToSlug[parseInt(result.country_id)] || '',
                  state: stateIdToSlug[parseInt(result.state_id)] || '',
                  city: cityIdToSlug[parseInt(result.city_id)] || '',
                }));
              } else {
                const mapKeys = { country_id: 'country', state_id: 'state', city_id: 'city' };
                const slugMap = { country_id: countryIdToSlug, state_id: stateIdToSlug, city_id: cityIdToSlug };
                const slug = slugMap[keyOrUpdater]?.[parseInt(val)] || '';
                setLocalFilters((prev) => ({ ...prev, [mapKeys[keyOrUpdater] || keyOrUpdater]: slug }));
              }
            }}
          />
        </div>

        <DialogFooter className="flex-row gap-2">
          <Button onClick={handleSearch} className="flex-1">Buscar</Button>
          <Button variant="outline" onClick={handleClearDialog}>Limpiar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
