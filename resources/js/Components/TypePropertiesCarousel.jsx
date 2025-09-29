"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import HeaderSection from "./HeaderSection";

const TypePropertyCard = ({ typeProperty }) => {
  return (
    <motion.div
      className="relative w-72 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group"
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <img
        src={typeProperty.image}
        alt={typeProperty.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <Link href={route('typePropertiesList.show', { typeProperty: typeProperty.slug })}>
          <h3 className="font-bold text-2xl tracking-wide">{typeProperty.name}</h3>
        </Link>
      </div>
    </motion.div>
  );
};

export default function TypePropertiesCarousel({ typeProperties }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDragConstraint(containerWidth - trackWidth);
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  return (
    <div className="font-sans w-full py-12 md:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">

        <HeaderSection
          title="Tipos de Propiedades"
          description="Explora los diferentes tipos de propiedades disponibles. texto de prueba para ver como queda el texto en esta seccion por la anchura que tiene el contenedor"
        />

        <motion.div
          ref={containerRef}
          className="overflow-hidden cursor-grab"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            ref={trackRef}
            className="flex space-x-6 pb-6 px-4"
            drag="x"
            dragConstraints={{ right: 0, left: dragConstraint - 32 }}
            dragElastic={0.15}
          >
            {typeProperties.map((typeProperty) => (
              <TypePropertyCard key={typeProperty.id} typeProperty={typeProperty} />
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href={route('propertiesList.show')}
            // className="text-gray-300 font-semibold hover:text-white transition-colors duration-300 group"
          >
            Descubre más tipos de propiedades
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
