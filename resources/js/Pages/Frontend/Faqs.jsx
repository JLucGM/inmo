import Accordion from "@/Components/Accordion";
import CoverPage from "@/Components/CoverPage";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";

export default function Faqs({ auth, setting, faqs, pages }) {

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Faqs' />

            <CoverPage
          title={setting.titleFaq}
          image={setting.portadaFaq}
        />

{setting.descriptionFaq}
            <Accordion items={faqs} />

        </FrontedLayout>
    )
}
