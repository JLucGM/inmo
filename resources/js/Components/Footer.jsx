import { Link } from "@inertiajs/react";
import { Separator } from "@/Components/ui/separator";

export default function Footer({ setting, pages }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link href={route('home')} className="inline-block">
              <img 
                src={`${setting.logo_footer}`} 
                alt="Logo Footer" 
                className="h-12 w-auto brightness-90 hover:brightness-100 transition-all" 
              />
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs italic">
              {setting.description || "Tu socio confiable en el mercado inmobiliario. Encontramos el hogar de tus sueños con profesionalismo y dedicación."}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Empresa</h4>
            <ul className="space-y-4">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={route('pages.show', item.slug)} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm capitalize"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li>
                <Link href={route('propertiesList.show')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href={route('blog.show')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Blog & Noticias
                </Link>
              </li>
              <li>
                <Link href={route('faqs.show')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href={route('ContactPage.index')} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Ubicación</span>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{setting.direction}</p>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Email</span>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{setting.email}</p>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Teléfono</span>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{setting.phone}</p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-800" />

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {currentYear} <span className="font-bold text-gray-900 dark:text-white">Knots Agency</span>. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Términos</Link>
            <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
