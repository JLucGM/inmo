import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Banner({ data }) {
    const [isDarkBackground, setIsDarkBackground] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (data && data.image && !data.image.endsWith('.mp4')) {
            const img = new Image();
            img.src = data.image;
            img.crossOrigin = "Anonymous";

            img.onload = () => {
                const canvas = canvasRef.current;
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

                const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                setIsDarkBackground(brightness < 128);
            };
        }
    }, [data]);

    if (!data || !data.image) {
        return <div>No hay imagen o video disponible</div>;
    }

    return (
        <div className="relative min-h-[80vh] rounded-3xl overflow-hidden flex flex-col justify-end items-center">
            {data.image.endsWith('.mp4') ? (
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src={data.image} type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>
            ) : (
                <div
                    style={{ backgroundImage: `url(${data.image})` }}
                    className="absolute inset-0 bg-local bg-slate-400 bg-no-repeat bg-cover bg-center"
                />
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="absolute inset-0 " /> {/*bg-black opacity-50 */}
            <div className="max-w-3xl text-center z-10 relative mb-10 space-y-4">
                <h2 className={`text-5xl font-semibold ${isDarkBackground ? 'text-white' : 'text-black'}`}>
                    {data.name}
                </h2>
                {data.text && (
                    <p className={` text-xl md:mt-8 ${isDarkBackground ? 'text-white' : 'text-black'}`}>
                        {data.text}
                    </p>
                )}
                {data.link && (
                    <div className="">
                        <Link href={data.link} className={'bg-white font-medium rounded-full px-4 py-2'}>
                            Saber más
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}