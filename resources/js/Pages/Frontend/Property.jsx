import PropertySection from "@/Components/PropertySection";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";

export default function ProductsList({ auth, property, images, propertyAmenities, setting }) {

  return (
    <FrontedLayout auth={auth} setting={setting}>
      <Head title={property.name} />

      <PropertySection data={property} images={images} amenities={propertyAmenities} />
      
    </FrontedLayout>
  )
}
