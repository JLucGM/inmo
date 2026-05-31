import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon, HomeIcon, MagnifyingGlassIcon, NewspaperIcon, QuestionMarkCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { Link, usePage } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { cn } from '@/lib/utils'

export default function MegaMenu({ auth, setting }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { url } = usePage()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigation = [
        { name: 'Inicio', href: route('home'), icon: HomeIcon, current: url === '/' },
        { name: 'Propiedades', href: route('propertiesList.show'), icon: MagnifyingGlassIcon, current: url.startsWith('/properties') },
        { name: 'Blog', href: route('blog.show'), icon: NewspaperIcon, current: url.startsWith('/blog') },
        { name: 'FAQS', href: route('faqs.show'), icon: QuestionMarkCircleIcon, current: url.startsWith('/faqs') },
        { name: 'Contáctanos', href: route('ContactPage.index'), icon: ChatBubbleLeftRightIcon, current: url.startsWith('/contact') },
    ]

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled 
                ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-2" 
                : " py-4"
        )}>
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href={route('home')} className="-m-1.5 p-1.5">
                        <span className="sr-only">Inmo Home</span>
                        <img
                            alt="Logo"
                            src={`${setting.logo}`}
                            className="h-12 w-auto object-contain hover:scale-105 transition-transform"
                        />
                    </Link>
                </div>
                
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                    >
                        <span className="sr-only">Abrir menú</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-semibold leading-6 transition-colors relative py-1",
                                item.current 
                                    ? "text-blue-600 dark:text-blue-400" 
                                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            )}
                        >
                            {item.name}
                            {item.current && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
                    {auth.user ? (
                        <Button
                            variant="outline"
                            size="sm"
                            nativeButton={false}
                            render={<Link href={route('dashboard')}>Dashboard</Link>}
                            className="rounded-full px-6"
                        />
                    ) : (
                        <Button
                            size="sm"
                            nativeButton={false}
                            render={
                                <Link href={route('login')}>
                                    <UserIcon className="size-4 mr-2" />
                                    Acceder
                                </Link>
                            }
                            className="rounded-full px-6 bg-blue-600 hover:bg-blue-700"
                        />
                    )}
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href={route('home')} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                            <img
                                alt="Logo"
                                src={`${setting.logo}`}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                        >
                            <span className="sr-only">Cerrar menú</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-800">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "-mx-3 block rounded-xl px-3 py-3 text-base font-semibold leading-7 transition-colors",
                                            item.current 
                                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                                                : "text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="size-5" />
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-4 -mx-3 rounded-xl px-3 py-3 text-base font-bold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        Ir al Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-4 -mx-3 rounded-xl px-3 py-3 text-base font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <UserIcon className="size-5" />
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
            
            {/* Spacer to prevent layout jump due to fixed header */}
            <div className="h-0" />
        </header>
    )
}
