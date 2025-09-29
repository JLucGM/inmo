"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderSection from './HeaderSection';

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white group-hover:text-pink-500 transition-colors">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const GridItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="mb-4 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto rounded-xl shadow-lg"
        onError={e => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found`;
        }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <div className="flex justify-start gap-3">
                {/* <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-black/30 rounded-lg backdrop-blur-sm group">
                  <HeartIcon />
                </motion.button> */}
              </div>
              <p className="text-white font-bold text-base truncate">{item.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MasonryGrid = ({ items }) => {
  return (
    <div
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
      style={{ columnWidth: '280px' }}
    >
      {items.map(item => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default function Masonary({ items }) {
  return (
    <div className="font-sans transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeaderSection
          title='Blog y Noticias'
          description='Mantente al día con las últimas noticias, consejos y tendencias del sector inmobiliario a través de nuestro blog.'
        />
        <main>
          <MasonryGrid items={items} />
        </main>
      </div>
    </div>
  );
}
