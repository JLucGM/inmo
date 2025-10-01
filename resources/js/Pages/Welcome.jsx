import InfoSection from '@/Components/InfoSection';
import ProductsList from '@/Components/ProductsLists';
import SwiperCustom from '@/Components/SwiperCustom';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head, Link } from '@inertiajs/react';
import { Autoplay } from 'swiper/modules';
import TeamSection from '@/Components/TeamSection';
import InstagramPosts from '@/Components/InstagramPosts';
import AnimatedComponent from '@/Components/AnimatedComponent';
import TestimonialSection from '@/Components/TestimonialSection'; // Nueva dimportación
import TypePropertiesCarousel from '@/Components/TypePropertiesCarousel';
import Masonary from '@/Components/Masonary';
import HeaderSection from '@/Components/HeaderSection';
import ContainerInfoContact from '@/Components/ConteinerInfoContact';

export default function Welcome({ auth, setting, slides, properties, infoweb, testimonials, user, pages, posts, typeProperties }) {

  const postsForMasonry = posts.map(post => ({
    id: post.id,
    imageUrl: post.image,
    title: post.name
  }));

  return (
    <>
      <FrontedLayout auth={auth} setting={setting} pages={pages}>
        <Head title="Bienvenido" />
        {setting.status_banner == 1 && (
          <AnimatedComponent>
            {/* <Banner data={slides} /> */}
            <SwiperCustom
              datas={slides}
              image={'image'}
              text={'text'}
              name={'name'}
              link={'link'}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            />
          </AnimatedComponent>
        )}

        {setting.status_products_list == 1 && (
          <AnimatedComponent>
            <ProductsList data={properties} setting={setting} />
            {properties.length > 7 && (
              <div className="flex justify-center my-16">
                <Link href={route('propertiesList.show')} className="px-4 py-2 bg-white text-slate-800 border rounded-full hover:bg-slate-300">
                  Ver más propiedades
                </Link>
              </div>
            )}
          </AnimatedComponent>
        )}

        {typeProperties && typeProperties.length > 0 && (
          <AnimatedComponent>
            <TypePropertiesCarousel typeProperties={typeProperties} />
          </AnimatedComponent>
        )}

        {setting.status_info_section == 1 && (
          <AnimatedComponent>
            <InfoSection data={infoweb} setting={setting} />
          </AnimatedComponent>
        )}

        {setting.status_testimonials == 1 && (
          <AnimatedComponent>
            <div className="my-20">
              <TestimonialSection
                datas={testimonials}
                headerTitle={setting.titleTestimonials}
                subtitle={setting.descriptionTestimonials}
              />
            </div>
          </AnimatedComponent>
        )}

        {setting.status_team == 1 && (
          <AnimatedComponent>
            <div className="my-20">
              <TeamSection data={user} setting={setting} />
            </div>
          </AnimatedComponent>
        )}

        {setting.status_instagram_posts == 1 && (
          <AnimatedComponent>
            <InstagramPosts setting={setting} />
          </AnimatedComponent>
        )}

        {posts && posts.length > 0 && (
          <div className="my-10">
            <Masonary items={postsForMasonry} />
          </div>
        )}

        <ContainerInfoContact />

      </FrontedLayout>
    </>
  );
}
