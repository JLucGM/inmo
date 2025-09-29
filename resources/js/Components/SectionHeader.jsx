import React from 'react';

export default function SectionHeader({ title, subtitle }) {
    return (
        <div className="mb-4">
            <h5 className="font-semibold text-lg">{title}</h5>
            {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
            )}
        </div>
    );
}
