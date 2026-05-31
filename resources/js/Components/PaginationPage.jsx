import React from 'react';
import { Link } from '@inertiajs/react';
import ChevronLeft from "./Icon/ChevronLeft";
import ChevronRight from "./Icon/ChevronRight";

const PaginationPage = ({ links, meta }) => {
    if (!links || links.length < 3) return null;

    const prevLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, -1);

    return (
        <div className="flex justify-center items-center gap-1 mt-8">
            {prevLink.url ? (
                <Link href={prevLink.url} preserveState preserveScroll className="px-3 py-2 rounded text-gray-600 hover:text-black hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="size-5" />
                </Link>
            ) : (
                <span className="px-3 py-2 rounded text-slate-400 cursor-not-allowed">
                    <ChevronLeft className="size-5" />
                </span>
            )}

            {pageLinks.map((link, i) =>
                link.url ? (
                    <Link
                        key={i}
                        href={link.url}
                        preserveState
                        preserveScroll
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}>
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Link>
                ) : (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className="px-3 py-1.5 rounded text-sm text-gray-400"
                    />
                )
            )}

            {nextLink.url ? (
                <Link href={nextLink.url} preserveState preserveScroll className="px-3 py-2 rounded text-gray-600 hover:text-black hover:bg-gray-100 transition-colors">
                    <ChevronRight className="size-5" />
                </Link>
            ) : (
                <span className="px-3 py-2 rounded text-slate-400 cursor-not-allowed">
                    <ChevronRight className="size-5" />
                </span>
            )}
        </div>
    );
};

export default PaginationPage;