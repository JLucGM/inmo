import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import CoverPage from "@/Components/CoverPage";

export default function Pages({ auth, setting, pages, page }) {
    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title={page.name} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                <CoverPage 
                    title={page.name} 
                    image={page.image} 
                />
                
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border dark:border-gray-800">
                    <article className="prose prose-blue dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-8 italic">{page.name}</h1>
                        <div 
                            className="text-gray-600 dark:text-gray-400 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: page.body }} 
                        />
                    </article>
                </div>
            </div>
        </FrontedLayout>
    )
}
