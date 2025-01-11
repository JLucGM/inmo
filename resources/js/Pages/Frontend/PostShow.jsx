import CoverPage from "@/Components/CoverPage";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";

export default function PostShow({ auth, setting, posts, pages }) {
    // console.log(posts)

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(posts.created_at));

    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title={posts.name} />

            <main className="mt-10">

                <div className="mb-4 md:mb-0 w-full mx-auto relative">
                    <div className="px-4 lg:px-0">
                        <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                            {posts.name}
                        </h2>
                        <a
                            href="#"
                            className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                        >
                            {posts.category_post.name}
                        </a>
                    </div>
                    <CoverPage
                        image={posts.image}
                    />
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-12">

                    <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                        <div className="pb-6" dangerouslySetInnerHTML={{ __html: posts.content }} />

                    </div>

                    <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                        <div className="p-4 border-t border-b md:border md:rounded">
                            <div className="flex py-2">
                                <img src={`${posts.user.avatar}`} alt={posts.image} className="h-10 w-10 rounded-full mr-2 object-cover" />
                                <div>
                                    <p className="font-semibold text-gray-700 text-sm"> {posts.user.name} </p>
                                    <p className="font-semibold text-gray-600 text-xs"> Editor </p>
                                </div>
                            </div>
                            <time dateTime={posts.created_at} className="text-gray-500">
                                {formattedDate}
                            </time>

                        </div>
                    </div>

                </div>

                {/* <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (

                        <CardPost
                            key={post.id}  // Clave única aquí
                            data={post}
                        />
                    ))}

                </div> */}
            </main>

        </FrontedLayout>
    )
}
