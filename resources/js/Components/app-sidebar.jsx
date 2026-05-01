import * as React from "react"
import { NavMain } from "@/Components/nav-main"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { 
  BuildingOfficeIcon, 
  UsersIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  MapPinIcon, 
  Cog6ToothIcon,
  ChartPieIcon
} from "@heroicons/react/24/outline"
import { Link } from "@inertiajs/react"

export function AppSidebar({ user, permission, ...props }) {
  // Seguridad: Si no hay usuario, no renderizamos para evitar errores de 'undefined'
  if (!user) return null;

  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    navMain: [
      {
        title: "Dashboard",
        url: route('dashboard'),
        icon: ChartPieIcon,
        isActive: route().current('dashboard'),
      },
      {
        title: "Usuarios",
        url: route('user.index'),
        icon: UsersIcon,
        permission: 'admin.user.index',
        isActive: route().current('user.index'),
      },
      {
        title: "Propiedades",
        url: "#",
        icon: BuildingOfficeIcon,
        isActive: route().current('properties.*'),
        items: [
          { title: "Lista de Propiedades", url: route('properties.index'), permission: 'admin.properties.index' },
          { title: "Crear Propiedades", url: route('properties.create'), permission: 'admin.properties.create' },
        ],
      },
      {
        title: "CRM",
        url: "#",
        icon: BriefcaseIcon,
        isActive: route().current('tasks.*') || route().current('contacts.*'),
        items: [
          { title: "Contactos", url: route('contacts.index'), permission: 'admin.contactos.index' },
          { title: "Calendario", url: route('tasks.calendary'), permission: 'admin.tasks.calendary' },
          { title: "Tareas", url: route('tasks.index'), permission: 'admin.tasks.index' },
        ],
      },
      {
        title: "Blog",
        url: "#",
        icon: DocumentTextIcon,
        isActive: route().current('post.*') || route().current('category-post.*'),
        items: [
          { title: "Publicaciones", url: route('post.index'), permission: 'admin.posts.index' },
          { title: "Categorías", url: route('category-post.index'), permission: 'admin.categoriesPost.index' },
        ],
      },
      {
        title: "Locaciones",
        url: "#",
        icon: MapPinIcon,
        isActive: route().current('countries.*') || route().current('states.*') || route().current('cities.*'),
        items: [
          { title: "Países", url: route('countries.index'), permission: 'admin.countries.index' },
          { title: "Estados", url: route('states.index'), permission: 'admin.states.index' },
          { title: "Ciudades", url: route('cities.index'), permission: 'admin.cities.index' },
        ],
      },
      {
        title: "Configuración",
        url: "#",
        icon: Cog6ToothIcon,
        isActive: route().current('settings.*') || route().current('roles.*'),
        items: [
          { title: 'General', url: route('settings.index'), permission: 'admin.setting-generals.index' },
          { title: 'Slide', url: route('slides.index'), permission: 'admin.slides.index' },
          { title: 'Información web', url: route('info-web.index'), permission: 'admin.info-webs.index' },
          { title: 'Testimonios', url: route('testimonial.index'), permission: 'admin.testimonials.index' },
          { title: 'Páginas', url: route('pages.index'), permission: 'admin.pages.index' },
          { title: 'FAQ', url: route('faqs.index'), permission: 'admin.faqs.index' },
          { title: 'Roles', url: route('roles.index'), permission: 'admin.role.index' },
        ],
      },
    ],
  }

  // Filtrar navegación por permisos
  const filteredNav = data.navMain.filter(item => {
    if (!item.permission && !item.items) return true;
    if (item.permission && (permission?.some(p => p.name === item.permission))) return true;
    if (item.items) {
      item.items = item.items.filter(subItem => 
        !subItem.permission || (permission?.some(p => p.name === subItem.permission))
      );
      return item.items.length > 0;
    }
    return false;
  });

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              render={
                <Link href={route('dashboard')}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <BuildingOfficeIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Inmobilia2</span>
                    <span className="truncate text-xs">Administración</span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
