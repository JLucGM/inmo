import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import ProductsList from '@/Components/ProductsLists';
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import { Select } from "@headlessui/react";

export default function PropertiesList({ auth, setting, pages, properties, countries, states, cities, phyStates, typeBusinesses, typeProperties }) {
    // console.log(properties.name)
    const [filters, setFilters] = useState({
        priceRange: [0, 1000000],
        country: '',
        state: '',
        city: '',
        phyState: '',
        typeBusiness: '',
        typeProperty: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (name === "minPrice" || name === "maxPrice") {
            const newPriceRange = [...filters.priceRange];
            if (name === "minPrice") {
                newPriceRange[0] = value ? parseFloat(value) : 0;
            } else {
                newPriceRange[1] = value ? parseFloat(value) : 1000000;
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
    };

    const filteredProperties = properties.filter((property) => {
        const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
        const matchesCountry = filters.country ? property.country?.id === parseInt(filters.country) : true;
        const matchesState = filters.state ? property.state?.id === parseInt(filters.state) : true;
        const matchesCity = filters.city ? property.city?.id === parseInt(filters.city) : true;
        const matchesPhyState = filters.phyState ? property.phy_states_id === parseInt(filters.phyState) : true;
        const matchesTypeBusiness = filters.typeBusiness ? property.types_businesses_id === parseInt(filters.typeBusiness) : true;
        const matchesTypeProperty = filters.typeProperty ? property.types_properties_id === parseInt(filters.typeProperty) : true;

        return matchesPrice && matchesCountry && matchesState && matchesCity && matchesPhyState && matchesTypeBusiness && matchesTypeProperty;
    });

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Lista de propiedades' />


            <div className=" px-4 ">
                <h2 className="text-lg font-bold">Filtros</h2>
                <div className="grid grid-cols-4 gap-4">

                    <div className="">

                        <InputLabel htmlFor="typeProperty" value="Tipo de propiedad" />
                        <Select name="typeProperty" onChange={handleFilterChange} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {typeProperties.map((typeProperty) => (
                                <option key={typeProperty.id} value={typeProperty.id}>{typeProperty.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="">

                        <InputLabel htmlFor="minPrice" value="Rango de precios" />
                        <div className="flex">
                            <input type="number" name="minPrice" placeholder="Mínimo" onChange={handleFilterChange} className="w-1/2 rounded-s-full" />
                            <input type="number" name="maxPrice" placeholder="Máximo" onChange={handleFilterChange} className="w-1/2 rounded-e-full" />
                        </div>
                    </div>

                    <div className="">
                        <InputLabel htmlFor="country" value="Pais" />
                        <Select name="country" onChange={handleFilterChange} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="">
                        <InputLabel htmlFor="state" value="Estado" />
                        <Select name="state" onChange={handleFilterChange} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="">
                        <InputLabel htmlFor="city" value="Ciudad" />
                        <Select name="city" onChange={handleFilterChange} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="">
                        <InputLabel htmlFor="phyState" value="estado fisico" />
                        <Select name="phyState" onChange={handleFilterChange} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {phyStates.map((phyState) => (
                                <option key={phyState.id} value={phyState.id}>{phyState.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="">
                        <InputLabel htmlFor="typeBusiness" value="Tipo de negocio" />
                        <Select name="typeBusiness" onChange={handleFilterChange} className="w-full rounded-full">
                            <option value="">Todos</option>
                            {typeBusinesses.map((typeBusiness) => (
                                <option key={typeBusiness.id} value={typeBusiness.id}>{typeBusiness.name}</option>
                            ))}
                        </Select>
                    </div>


                </div>
            </div>



            <ProductsList data={filteredProperties} setting={setting} />

        </FrontedLayout>
    );
}