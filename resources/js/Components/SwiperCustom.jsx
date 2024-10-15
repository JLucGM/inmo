import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function SwiperCustom({ children, ...props }) {
  return (
    <Swiper
      {...props}
    >

      {children}

    </Swiper>
  )
}
