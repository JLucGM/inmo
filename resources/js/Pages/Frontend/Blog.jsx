import PostSection from "@/Components/PostSection";
import SwiperCustom from "@/Components/SwiperCustom";
import FrontedLayout from "@/Layouts/FrontedLayout";
import { Head } from "@inertiajs/react";
import { Autoplay } from 'swiper/modules';


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
                datas={posts}
                image={'image'} 
                text={'extract'} 
                name={'name'}
                link={'link'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            />

            <PostSection
                posts={posts}
                setting={setting}
            />

        </FrontedLayout>
    )
}
