import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedComponent ({ children }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Deja de observar una vez que el elemento es visible
                }
            },
            {
                threshold: 0.2, // 10% de visibilidad para activar la animación
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }} // Inicialmente fuera de la vista
            animate={isVisible ? { opacity: 1, y: 0 } : {}} // Animación al entrar
            transition={{ duration: 1 }} // Duración de la animación
            style={{ margin: "20px 0" }} // Espaciado opcional
        >
            {children}
        </motion.div>
    );
};