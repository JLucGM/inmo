import React, { useEffect, useMemo, useState } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { 
  MoonIcon, 
  SunIcon, 
  HomeIcon 
} from '@heroicons/react/24/outline';
import { AppSidebar } from "@/Components/app-sidebar"
import { usePermissions } from '@/hooks/use-permissions';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Separator } from "@/Components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/Components/ui/avatar"
import { Button } from '@/Components/ui/button'
import { BadgeCheckIcon, LogOutIcon, UserIcon } from 'lucide-react'

const routeBreadcrumbsConfig = [
   {
      match: (r) => r === 'dashboard',
      crumbs: [],
   },
   {
      match: (r) => typeof r === 'string' && r.includes('user') && r.includes('index'),
      crumbs: [{ title: 'Usuarios', url: route('user.index') }],
   },
   {
      match: (r) => typeof r === 'string' && r.includes('user') && r.includes('create'),
      crumbs: [
         { title: 'Usuarios', url: route('user.index') },
         { title: 'Crear usuario' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && r.includes('user') && r.includes('edit'),
      crumbs: [
         { title: 'Usuarios', url: route('user.index') },
         { title: 'Editar usuario' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && r.includes('properties') && r.includes('index'),
      crumbs: [{ title: 'Propiedades', url: route('properties.index') }],
   },
   {
      match: (r) => typeof r === 'string' && r.includes('properties') && r.includes('create'),
      crumbs: [
         { title: 'Propiedades', url: route('properties.index') },
         { title: 'Crear propiedad' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && r.includes('properties') && r.includes('edit'),
      crumbs: [
         { title: 'Propiedades', url: route('properties.index') },
         { title: 'Editar propiedad' },
      ],
   },
   {
      match: (r) => r === 'tasks.index',
      crumbs: [{ title: 'CRM', url: route('tasks.index') }],
   },
   {
      match: (r) => r === 'tasks.create',
      crumbs: [
         { title: 'CRM', url: route('tasks.index') },
         { title: 'Crear tarea' },
      ],
   },
   {
      match: (r) => r === 'tasks.edit',
      crumbs: [
         { title: 'CRM', url: route('tasks.index') },
         { title: 'Editar tarea' },
      ],
   },
   {
      match: (r) => r === 'tasks.calendary',
      crumbs: [
         { title: 'CRM', url: route('tasks.index') },
         { title: 'Calendario' },
      ],
   },
   {
      match: (r) => r === 'contacts.index',
      crumbs: [{ title: 'CRM', url: route('tasks.index') }],
   },
   {
      match: (r) => r === 'contacts.create',
      crumbs: [
         { title: 'CRM', url: route('tasks.index') },
         { title: 'Crear contacto' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && ['post.index', 'category-post.index'].includes(r),
      crumbs: [{ title: 'Blog', url: route('post.index') }],
   },
   {
      match: (r) => typeof r === 'string' && ['post.create', 'category-post.create'].includes(r),
      crumbs: [
         { title: 'Blog', url: route('post.index') },
         { title: 'Crear publicación' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && ['post.edit', 'category-post.edit'].includes(r),
      crumbs: [
         { title: 'Blog', url: route('post.index') },
         { title: 'Editar publicación' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && ['countries.index', 'states.index', 'cities.index'].includes(r),
      crumbs: [{ title: 'Locaciones', url: route('countries.index') }],
   },
   {
      match: (r) => typeof r === 'string' && ['countries.create', 'states.create', 'cities.create'].includes(r),
      crumbs: [
         { title: 'Locaciones', url: route('countries.index') },
         { title: 'Crear locación' },
      ],
   },
   {
      match: (r) => typeof r === 'string' && ['settings.index', 'roles.index'].includes(r),
      crumbs: [{ title: 'Configuración', url: route('settings.index') }],
   },
   {
      match: (r) => typeof r === 'string' && ['settings.edit', 'roles.edit'].includes(r),
      crumbs: [
         { title: 'Configuración', url: route('settings.index') },
         { title: 'Editar configuración' },
      ],
   },
];

function getRouteBreadcrumbs() {
   const currentRoute = route().current();
   const config = routeBreadcrumbsConfig.find((item) => item.match(currentRoute));
   return config?.crumbs ?? [];
}

const createButtonConfig = [
   {
      match: (r) => typeof r === 'string' && r.includes('user') && r.includes('index'),
      label: 'Crear usuario',
      href: route('user.create'),
      permission: 'admin.user.create',
   },
   {
      match: (r) => typeof r === 'string' && r.includes('properties') && r.includes('index'),
      label: 'Crear propiedad',
      href: route('properties.create'),
      permission: 'admin.properties.create',
   },
   {
      match: (r) => r === 'tasks.index',
      label: 'Crear tarea',
      href: route('tasks.create'),
      permission: 'admin.tasks.create',
   },
   {
      match: (r) => r === 'contacts.index',
      label: 'Crear contacto',
      href: route('contacts.create'),
      permission: 'admin.contactos.create',
   },
   {
      match: (r) => r === 'post.index',
      label: 'Crear publicación',
      href: route('post.create'),
      permission: 'admin.posts.create',
   },
   {
      match: (r) => r === 'category-post.index',
      label: 'Crear categoría',
      href: route('category-post.create'),
      permission: 'admin.categoriesPost.create',
   },
   {
      match: (r) => r === 'countries.index',
      label: 'Crear país',
      href: route('countries.create'),
      permission: 'admin.countries.create',
   },
   {
      match: (r) => r === 'states.index',
      label: 'Crear estado',
      href: route('states.create'),
      permission: 'admin.states.create',
   },
   {
      match: (r) => r === 'cities.index',
      label: 'Crear ciudad',
      href: route('cities.create'),
      permission: 'admin.cities.create',
   },
   {
      match: (r) => r === 'settings.index',
      label: 'Crear configuración',
      href: route('settings.create'),
      permission: 'admin.setting-generals.create',
   },
   {
      match: (r) => r === 'roles.index',
      label: 'Crear rol',
      href: route('roles.create'),
      permission: 'admin.role.create',
   },
   {
      match: (r) => r === 'testimonial.index',
      label: 'Crear testimonio',
      href: route('testimonial.create'),
      permission: 'admin.testimonials.create',
   },
   {
      match: (r) => r === 'info-web.index',
      label: 'Crear info web',
      href: route('info-web.create'),
      permission: 'admin.info-webs.create',
   },
   {
      match: (r) => r === 'pages.index',
      label: 'Crear página',
      href: route('pages.create'),
      permission: 'admin.pages.create',
   },
   {
      match: (r) => r === 'typesproperties.index',
      label: 'Crear tipo de propiedad',
      href: route('typesproperties.create'),
      permission: 'admin.typesProperties.create',
   },
   {
      match: (r) => r === 'phyStates.index',
      label: 'Crear estado físico',
      href: route('phyStates.create'),
      permission: 'admin.phystates.create',
   },
   {
      match: (r) => r === 'typesBusinesses.index',
      label: 'Crear tipo de negocio',
      href: route('typesBusinesses.create'),
      permission: 'admin.typebusiness.create',
   },
   {
      match: (r) => r === 'amenities.index',
      label: 'Crear comodidad',
      href: route('amenities.create'),
      permission: 'admin.amenities-checks.create',
   },
   {
      match: (r) => r === 'typesContacts.index',
      label: 'Crear tipo de contacto',
      href: route('typesContacts.create'),
      permission: 'admin.customerstype.create',
   },
   {
      match: (r) => r === 'statuscontacts.index',
      label: 'Crear estado de contacto',
      href: route('statuscontacts.create'),
      permission: 'admin.contactos.create', // reusing contactos permission
   },
   {
      match: (r) => r === 'origins.index',
      label: 'Crear origen',
      href: route('origins.create'),
      permission: 'admin.origin.create',
   },
   {
      match: (r) => r === 'slides.index',
      label: 'Crear slide',
      href: route('slides.create'),
      permission: 'admin.slides.create',
   },
   {
      match: (r) => r === 'faqs.index',
      label: 'Crear FAQ',
      href: route('faqs.create'),
      permission: 'admin.faqs.create',
   },
];

function getCreateButton(permission) {
   const currentRoute = route().current();
   const config = createButtonConfig.find((item) => item.match(currentRoute));
   if (!config) {
      return null;
   }

   if (!permission || !Array.isArray(permission)) {
      return null;
   }

   const hasPermission = permission.includes(config.permission);
   if (!hasPermission) {
      return null;
   }

   return config;
}


function getHeaderText(header) {
   if (!header) return '';
   if (typeof header === 'string') return header;
   if (header.props && typeof header.props.children === 'string') return header.props.children;
   return '';
}

export default function Authenticated({ user, header, children, breadcrumbs }) {
   const { can, permissions } = usePermissions();
   const [theme, setTheme] = useState(() => {
      if (typeof window === 'undefined') {
         return 'light';
      }

      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
         return storedTheme;
      }

      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
   });

   const { url: pageUrl } = usePage();

   const headerText = useMemo(() => getHeaderText(header), [header]);
   const resolvedBreadcrumbs = useMemo(() => {
      return getRouteBreadcrumbs();
   }, [pageUrl]);

   const createButton = useMemo(() => getCreateButton(permissions), [pageUrl, permissions]);

   useEffect(() => {
      if (theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
   }, [theme]);

   useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (event) => {
         if (!localStorage.getItem('theme')) {
            setTheme(event.matches ? 'dark' : 'light');
         }
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
   }, []);

   const toggleDarkMode = () => {
      setTheme(prevTheme => {
         const newTheme = prevTheme === 'light' ? 'dark' : 'light';
         localStorage.setItem('theme', newTheme);
         return newTheme;
      });
   };

   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
               <div className="flex items-center gap-2 flex-1">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                           <BreadcrumbLink href={route('dashboard')}>
                              Dashboard
                           </BreadcrumbLink>
                        </BreadcrumbItem>

                        {resolvedBreadcrumbs.length > 0 ? (
                           resolvedBreadcrumbs.map((item, index) => {
                              const isLast = index === resolvedBreadcrumbs.length - 1;
                              return (
                                 <React.Fragment key={`${item.title}-${index}`}>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                       {isLast ? (
                                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                       ) : (
                                          <BreadcrumbLink href={item.url || '#'}>
                                             {item.title}
                                          </BreadcrumbLink>
                                       )}
                                    </BreadcrumbItem>
                                 </React.Fragment>
                              );
                           })
                        ) : headerText ? (
                           <>
                              <BreadcrumbSeparator className="hidden md:block" />
                              <BreadcrumbItem>
                                 <BreadcrumbPage>{headerText}</BreadcrumbPage>
                              </BreadcrumbItem>
                           </>
                        ) : null}
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
               
               <div className="flex items-center gap-2">
                  {createButton && (
                     <Button size="sm">
                        <Link href={createButton.href} className="w-full h-full flex items-center justify-center">
                           {createButton.label}
                        </Link>
                     </Button>
                  )}

                  <Link href={route('home')} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                     <HomeIcon className="size-5" />
                  </Link>

                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                     {theme === 'light' ? (
                        <MoonIcon className='size-5' />
                     ) : (
                        <SunIcon className='size-5' />
                     )}
                  </button>

                  <DropdownMenu>
                     <DropdownMenuTrigger
                        render={
                           <div
                              role="button"
                              tabIndex={0}
                              className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-sm hover:bg-muted"
                           >
                              <UserIcon className="size-4" />
                              <span className="hidden md:inline">{user.name}</span>
                           </div>
                        }
                     />
                     <DropdownMenuContent side="bottom" align="end" className="w-56">
                        <DropdownMenuItem>
                           <Link href={route('profile.edit')} className="w-full block px-2 py-1 text-sm">
                              <BadgeCheckIcon className="mr-2 size-4 inline" />
                              Perfil
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <button
                              onClick={toggleDarkMode}
                              className="w-full flex items-center px-2 py-1 text-sm"
                              type="button"
                           >
                              {theme === 'light' ? (
                                 <MoonIcon className="mr-2 size-4 inline" />
                              ) : (
                                 <SunIcon className="mr-2 size-4 inline" />
                              )}
                              {theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                           </button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           <Link
                              href={route('logout')}
                              method="post"
                              as="button"
                              className="w-full block px-2 py-1 text-sm text-destructive"
                           >
                              <LogOutIcon className="mr-2 size-4 inline" />
                              Cerrar sesión
                           </Link>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </header>

            <main className="flex flex-1 flex-col gap-4 p-4 lg:p-8 bg-background">
               {children}
            </main>

            <footer className="border-t py-4 px-8 text-center text-sm text-muted-foreground bg-background">
               © {new Date().getFullYear()} <Link href="#" className="hover:underline">Knots Agency</Link>. All rights reserved.
            </footer>
         </SidebarInset>
      </SidebarProvider>
   );
}
