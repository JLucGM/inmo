import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";


export default function Faqs({ auth, setting, pages, page }) {
    // console.log(page)
    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Blog' />

            <Banner data={page} />
            {/* <img src={page.image} /> */}
            {page.name}

            <div className="pb-6" dangerouslySetInnerHTML={{ __html: page.body }} />



        </FrontedLayout>
    )
}
