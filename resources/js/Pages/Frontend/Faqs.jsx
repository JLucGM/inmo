import CoverPage from "@/Components/CoverPage";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import { Accordion } from "flowbite-react";

export default function Faqs({ auth, setting, faqs, pages }) {

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title='Faqs' />

            <CoverPage
                title={setting.titleFaq}
                image={setting.portadaFaq}
                text={setting.descriptionFaq}
            />

            <div className="my-20">

                <Accordion>
                    {faqs.map((faq, index) => (
                        <Accordion.Panel key={index}>
                            <Accordion.Title>
                                <p className="text-lg">

                                {faq.name}
                                </p>
                                </Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    {faq.content}
                                </p>
                            </Accordion.Content>
                        </Accordion.Panel>
                    ))}
                </Accordion>
            </div>

        </FrontedLayout>
    )
}
