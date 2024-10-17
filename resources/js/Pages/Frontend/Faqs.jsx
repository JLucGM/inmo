import FrontedLayout from "@/Layouts/FrontedLayout";
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Head } from "@inertiajs/react";

export default function Faqs({ auth, setting, faqs }) {

    return (
        <FrontedLayout auth={auth} setting={setting}>
            <Head title='Faqs' />

            {faqs.map((item) => (
                <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                >
                    <p>{item.name}</p>
                    <p>{item.content}</p>
                </div>
            ))}
            


        </FrontedLayout>
    )
}
