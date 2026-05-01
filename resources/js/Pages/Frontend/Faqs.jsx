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
                text={setting.descriptionFaq}
            />

            <div className="my-20 space-y-2">
                {faqs.map((faq, index) => (
                    <details key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <summary className="cursor-pointer text-lg font-semibold text-gray-900">
                            {faq.name}
                        </summary>
                        <div className="mt-2 text-gray-500">
                            {faq.content}
                        </div>
                    </details>
                ))}
            </div>

        </FrontedLayout>
    )
}
