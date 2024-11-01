import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function SwiperCustom({ datas, image, text, name, children, ...props }) {
    const [isDarkBackgrounds, setIsDarkBackgrounds] = useState([]);
    const canvasRef = useRef([]);

    useEffect(() => {
        const calculateBrightness = (imgSrc, index) => {
            const img = new Image();
            img.src = imgSrc;
            img.crossOrigin = "Anonymous"; // Permitir cargar imágenes de otros dominios

            img.onload = () => {
                const canvas = canvasRef.current[index];
                const context = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                let r = 0, g = 0, b = 0;

                // Sumar los valores de los píxeles
                for (let i = 0; i < pixels.length; i += 4) {
                    r += pixels[i];     // Red
                    g += pixels[i + 1]; // Green
                    b += pixels[i + 2]; // Blue
                }

                // Calcular el promedio de los colores
                const pixelCount = pixels.length / 4;
                r = Math.round(r / pixelCount);
                g = Math.round(g / pixelCount);
                b = Math.round(b / pixelCount);

                // Calcular el brillo usando la fórmula de luminancia
                const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                setIsDarkBackgrounds((prev) => {
                    const updated = [...prev];
                    updated[index] = brightness < 128; // true si oscuro, false si claro
                    return updated;
                });
            };
        };

        // Inicializar el canvas para cada imagen y calcular el brillo
        datas.forEach((data, index) => {
            if (data[image]) {
                calculateBrightness(data[image], index);
            }
        });
    }, [datas, image]);

    return (
        <Swiper {...props}>
            {datas.map((data, index) => (
                <SwiperSlide
                    key={data.id}
                    className="bg-center bg-repeat bg-cover rounded-3xl relative content-center"
                    style={{
                        backgroundImage: `url(${data[image]})`, // Accede a la propiedad usando notación de corchetes
                        height: '42rem',
                    }}
                >
                    {/* Canvas oculto para cada slide */}
                    <canvas ref={(el) => (canvasRef.current[index] = el)} style={{ display: "none" }} />

                    <div className="grid grid-cols-3 relative z-10">
                        <div className="col-span-full md:col-span-2 px-10 font-semibold text-lg"
                             style={{ color: isDarkBackgrounds[index] ? 'white' : 'black' }}>
                            <p className='my-4 text-sm md:text-base'>{data[text]}</p> {/* Accede al texto usando la propiedad 'text' */}
                            <p>{data[name]}</p> {/* Accede al nombre usando la propiedad 'name' */}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}