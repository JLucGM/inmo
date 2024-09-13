import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import MultiLevelMenu from '@/Components/MultiLevelMenu';
import UserIcon from '@/Components/Icon/UserIcon';


export default function Authenticated({ user, header, children }) {

   const [darkMode, setDarkMode] = useState(() => {
      return localStorage.getItem('darkMode') === 'true';
   });

   const toggleDarkMode = () => {
      setDarkMode(prevMode => {
         const newMode = !prevMode;
         localStorage.setItem('darkMode', newMode);
         return newMode;
      });
   };
   
   useEffect(() => {
      document.body.classList.toggle('dark', darkMode);
   }, [darkMode]);

   const menuItems = [
      { label: 'Tipos de propiedades', route: 'typesproperties.index' },
      { label: 'Estados fisicos', route: 'phyStates.index' },
      { label: 'Tipo de negocios', route: 'typesBusinesses.index' },
      { label: 'Pais', route: 'countries.index' },
      { label: 'Estados', route: 'states.index' },
      { label: 'Ciudades', route: 'cities.index' },
      { label: 'Categorias de comodidades', route: 'category-amenities.index' },
      { label: 'Comodidades', route: 'amenities.index' },
      
  ];

   return (
      <>
      
         <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start rtl:justify-end">
                     <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
                           {darkMode
                              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                              </svg>

                              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                              </svg>
                           }
                        </button>

                        <Dropdown>
                           <Dropdown.Trigger>
                              <span className="inline-flex rounded-md">
                                 <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400   hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                 >
                                    <img className="w-8 h-8 rounded-full" src={`/img/profile/${user.avatar}`} alt="user photo" />
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

         <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
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
                     name={'Configuraciones globales'}
                     svg={UserIcon}
                     items={menuItems}
                     toggle={'global-settings'}
                     />
                  </li>
                  

                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                     </a>
                  </li>
               </ul>
            </div>
         </aside>

         <div className="p-4 sm:ml-64 bg-white dark:bg-gray-800 min-h-screen">
            <div className="p-4 mt-20">
               {header && (
                  <header className="">
                     <div className="max-w-7xl mx-auto py-6 ">{header}</div>
                  </header>
               )}
               <main className=''>{children}</main>
            </div>
         </div>

      </>
   );
}
