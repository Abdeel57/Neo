import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Raffle } from '../types';
import CountdownTimer from './CountdownTimer';
// Removed ShoppingBag import - no longer needed
import ResponsiveImage from './ResponsiveImage';

interface HeroRaffleProps {
    raffle: Raffle;
}

const HeroRaffle: React.FC<HeroRaffleProps> = ({ raffle }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    // Preparar imágenes: incluir imagen principal + galería (evitando duplicados)
    const allImages = (() => {
        const images: string[] = [];
        
        // Agregar imageUrl si existe
        if (raffle.imageUrl) {
            images.push(raffle.imageUrl);
        }
        
        // Agregar heroImage si existe y no está duplicado
        if (raffle.heroImage && !images.includes(raffle.heroImage)) {
            images.push(raffle.heroImage);
        }
        
        // Agregar galería si existe (evitando duplicados)
        if (raffle.gallery && raffle.gallery.length > 0) {
            raffle.gallery.forEach(img => {
                if (!images.includes(img)) {
                    images.push(img);
                }
            });
        }
        
        // Si no hay ninguna imagen, usar default
        if (images.length === 0) {
            return ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&h=600&fit=crop'];
        }
        
        return images;
    })();

    // Función para iniciar el cambio automático
    const startAutoChange = React.useCallback(() => {
        if (allImages.length > 1) {
            // Limpiar intervalo anterior si existe
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            
            // Crear nuevo intervalo de 7 segundos
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
            }, 7000);
        }
    }, [allImages.length]);

    // Función para cambiar de imagen y reiniciar el contador
    const changeImage = React.useCallback((newIndex: number, isManual: boolean = false) => {
        setCurrentImageIndex(newIndex);
        
        // Si es un cambio manual, reiniciar el intervalo
        if (isManual) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            // Reiniciar el intervalo después de un breve delay
            setTimeout(() => {
                if (allImages.length > 1) {
                    intervalRef.current = setInterval(() => {
                        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
                    }, 7000);
                }
            }, 100);
        }
    }, [allImages.length]);

    // Cambio automático - activo en desktop y móvil
    useEffect(() => {
        if (allImages.length > 1) {
            startAutoChange();
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [allImages.length, startAutoChange]);

    // Detectar móvil para desactivar animaciones
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Funciones para manejar swipe en móviles
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && allImages.length > 1) {
            // Deslizar izquierda - siguiente imagen
            const nextIndex = (currentImageIndex + 1) % allImages.length;
            changeImage(nextIndex, true);
        } else if (isRightSwipe && allImages.length > 1) {
            // Deslizar derecha - imagen anterior
            const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
            changeImage(prevIndex, true);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-tertiary">
            {/* Imagen principal como fondo de pantalla completa */}
            <div 
                className="absolute inset-0 w-full h-full touch-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {isMobile ? (
                    // Móvil: Con animaciones y soporte para swipe
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            className="w-full h-full"
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResponsiveImage
                                src={allImages[currentImageIndex]}
                                alt={raffle.title}
                                widths={[1200, 1920]}
                                sizesHint="100vw"
                                preferFormat="auto"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    // Desktop: Con animaciones
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            className="w-full h-full"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResponsiveImage
                                src={allImages[currentImageIndex]}
                                alt={raffle.title}
                                widths={[1920, 2560]}
                                sizesHint="100vw"
                                preferFormat="auto"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
                
                {/* Overlay oscuro para legibilidad */}
                <div className="absolute inset-0 bg-black/35"></div>
                
                {/* Patrón de textura deshabilitado (se removió la marca de agua) */}
            </div>

            {/* Contenido centrado sobre la imagen */}
            <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-between py-8">
                {/* Título y descripción en la parte superior */}
                <motion.div
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isMobile ? { duration: 0.4 } : { duration: 0.8 }}
                    className="flex flex-col items-center text-center space-y-3 sm:space-y-4 pt-12 sm:pt-16 md:pt-20"
                >
                    {/* Título */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none max-w-4xl">
                        {raffle.title}
                    </h1>

                    {/* Descripción (solo si existe) */}
                    {raffle.description && (
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-black tracking-wide max-w-2xl leading-tight">
                            {raffle.description}
                        </p>
                    )}
                </motion.div>

                {/* Sección de compra y contador - En la parte inferior como pie de página */}
                <motion.div
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={isMobile ? { duration: 0.4, delay: 0.1 } : { duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center pb-8 sm:pb-12"
                >
                    <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] bg-white/10 backdrop-blur-lg rounded-3xl px-5 sm:px-6 md:px-7 py-3 sm:py-4 md:py-4 border border-white/20"
                    >
                        {/* Botón principal - Comprar Boletos - Más grande y legible */}
                        <Link
                            to={`/sorteo/${raffle.slug}`}
                            className="inline-flex items-center justify-center gap-0 bg-accent hover:bg-accent/90 text-white font-bold text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-3.5 rounded-2xl shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 w-full mb-3 sm:mb-4"
                        >
                            <span>COMPRAR BOLETOS</span>
                        </Link>

                        {/* Contador de tiempo */}
                        <div className="mb-3 sm:mb-4">
                            <p className="text-white/80 text-sm sm:text-base md:text-lg font-medium">El sorteo termina en:</p>
                        </div>
                        <CountdownTimer targetDate={raffle.drawDate} />
                    </div>

                    {/* Galería de miniaturas (si hay múltiples imágenes) */}
                    {allImages.length > 1 && (
                        <div className="mt-6 flex gap-2 sm:gap-3">
                            {allImages.slice(0, 4).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeImage(index, true)}
                                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                                        index === currentImageIndex 
                                            ? 'border-accent scale-110 shadow-lg shadow-accent/50' 
                                            : 'border-white/40 opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <ResponsiveImage
                                        src={img}
                                        alt={`Vista ${index + 1}`}
                                        widths={[240, 320, 480, 640]}
                                        sizesHint="96px"
                                        preferFormat="auto"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                            {allImages.length > 4 && (
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/20 flex items-center justify-center text-white text-xs border-2 border-white/40">
                                    +{allImages.length - 4}
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroRaffle;

