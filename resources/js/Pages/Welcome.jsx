import Banner from '@/Components/Banner';
import InfoSection from '@/Components/InfoSection';
import ProductsList from '@/Components/ProductsLists';
import SwiperCustom from '@/Components/SwiperCustom';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head } from '@inertiajs/react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import TeamSection from '@/Components/TeamSection';


export default function Welcome({ auth, setting, slides, properties, infoweb, testimonials, user }) {

    console.log(testimonials)

    return (
        <>
            <FrontedLayout auth={auth} setting={setting}>

                <Head title="Welcome" />

                <Banner data={slides} />

                <ProductsList data={properties} />

                <InfoSection data={infoweb} />

                <SwiperCustom
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}

                >
                    {testimonials.map((testimonial) => (

                        <SwiperSlide
                            className="bg-center bg-repeat bg-cover rounded-3xl relative content-center "
                            style={{
                                backgroundImage: `url(/img/testimonials/${testimonial.avatar})`,
                                height: '30rem',
                            }}
                        >
                            <div className="absolute inset-0 ">
                                <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 opacity-50 h-full w-full"></div>
                            </div>
                            <div className="grid grid-cols-3 relative z-10 "> {/* Agregamos z-10 para que esté por encima del gradiente */}
                                <div className="col-span-full md:col-span-2 px-10 font-semibold text-slate-900 text-lg ">
                                    <img
                                        alt={setting.logo}
                                        src={`/img/setting/${setting.logo}`}
                                        className="h-10 w-auto"
                                    />
                                    <p className='my-4'>"{testimonial.text}"</p>
                                    <p className=''> {testimonial.name}</p>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}

                </SwiperCustom>

                <TeamSection data={user} />

            </FrontedLayout>

        </>
    );
}
