import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import ProductsList from '@/Components/ProductsLists';
import { useState, useEffect } from "react";
import { Label } from "@/Components/ui/label";
import { Select } from "@headlessui/react";
import PaginationPage from "@/Components/PaginationPage";
import LocationSelect from "@/Components/LocationSelect";

export default function PropertiesList({
    auth,
    setting,
    pages,
    properties,
    countries,
    states,
    cities,
    phyStates,
    typeBusinesses,
    typeProperties,
    filters: initialFilters = {}, // filtros iniciales desde props
}) {
    // console.log(properties)
    const [filters, setFilters] = useState({
        priceRange: [0, 100000000000000],
        country: '',
        state: '',
        city: '',
        phyState: '',
        typeBusiness: '',
        typeProperty: '',
        ...initialFilters, // inicializa con filtros que vienen del servidor
    });

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    // Actualizar filtros si cambian los props iniciales (opcional)
    // useEffect(() => {
    //     setFilters(prev => ({ ...prev, ...initialFilters }));
    // }, [initialFilters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (name === "minPrice" || name === "maxPrice") {
            const newPriceRange = [...filters.priceRange];
            if (name === "minPrice") {
                newPriceRange[0] = value ? parseFloat(value) : 0;
            } else {
                newPriceRange[1] = value ? parseFloat(value) : 100000000000000;
            }
            setFilters((prev) => ({
                ...prev,
                priceRange: newPriceRange,
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        setCurrentPage(1); // resetear página al cambiar filtro
    };

    // Filtrar propiedades según filtros
    const filteredProperties = properties.filter((property) => {
        const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
        const matchesCountry = filters.country ? property.country?.id === parseInt(filters.country) : true;
        const matchesState = filters.state ? property.state?.id === parseInt(filters.state) : true;
        const matchesCity = filters.city ? property.city?.id === parseInt(filters.city) : true;
        const matchesPhyState = filters.phyState ? property?.phy_states_id === parseInt(filters.phyState) : true;
        const matchesTypeBusiness = filters.typeBusiness ? property?.types_businesses_id === parseInt(filters.typeBusiness) : true;
        const matchesTypeProperty = filters.typeProperty ? property?.types_properties_id === parseInt(filters.typeProperty) : true;

        return matchesPrice && matchesCountry && matchesState && matchesCity && matchesPhyState && matchesTypeBusiness && matchesTypeProperty;
    });

    // Paginación
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredProperties.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredProperties.length / postsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Lista de propiedades' />

            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-lg font-bold mb-4">Filtros</h2>
                <div className="grid grid-cols-4 gap-4 mb-8">

                    <div>
                        <Label htmlFor="typeProperty">Tipo de propiedad</Label>
                        <Select name="typeProperty" id="typeProperty" onChange={handleFilterChange} value={filters.typeProperty} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {typeProperties.map((typeProperty) => (
                                <option className="capitalize" key={typeProperty.id} value={typeProperty.id}>{typeProperty.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="minPrice">Rango de precios</Label>
                        <div className="flex">
                            <input type="number" name="minPrice" placeholder="Mínimo" onChange={handleFilterChange} className="w-1/2 rounded-s-full" />
                            <input type="number" name="maxPrice" placeholder="Máximo" onChange={handleFilterChange} className="w-1/2 rounded-e-full" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="phyState">Estado físico</Label>
                        <Select name="phyState" onChange={handleFilterChange} value={filters.phyState} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {phyStates.map((phyState) => (
                                <option className="capitalize" key={phyState.id} value={phyState.id}>{phyState.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="typeBusiness">Tipo de negocio</Label>
                        <Select name="typeBusiness" onChange={handleFilterChange} value={filters.typeBusiness} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {typeBusinesses.map((typeBusiness) => (
                                <option className="capitalize" key={typeBusiness.id} value={typeBusiness.id}>{typeBusiness.name}</option>
                            ))}
                        </Select>
                    </div>

                    <LocationSelect
                        className="contents"
                        hasAllOption={true}
                        countries={countries}
                        states={states}
                        cities={cities}
                        data={{
                            country_id: filters.country,
                            state_id: filters.state,
                            city_id: filters.city
                        }}
                        setData={(keyOrUpdater, val) => {
                            if (typeof keyOrUpdater === 'function') {
                                const simData = { country_id: filters.country, state_id: filters.state, city_id: filters.city };
                                const result = keyOrUpdater(simData);
                                setFilters(prev => ({
                                    ...prev,
                                    country: result.country_id !== undefined ? result.country_id : prev.country,
                                    state: result.state_id !== undefined ? result.state_id : prev.state,
                                    city: result.city_id !== undefined ? result.city_id : prev.city,
                                }));
                                setCurrentPage(1);
                            } else {
                                const mapKey = { 'country_id': 'country', 'state_id': 'state', 'city_id': 'city' };
                                setFilters(prev => ({
                                    ...prev,
                                    [mapKey[keyOrUpdater] || keyOrUpdater]: val
                                }));
                                setCurrentPage(1);
                            }
                        }}
                    />

                </div>

                <ProductsList data={currentPosts} setting={setting} />

                <PaginationPage
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={nextPage}
                    onPrev={prevPage}
                />
            </div>
        </FrontedLayout>
    );
}
