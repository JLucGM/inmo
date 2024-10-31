import Banner from '@/Components/Banner';
import InfoSection from '@/Components/InfoSection';
import ProductsList from '@/Components/ProductsLists';
import SwiperCustom from '@/Components/SwiperCustom';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head, Link } from '@inertiajs/react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import TeamSection from '@/Components/TeamSection';
import InstagramPosts from '@/Components/InstagramPosts';


export default function Welcome({ auth, setting, slides, properties, infoweb, testimonials, user, pages }) {

    // console.log(setting.status_banner)

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
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}

                        >
                            {testimonials.map((testimonial) => (

                                <SwiperSlide
                                    key={testimonial.id}
                                    className="bg-center bg-repeat bg-cover rounded-3xl relative content-center "
                                    style={{
                                        backgroundImage: `url(${testimonial.avatar})`,
                                        height: '42rem',
                                    }}
                                >
                                    <div className="absolute inset-0 ">
                                        <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-slate-700 opacity-20 h-full w-full"></div>
                                    </div>
                                    <div className="grid grid-cols-3 relative z-10 "> {/* Agregamos z-10 para que esté por encima del gradiente */}
                                        <div className="col-span-full md:col-span-2 px-10 font-semibold text-slate-900 text-lg ">
                                            <img
                                                alt={setting.logo}
                                                src={`${setting.logo}`}
                                                className="h-10 w-auto"
                                            />
                                            <p className='my-4 text-sm md:text-base'>"{testimonial.text}"</p>
                                            <p className=''> {testimonial.name}</p>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}

                        </SwiperCustom>
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
