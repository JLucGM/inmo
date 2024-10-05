import { Link } from "@inertiajs/react";

export default function Breadcrumb({ items }) {
    return (
        <nav className="flex bg-gray-50 text-gray-700 borders border-gray-200 my-4 py-2 px-5 rounded-full dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {item.href ? (
                            <Link  href={route(item.href)} className="capitalize text-sm text-gray-700 hover:text-gray-900 inline-flex items-center dark:text-gray-400 dark:hover:text-white">
                                {item.icon && (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d={item.icon.path} />
                                    </svg>
                                )}
                                {item.name}
                            </Link>
                        ) : (
                            <span className="capitalize text-gray-400 inline-flex items-center">
                                {item.icon && (
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d={item.icon.path} />
                                    </svg>
                                )}
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}