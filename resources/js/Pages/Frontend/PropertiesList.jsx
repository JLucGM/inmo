import { useState, useEffect } from 'react';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head, router } from '@inertiajs/react';
import ProductsList from '@/Components/ProductsLists';
import PaginationPage from '@/Components/PaginationPage';
import PropertyMapView from '@/Components/PropertyMapView';
import FilterPropertyDialog from '@/Components/FilterPropertyDialog';

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
    filters: initialFilters = {},
}) {
    const [localFilters, setLocalFilters] = useState(() => ({
        typeProperty: initialFilters.typeProperty || '',
        minPrice: initialFilters.minPrice || '',
        maxPrice: initialFilters.maxPrice || '',
        phyState: initialFilters.phyState || '',
        typeBusiness: initialFilters.typeBusiness || '',
        country: initialFilters.country || '',
        state: initialFilters.state || '',
        city: initialFilters.city || '',
    }));
    const [hoveredPropertyId, setHoveredPropertyId] = useState(null);

    const filtersKey = JSON.stringify(initialFilters);
    useEffect(() => {
        setLocalFilters({
            typeProperty: initialFilters.typeProperty || '',
            minPrice: initialFilters.minPrice || '',
            maxPrice: initialFilters.maxPrice || '',
            phyState: initialFilters.phyState || '',
            typeBusiness: initialFilters.typeBusiness || '',
            country: initialFilters.country || '',
            state: initialFilters.state || '',
            city: initialFilters.city || '',
        });
    }, [filtersKey]);

    const navigateWithFilters = (filters) => {
        const cleaned = Object.fromEntries(
            Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined)
        );
        router.get(route('propertiesList.show'), cleaned, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    const handleSearch = (filters) => {
        navigateWithFilters(filters);
    };

    const handleClear = () => {
        const empty = {
            typeProperty: '', minPrice: '', maxPrice: '',
            phyState: '', typeBusiness: '',
            country: '', state: '', city: '',
        };
        setLocalFilters(empty);
        navigateWithFilters(empty);
    };

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Lista de propiedades' />

            <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Propiedades
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Encuentra la propiedad perfecta usando nuestros filtros.
                                </p>
                            </div>
                            <FilterPropertyDialog
                                filters={localFilters}
                                typeProperties={typeProperties}
                                phyStates={phyStates}
                                typeBusinesses={typeBusinesses}
                                countries={countries}
                                states={states}
                                cities={cities}
                                onApply={handleSearch}
                                onClear={handleClear}
                            />
                        </div>

                        <ProductsList data={properties.data} setting={setting} onCardHover={setHoveredPropertyId} />

                        <PaginationPage links={properties.links} meta={properties.meta} />
                    </div>

                    <div className="hidden lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
                        <PropertyMapView properties={properties.data} hoveredPropertyId={hoveredPropertyId} setting={setting} />
                    </div>
                </div>

                <div className="lg:hidden mt-4 h-72">
                    <PropertyMapView properties={properties.data} hoveredPropertyId={hoveredPropertyId} setting={setting} />
                </div>
            </div>
        </FrontedLayout>
    );
}
