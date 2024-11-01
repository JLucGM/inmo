import Banner from '@/Components/Banner';
import InfoSection from '@/Components/InfoSection';
import ProductsList from '@/Components/ProductsLists';
import SwiperCustom from '@/Components/SwiperCustom';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head, Link } from '@inertiajs/react';
import { Autoplay } from 'swiper/modules';
import TeamSection from '@/Components/TeamSection';
import InstagramPosts from '@/Components/InstagramPosts';


export default function Welcome({ auth, setting, slides, properties, infoweb, testimonials, user, pages }) {

    console.log(testimonials)

    return (
        <>
            <FrontedLayout auth={auth} setting={setting} pages={pages}>

                <Head title="Welcome" />
                {setting.status_banner == 1 && (
                    <Banner data={slides} />
                )}

                {setting.status_products_list == 1 && (
                    <>
                        <ProductsList data={properties} setting={setting} />

                        {properties.length > 7 && (
                            <div className="flex justify-center my-16">
                                <Link href={route('propertiesList.show')} className="px-4 py-2 bg-white text-slate-800 border rounded-full hover:bg-slate-300">
                                    Ver más propiedades
                                </Link>
                            </div>
                        )}
                    </>
                )}

                {setting.status_info_section == 1 && (
                    <InfoSection data={infoweb} />
                )}

                {setting.status_testimonials == 1 && (
                    <div className="my-20">
                        <SwiperCustom
                            datas={testimonials}
                            image={'avatar'} text={'text'} name={'name'}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        />
                    </div>
                )}

                {setting.status_team == 1 && (

                    <div className="my-20">
                        <TeamSection data={user} />
                    </div>
                )}

                {setting.status_instagram_posts == 1 && (
                    <InstagramPosts setting={setting} />
                )}

            </FrontedLayout>

        </>
    );
}
