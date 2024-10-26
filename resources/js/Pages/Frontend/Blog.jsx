import PostSection from "@/Components/PostSection";
import SwiperCustom from "@/Components/SwiperCustom";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head, Link } from "@inertiajs/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import CoverPage from "@/Components/CoverPage";


export default function Faqs({ auth, setting, posts, pages }) {
    console.log(posts)
    return (
        <FrontedLayout auth={auth} setting={setting} pages={pages}>
            <Head title={setting.titleBlog} />

            {/* <CoverPage
                title={setting.titleBlog}
                image={setting.portadaBlog}
            /> */}

            <SwiperCustom
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}

            >
                {posts.map((post) => (

                    <SwiperSlide
                        className="bg-center bg-repeat bg-cover rounded-3xl relative content-center "
                        style={{
                            backgroundImage: `url(${post.image})`,
                            height: '36rem',
                        }}
                    >
                        <div className="absolute inset-0 ">
                            <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-900 opacity-20 h-full w-full"></div>
                        </div>
                        <div className={`pt-20 md:pt-0  bg-local  bg-no-repeat bg-cover bg-center rounded-3xl relative flex flex-col items-center md:justify-center`}
                        > {/* Agregamos z-10 para que esté por encima del gradiente */}
                            <div className="max-w-3xl text-center text-white">
                                <h2 className="capitalize text-5xl font-semibold">{post.name}</h2>
                                <p className="mt-2 text-xl md:mt-8">{post.extract}</p>
                            </div>
                            <Link
                                key={post.id}
                                href={route('posts.show', post.slug)}
                                className={'bg-white font-medium rounded-full px-4 py-2'}
                            >
                                Ver publicación
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}

            </SwiperCustom>


            <PostSection
                posts={posts}
                setting={setting}
            />

        </FrontedLayout>
    )
}
