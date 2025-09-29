import React from 'react';
import HeaderSection from './HeaderSection';

export default function TeamSection({ data = [], setting }) {
  const anonymousFallbackImage = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA"; // Placeholder para avatars faltantes

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <HeaderSection
          title={setting?.titleTeamSection}
          description={setting?.descriptionTeamSection}
        />

        {/* Grid de Miembros del Equipo */}
        {data.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-y-14 max-w-3xl mx-auto lg:max-w-full">
            {data.map((person, index) => (
              <div key={person.id || index} className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                <div className="relative mb-5">
                  <img
                    src={person.avatar || anonymousFallbackImage}
                    alt={`${person.name} image`}
                    className="w-28 h-28 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-400"
                    onError={(e) => {
                      const target = e.target;
                      target.onerror = null;
                      target.src = anonymousFallbackImage;
                    }}
                  />
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {person.name}
                </h4>
                <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  {person.role || 'Miembro del equipo'} {/* Fallback si no hay role */}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">No hay miembros del equipo disponibles.</p>
        )}
      </div>
    </section>
  );
}
