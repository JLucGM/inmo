import InfoSection from '@/Components/InfoSection';
import ProductsList from '@/Components/ProductsLists';
import HeroCarousel from '@/Components/HeroCarousel';
import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head, Link } from '@inertiajs/react';
import TeamSection from '@/Components/TeamSection';
import InstagramPosts from '@/Components/InstagramPosts';
import AnimatedComponent from '@/Components/AnimatedComponent';
import TestimonialSection from '@/Components/TestimonialSection';
import CardPost from '@/Components/CardPost';
import HeaderSection from '@/Components/HeaderSection';
import ContainerInfoContact from '@/Components/ConteinerInfoContact';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/Components/ui/carousel';

export default function Welcome({ auth, setting, slides, properties, infoweb, testimonials, user, pages, posts, typeProperties }) {

  return (
    <>
      <FrontedLayout auth={auth} setting={setting} pages={pages}>
        <Head title="Bienvenido" />
        {setting?.status_banner == 1 && (
          <AnimatedComponent>
            <HeroCarousel
              slides={slides}
              image="image"
              name="name"
              text="text"
              link="link"
              autoplayOpts={{
                delay: 5000,
                disableOnInteraction: false,
              }}
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
            <div className="w-full py-12 md:py-20">
              <div className="mx-auto max-w-7xl px-4">
                <HeaderSection
                  title="Tipos de Propiedades"
                  description="Explora los diferentes tipos de propiedades disponibles."
                />
                <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                  <CarouselContent>
                    {typeProperties.map((tp) => (
                      <CarouselItem key={tp.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                        <Link href={route('typePropertiesList.show', { typeProperty: tp.slug })}>
                          <div className="group relative h-72 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-lg">
                            <img
                              src={tp.image}
                              alt={tp.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h3 className="text-xl font-bold text-white drop-shadow-sm">{tp.name}</h3>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
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

        {posts && posts.length > 0 && (
          <div className="my-20">
            <div className="mx-auto max-w-7xl px-4">
              <AnimatedComponent>
                <HeaderSection
                  title="Blog y Noticias"
                  description="Mantente al día con las últimas noticias, consejos y tendencias del sector inmobiliario a través de nuestro blog."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <CardPost key={post.id} data={post} />
                  ))}
                </div>
                <div className="flex justify-center mt-10">
                  <Link href={route('blog.show')} className="px-6 py-2.5 bg-white text-sm font-medium text-gray-700 border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                    Ver todas las entradas
                  </Link>
                </div>
              </AnimatedComponent>
            </div>
          </div>
        )}

        <ContainerInfoContact />

      </FrontedLayout>
    </>
  );
}
