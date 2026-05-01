# Plan de Refactorización: Inmo + Shadcn/UI

Este documento detalla el proceso de migración de la interfaz del backend de componentes personalizados/Flowbite a **shadcn/ui**.

## Estado del Proyecto
- **Framework:** Laravel 12 + Inertia.js (React 19)
- **UI Base:** Tailwind CSS 4
- **Objetivo:** Implementar un diseño consistente basado en Shadcn.

## Fase 1: Infraestructura Core (En Proceso)
- [x] **Sidebar-16:** Reemplazar el layout actual `AuthenticatedLayout.jsx` con la estructura de Sidebar-16 de Shadcn.
- [x] **Navegación:** Integrar Breadcrumbs dinámicos y menús de usuario.
- [x] **Configuración de Temas:** Asegurar soporte para modo claro/oscuro consistente.

## Fase 2: Mapeo de Componentes UI
Reemplazar componentes en `resources/js/Components` por sus equivalentes en `components/ui`:
- `PrimaryButton` -> `Button`
- `TextInput` -> `Input`
- `TextArea` -> `Textarea`
- `SelectCustom` -> `Select`
- `Modal` -> `Dialog` / `Sheet`
- `Checkbox` -> `Checkbox`
- `Badge` -> `Badge`

## Fase 3: Refactorización de Vistas (CRUDs) (Completada)
Refactorización final de vistas clave y Dashboard:
1. [x] **Dashboard:** Cards de estadísticas y gráficos integrados con Recharts.
2. [x] **Propiedades (Properties):** Migración completa a DataTable y formularios Shadcn.
3. [x] **Contactos (Contacts):** Listados y gestión de estados con Shadcn.
4. [x] **Tareas y Calendario (Tasks):** Integración con el nuevo diseño y calendario.
5. [x] **Configuración (Settings):** Formularios complejos y Tabs verticales.
6. [x] **Otros:** (Países, Ciudades, Servicios, etc.) estandarizados.

## Fase 4: Limpieza y Optimización
- [ ] Eliminar componentes antiguos en `resources/js/Components` que ya no se usen.
- [ ] Eliminar dependencias de Flowbite u otras librerías de UI sobrantes.
- [ ] Auditoría final de accesibilidad y diseño responsivo.

---
*Nota: Este plan se actualizará conforme avancemos en las tareas.*
