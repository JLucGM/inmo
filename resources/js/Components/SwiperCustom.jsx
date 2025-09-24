import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from '@inertiajs/react';

export default function SwiperCustom({ datas, image, link = "", text, name, children, ...props }) {
    const numSlides = datas?.length || 0;
    const [isDarkBackgrounds, setIsDarkBackgrounds] = useState(new Array(numSlides).fill(false)); // Default a claro (false)
    const canvasRef = useRef(new Array(numSlides).fill(null)); // Inicializar array de refs

    useEffect(() => {
        const calculateBrightness = (imgSrc, index) => {
            if (!imgSrc || index >= numSlides) return;

            const img = new Image();
            img.src = imgSrc;
            img.crossOrigin = "Anonymous";

            img.onload = () => {
                const canvas = canvasRef.current[index];
                if (!canvas) return; // Canvas no disponible

                const context = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                let r = 0, g = 0, b = 0;

                for (let i = 0; i < pixels.length; i += 4) {
                    r += pixels[i];
                    g += pixels[i + 1];
                    b += pixels[i + 2];
                }

                const pixelCount = pixels.length / 4;
                r = Math.round(r / pixelCount);
                g = Math.round(g / pixelCount);
                b = Math.round(b / pixelCount);

                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                const isDark = brightness < 128;

                setIsDarkBackgrounds((prev) => {
                    const updated = [...prev];
                    updated[index] = isDark;
                    return updated;
                });
            };

            img.onerror = () => {
                // Si falla la carga (ej: CORS), default a claro
                setIsDarkBackgrounds((prev) => {
                    const updated = [...prev];
                    updated[index] = false;
                    return updated;
                });
            };
        };

        // Reiniciar estado si cambian datas
        setIsDarkBackgrounds(new Array(numSlides).fill(false));

        datas.forEach((data, index) => {
            if (data[image]) {
                calculateBrightness(data[image], index);
            }
        });

        // Cleanup opcional: revocar objetos URL si usas blobs, pero aquí no es necesario
    }, [datas, image, numSlides]);

    // console.log('isDarkBackgrounds:', isDarkBackgrounds); // Para debug

    return (
        <Swiper {...props}>
            {datas.map((data, index) => {
                const isDark = isDarkBackgrounds[index] || false; // Fallback a false si undefined
                const textColorClass = isDark ? 'text-white' : 'text-black';
                const linkColorClass = isDark ? 'text-white bg-black' : 'text-black bg-white'; // Ajustado para consistencia (opcional)

                return (
                    <SwiperSlide
                        key={data.id}
                        className="bg-center bg-repeat bg-cover rounded-3xl relative content-center"
                        style={{
                            backgroundImage: `url(${data[image]})`,
                            height: '42rem',
                        }}
                    >
                        {/* Canvas oculto para cada slide */}
                        <canvas
                            ref={(el) => (canvasRef.current[index] = el)}
                            style={{ display: "none" }}
                        />

                        <div className="flex flex-col items-center justify-end z-10 h-full pb-10">
                            <p className={`mb-4 text-5xl font-bold ${textColorClass}`}>
                                {data[name]}
                            </p>
                            <p className={`my-4 text-sm md:text-lg mx-48 ${textColorClass}`}>
                                {data[text]}
                            </p>
                            {data[link] && (
                                <Link
                                    href={data[link]}
                                    className={`font-medium rounded-full px-4 py-2 ${linkColorClass}`}
                                >
                                    Ver más
                                </Link>
                            )}
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
