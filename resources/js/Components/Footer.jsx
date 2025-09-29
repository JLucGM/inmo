import { Link } from "@inertiajs/react";

export default function Footer({ setting, pages }) {

  return (
    <footer className="mt-20 pb-16 px-10 text-center text-sm text-black dark:text-white/70">

      <div className="border-t pt-12 pb-32 px-4 lg:px-0">
        <div>
          <img src={`${setting.logo_footer}`} alt={setting.logo_footer} className="h-16 " />

        </div>
        <div className="flex flex-wrap ">
          <div className="w-full lg:w-2/5">
            <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
              {setting.description}
            </p>
            {/* <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
              {setting.phone}
            </p>
            <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
              {setting.direction}
            </p> */}
          </div>

          <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
            <h6 className="font-semibold text-gray-700 mb-4">Empresa</h6>
            <ul className="list-none	">
              {/* <li> <a href="" className="block text-gray-600 py-2">Team</a> </li>
              <li> <a href="" className="block text-gray-600 py-2">About us</a> </li>
              <li> <a href="" className="block text-gray-600 py-2">Press</a> </li> */}
              {pages.map((item) => (
                <li
                  key={item.name}
                >
                  <div className="flex-auto">
                    <Link href={route('pages.show', item.slug)} className="capitalize block text-gray-600 py-2">
                      {item.name}

                    </Link>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
            <h6 className="font-semibold text-gray-700 mb-4">Sitio</h6>
            <ul className="list-none	">
              <li> <Link href={route('blog.show')} className="block text-gray-600 py-2">Blog</Link> </li>
              <li> <Link href={route('faqs.show')} className="block text-gray-600 py-2">Preguntas frecuentes</Link> </li>
              <li> <Link href={route('ContactPage.index')} className="block text-gray-600 py-2">Contactanos</Link> </li>
              {/* <li> <Link href={route('pages.show', 'documentation')} className="block text-gray-600 py-2">Documentación</Link> </li> */}
            </ul>
          </div>

          <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
            <h6 className="font-semibold text-gray-700 mb-4">Contacto</h6>
            <ul className="list-none	">
              <li> <p href="" className="block text-gray-600 py-2">{setting.direction}</p> </li>
              <li> <p href="" className="block text-gray-600 py-2">{setting.email}</p> </li>
              <li> <p href="" className="block text-gray-600 py-2">{setting.phone}</p> </li>
            </ul>
          </div>

        </div>
      </div>
      <div className="border-t pt-8 w-full">
        <p>© 2024 <Link href="#">Knots Agency</Link>. All rights reserved.</p>
      </div>

    </footer>
  )
}
