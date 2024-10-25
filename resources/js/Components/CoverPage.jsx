export default function CoverPage({ title, image }) {
    return (
        <div
            style={{ backgroundImage: `url(${image})` }}
            className={`pt-20 md:pt-0 min-h-[80vh] bg-local bg-slate-400 bg-no-repeat bg-cover bg-center rounded-3xl relative flex flex-col items-center md:justify-center`}
        >
            <div className="max-w-3xl text-center text-white">
                <h2 className="text-5xl font-semibold">{title}</h2>
            </div>
            
        </div>
    );
}
