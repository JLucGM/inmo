import { Link } from "@inertiajs/react";

export default function Banner({ data }) {
    if (!data || !data.image) {
        return <div>No hay imagen disponible</div>; // O cualquier otro contenido alternativo
    }

    return (
        <div
            style={{ backgroundImage: `url(/img/slides/${data.image})` }}
            className={`pt-20 md:pt-0 min-h-[80vh] bg-local bg-slate-400 bg-no-repeat bg-cover bg-center rounded-3xl relative flex flex-col items-center md:justify-center`}
        >
            <div className="max-w-3xl text-center text-white">
                <h2 className="text-5xl font-semibold">{data.name}</h2>
                <p className="mt-2 text-xl md:mt-8">{data.text}</p>
            </div>
            <div className="mt-2">
                <Link href={data.link} className={'bg-white font-medium rounded-full px-4 py-2'}>Saber más</Link>
            </div>
        </div>
    );
}