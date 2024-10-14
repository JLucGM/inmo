import Banner from '@/Components/Banner';
import InfoSection from '@/Components/InfoSection';
import ProductsList from '@/Components/ProductsLists';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head } from '@inertiajs/react';

export default function Welcome({ auth, setting, slides, properties, infoweb }) {

    console.log(infoweb)

    return (
        <>

            <FrontedLayout auth={auth} setting={setting}>

                <Head title="Welcome" />

                <Banner data={slides} />

                <ProductsList data={properties} />

                <InfoSection data={infoweb} />

                

            </FrontedLayout>



        </>
    );
}
