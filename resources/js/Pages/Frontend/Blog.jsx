import FrontedLayout from '@/Layouts/FrontedLayout';
import { Head } from '@inertiajs/react';
import { Suspense, lazy } from 'react';
import { Autoplay } from 'swiper/modules';


const PostSection = lazy(() => import('@/Components/PostSection'));
const SwiperCustom = lazy(() => import('@/Components/SwiperCustom'));

export default function Blog({ auth, setting, posts, pages }) {
  return (
    <FrontedLayout auth={auth} setting={setting} pages={pages}>
      <Head title={setting.titleBlog} />

      <Suspense fallback={<div>Cargando slider...</div>}>
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
      </Suspense>

      <Suspense fallback={<div>Cargando posts...</div>}>
        <PostSection posts={posts} setting={setting} />
      </Suspense>
    </FrontedLayout>
  );
}
