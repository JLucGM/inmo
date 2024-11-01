import { useEffect, useRef, useState } from "react";

export default function CoverPage({ title, text, image }) {
    const [isDarkBackground, setIsDarkBackground] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.src = image;
            img.crossOrigin = "Anonymous"; // Esto es importante si la imagen está en un dominio diferente

            img.onload = () => {
                const canvas = canvasRef.current;
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

                // Establecer si el fondo es oscuro o claro
                setIsDarkBackground(brightness < 128);
            };

            img.onerror = () => {
                console.error("Error al cargar la imagen");
            };
        }
    }, [image]);

    return (
        <div
            style={{ backgroundImage: `url(${image})` }}
            className={`pt-20 md:pt-0 min-h-[80vh] bg-local bg-slate-400 bg-no-repeat bg-cover bg-center rounded-3xl relative flex flex-col items-center md:justify-center`}
        >
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="max-w-3xl text-center space-y-4 z-10">
                <h2 className={`text-5xl font-semibold ${isDarkBackground ? 'text-white' : 'text-black'}`}>
                    {title}
                </h2>
                <p className={`text-lg font-semibold ${isDarkBackground ? 'text-white' : 'text-black'}`}>
                    {text}
                </p>
            </div>
        </div>
    );
}