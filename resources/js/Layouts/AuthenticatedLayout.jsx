import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import MultiLevelMenu from '@/Components/MultiLevelMenu';
import UserIcon from '@/Components/Icon/UserIcon';
import { Link } from '@inertiajs/react';
import HomeModern from '@/Components/Icon/HomeModern';
import Folder from '@/Components/Icon/Folder';
import DocumentText from '@/Components/Icon/DocumenteText';
import PinMap from '@/Components/Icon/PinMap';
import Gear from '@/Components/Icon/Gear';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Authenticated({ user, header, children }) {

   const [theme, setTheme] = useState(() => {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme || 'light';
   });

   const [sidebarOpen, setSidebarOpen] = useState(false);

   useEffect(() => {
      if (theme === 'dark') {
         document.querySelector('html').classList.add('dark');
      } else {
         document.querySelector('html').classList.remove('dark');
      }
   }, [theme]);

   const toggleSidebar = () => {
      console.log('sidebar')
      setSidebarOpen(!sidebarOpen); // Cambiar el estado del sidebar
   };

   const toggleDarkMode = () => {
      setTheme(prevTheme => {
         const newTheme = prevTheme === 'light' ? 'dark' : 'light';
         localStorage.setItem('theme', newTheme);
         return newTheme;
      });
   };

   const globalSettings = [
      { label: 'Settings', route: 'settings.index' },
      { label: 'Tipo de negocios quitar', route: 'typesBusinesses.index' },
      { label: 'Slide', route: 'slides.index' },
      { label: 'Info web', route: 'info-web.index' },
      { label: 'Testimonial', route: 'testimonial.index' },
      { label: 'page', route: 'pages.index' },
      { label: 'Faq', route: 'faqs.index' },
   ];

   const posts = [
      { label: 'Posts', route: 'post.index' },
      { label: 'Categoria de posts', route: 'category-post.index' },
   ];

   const crm = [
      { label: 'Contactos', route: 'contacts.index' },
      { label: 'calendary', route: 'tasks.calendary' },
      { label: 'tasks', route: 'tasks.index' },
      { label: 'Documentos', route: 'documents.index' },
      { label: 'Tipos de contactos', route: 'typesContacts.index' },
      { label: 'Status de contactos quitar', route: 'statuscontacts.index' },
      { label: 'origins quitar', route: 'origins.index' },
   ];

   const locations = [
      { label: 'Pais', route: 'countries.index' },
      { label: 'Estados', route: 'states.index' },
      { label: 'Ciudades', route: 'cities.index' },
   ];

   const propertiesMenu = [
      { label: 'Lista de Propiedades', route: 'properties.index' },
      { label: 'Crear Propiedades', route: 'properties.create' },
      { label: 'Comodidades', route: 'amenities.index' },
      { label: 'Tipos de propiedades', route: 'typesproperties.index' },
      { label: 'Estados fisicos quitar', route: 'phyStates.index' },
   ];

   return (
      <>

         <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start rtl:justify-end">
                     <button
                        data-drawer-target="logo-sidebar"
                        data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        onClick={toggleSidebar}
                     >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                     </button>
                     <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                     </a>
                  </div>
                  <div className="flex items-center">
                     <div className="flex items-center ms-3">

                        <button onClick={toggleDarkMode}>
                           {theme === 'light' ? (
                              <MoonIcon className='size-6 text-gray-700'/>
                           ) : (
                              <SunIcon className='size-6 text-white'/>
                           )}
                        </button>

                        <Dropdown>
                           <Dropdown.Trigger>
                              <span className="inline-flex rounded-md">
                                 <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400   hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                 >
                                    <img className="w-8 h-8 rounded-full" src={`${user.avatar}`} alt="user photo" />
                                 </button>
                              </span>
                           </Dropdown.Trigger>

                           <Dropdown.Content>
                              <div className="px-4 py-3" role="none">
                                 <p className="text-sm text-gray-900 dark:text-white" role="none">
                                    {user.name}
                                 </p>
                                 <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {user.email}
                                 </p>
                              </div>
                              <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                              <Dropdown.Link href={route('logout')} method="post" as="button">
                                 Log Out
                              </Dropdown.Link>
                           </Dropdown.Content>
                        </Dropdown>
                     </div>
                  </div>

               </div>
            </div>
         </nav>

         <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`} 
            
            aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
               <ul className="space-y-2 font-medium">
                  <li>
                     <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                           <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                           <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ms-3">Dashboard</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink href={route('user.index')} active={route().current('user.index')}>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                        <span className="ms-3">Usuario</span>
                     </NavLink>
                  </li>

                  <li>
                     <MultiLevelMenu
                        name={'Propiedades'}
                        svg={HomeModern}
                        items={propertiesMenu}
                        toggle={'global-settings'}
                     />
                  </li>

                  <li>
                     <MultiLevelMenu
                        name={'CRM'}
                        svg={Folder}
                        items={crm}
                        toggle={'global-settings'}
                     />
                  </li>
                  <li>
                     <MultiLevelMenu
                        name={'blog'}
                        svg={DocumentText}
                        items={posts}
                        toggle={'global-settings'}
                     />
                  </li>

                  <li>
                     <MultiLevelMenu
                        name={'Locaciones'}
                        svg={PinMap}
                        items={locations}
                        toggle={'locations'}
                     />
                  </li>

                  <li>
                     <MultiLevelMenu
                        name={'Configuraciones globales'}
                        svg={Gear}
                        items={globalSettings}
                        toggle={'global-settings'}
                     />
                  </li>


                  {/* <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                     </a>
                  </li> */}
               </ul>
            </div>
         </aside>

         <div className="md:ml-64 bg-white dark:bg-gray-800 min-h-screen flex flex-col">
            <div className="p-8 mt-20">
               {header && (
                  <header className="">
                     <div className="max-w-7xl mx-auto py- ">{header}</div>
                  </header>
               )}
               <main className=''>{children}</main>
            </div>
            <footer className='flex flex-col justify-end w-auto mt-auto border-t dark:border-t-gray-700'>
               <div className="flex justify-center p-4 text-gray-800 dark:text-gray-200">

                  <p>© 2024 <Link href="#">Knots Agency</Link>. All rights reserved.</p>
               </div>
            </footer>
         </div>


      </>
   );
}
