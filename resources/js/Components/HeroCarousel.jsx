import { Link } from '@inertiajs/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/Components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroCarousel({ slides, image, name, text, link, autoplayOpts }) {
    const autoplayPlugin = Autoplay({
        delay: autoplayOpts?.delay ?? 5000,
        stopOnInteraction: autoplayOpts?.disableOnInteraction === false ? false : true,
        stopOnMouseEnter: true,
    });

    return (
        <Carousel
            opts={{ loop: true, align: 'start' }}
            plugins={[autoplayPlugin]}
            className="w-full rounded-2xl overflow-hidden mb-20"
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem key={slide.id}>
                        <div
                            className="relative flex h-168 w-full items-center justify-center bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide[image]})` }}
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10" />
                            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 text-center">
                                {slide[name] && (
                                    <h2 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                                        {slide[name]}
                                    </h2>
                                )}
                                {slide[text] && (
                                    <p className="mb-6 max-w-2xl text-sm text-white/90 drop-shadow-md md:text-lg">
                                        {slide[text]}
                                    </p>
                                )}
                                {slide[link] && (
                                    (slide[link].startsWith('http://') || slide[link].startsWith('https://'))
                                        ? (
                                            <a
                                                href={slide[link]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-md transition-colors hover:bg-gray-100"
                                            >
                                                Ver más
                                            </a>
                                        )
                                        : (
                                            <Link
                                                href={slide[link]}
                                                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-md transition-colors hover:bg-gray-100"
                                            >
                                                Ver más
                                            </Link>
                                        )
                                )}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
