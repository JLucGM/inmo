import PostSection from "@/Components/PostSection";
import SwiperCustom from "@/Components/SwiperCustom";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';


export default function Faqs({ auth, setting, posts }) {
    console.log(posts)
    return (
        <FrontedLayout auth={auth} setting={setting}>
            <Head title='Blog' />

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
                            backgroundImage: `url(/img/posts/${post.image})`,
                            height: '30rem',
                        }}
                    >
                        <div className="absolute inset-0 ">
                            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 opacity-50 h-full w-full"></div>
                        </div>
                        <div             className={`pt-20 md:pt-0  bg-local  bg-no-repeat bg-cover bg-center rounded-3xl relative flex flex-col items-center md:justify-center`}
                        > {/* Agregamos z-10 para que esté por encima del gradiente */}
                            <div className="max-w-3xl text-center text-white">
                                <h2 className="text-5xl font-semibold">{post.name}</h2>
                                <p className="mt-2 text-xl md:mt-8">{post.extract}</p>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}

            </SwiperCustom>


            <PostSection
                posts={posts}
            />

        </FrontedLayout>
    )
}
