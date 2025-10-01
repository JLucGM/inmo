import ContainerInfoContact from "@/Components/ConteinerInfoContact";
import PropertySection from "@/Components/PropertySection";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";

export default function ProductsList({ auth, property, propertyAmenities, setting, pages }) {
  return (
    <FrontedLayout auth={auth} setting={setting} pages={pages}>
      <Head title={property.name} />

      <PropertySection
        datas={property}
        amenities={propertyAmenities}
        setting={setting}
      />

      <ContainerInfoContact />

    </FrontedLayout>
  )
}
