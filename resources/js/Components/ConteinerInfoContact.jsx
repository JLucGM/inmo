import { Link } from "@inertiajs/react";

export default function ContainerInfoContact() {

    return (
        <div className="bg-[linear-gradient(117deg,#404045,#4b4c51,#57585c,#626468,#6e7073,#797c7f,#84888a,#909496,#9ba0a1)] w-full p-8 my-16 rounded-2xl">
            <div className="flex flex-col items-center my-10 text-center">
                <h2 className="text-3xl font-semibold text-white mb-4">
                    ¿Quieres vender tu propiedad o comprar una nueva?
                </h2>
                <p className="text-gray-300 mb-4">
                    Estamos aquí para ayudarte. No dudes en ponerte en contacto con
                    nosotros.
                </p>
                <Link
                    href={route('ContactPage.index')}
                    className="py-2 bg-white inline-flex items-center justify-center mt-10 p-4 rounded-full"
                >
                    Contacta con nosotros
                </Link>
            </div>
        </div>

    );
}
