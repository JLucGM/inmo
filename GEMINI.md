# Promps
Responde siempre en español
No utilices ningun MCP sin que te lo pida

# Project Overview: Inmo (Real Estate Management System)

This project is a comprehensive Real Estate Management System built with **Laravel 11**, **Inertia.js (React)**, and **Tailwind CSS**. It provides a backend for managing properties, contacts, tasks, blog posts, and site settings, with a React-based frontend for both administrative and public-facing features.

## Core Technologies
- **Backend:** Laravel 11 (PHP 8.2+)
- **Frontend:** React 18, Inertia.js, Tailwind CSS
- **Media Management:** [Spatie Laravel MediaLibrary](https://spatie.be/docs/laravel-medialibrary/v11/introduction)
- **Permissions:** [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission/v6/introduction)
- **Routing:** [Ziggy](https://github.com/tighten/ziggy) (for using Laravel routes in JS)
- **Icons:** Heroicons
- **Maps:** Leaflet (via React-Leaflet)
- **Tables:** TanStack Table (React Table)
- **UI Components:** Flowbite React, Headless UI
- **Animations:** Framer Motion

## Project Structure
- `app/Http/Controllers/`: Contains backend controllers. Administrative controllers are mostly grouped under the `dashboard` prefix in `routes/web.php`.
- `app/Models/`: Eloquent models. Note the use of traits like `HasMedia`, `InteractsWithMedia`, `HasSlug`, and `HasRoles`.
- `resources/js/Pages/`: React page components rendered by Inertia.
- `resources/js/Components/`: Reusable React components.
- `database/migrations/`: Database schema definitions.
- `database/seeders/`: Seeders for initial data (Amenities, Cities, Countries, etc.).

## Building and Running

### Prerequisites
- PHP 8.2+
- Node.js & NPM
- Composer

### Installation
1.  **Clone and Install Dependencies:**
    ```bash
    composer install
    npm install
    ```
2.  **Environment Setup:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
3.  **Database Migration & Seeding:**
    ```bash
    php artisan migrate --seed
    ```

### Development
- **Start Backend:** `php artisan serve`
- **Start Frontend (Vite):** `npm run dev`
- **Build for Production:** `npm run build`

### Testing & Linting
- **Run Tests:** `php artisan test` or `./vendor/bin/pest`
- **Lint Code (Laravel Pint):** `./vendor/bin/pint`

## Development Conventions

### Backend
- **Controllers:** Follow standard RESTful practices where possible. Use `Inertia::render()` for views.
- **Models:** Use Spatie traits for media, slugs, and permissions.
- **Requests:** Use Form Requests (found in `app/Http/Requests`) for validation logic.
- **Media:** Always use the `images` collection for property media via Spatie MediaLibrary.

### Frontend
- **State Management:** Use Inertia's `useForm` for handling forms and submissions.
- **Styling:** Strictly use Tailwind CSS. Follow the existing patterns for layout and spacing.
- **Components:** Organize reusable UI elements in `resources/js/Components`.
- **Pages:** View components reside in `resources/js/Pages` and should correspond to controller actions.

### Routing
- Define routes in `routes/web.php`.
- Administrative routes should be protected by the `auth` middleware and ideally use the `dashboard` prefix.
- Use named routes for all links and redirects.
