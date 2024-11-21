import { useEffect, useState } from 'react';
import NavLink from './NavLink';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function MultiLevelMenu({ name, svg, items, toggle, userPermissions }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls={name}
                data-collapse-toggle={toggle}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
{svg}
                {/* {SVGIcon && <SVGIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />} */}
                <span className="capitalize flex-1 ms-3 text-left rtl:text-right text-balance whitespace-nowrap">{name}</span>
                {dropdownOpen ? (
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 5 4-4 4 4" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                )}
            </button>
            <ul className={`${dropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                {items.map((item, index) => (
                    // Verificar si el usuario tiene el permiso correspondiente
                    userPermissions.some(perm => perm.name === item.permission) && (
                        <li id={toggle} key={index}>
                            <NavLink
                                className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                href={route(item.route)}
                            >
                                <span className='capitalize'>{item.label}</span>
                            </NavLink>
                        </li>
                    )
                ))}
            </ul>
        </>
    );
}