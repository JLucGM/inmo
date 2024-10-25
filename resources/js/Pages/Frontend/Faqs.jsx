import Accordion from "@/Components/Accordion";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";

export default function Faqs({ auth, setting, faqs, pages }) {

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Faqs' />

            <Accordion items={faqs} />

        </FrontedLayout>
    )
}
