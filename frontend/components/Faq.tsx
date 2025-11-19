import React, { useState, useEffect, memo } from 'react';
import { getSettings } from '../services/api';
import { FaqItemData } from '../types';
import FaqItem from './FaqItem';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '../utils/deviceDetection';
import { useTheme } from '../contexts/ThemeContext';
import DesignSystemUtils from '../utils/design-system-utils';

const Faq = () => {
    const [faqs, setFaqs] = useState<FaqItemData[]>([]);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);
    const reduceAnimations = useOptimizedAnimations();
    const { appearance } = useTheme();
    
    // Obtener colores del tema
    const accentColor = appearance?.colors?.accent || '#ec4899';
    const backgroundColor = appearance?.colors?.backgroundPrimary || '#111827';
    
    // Función helper para contraste inteligente
    const getTextColor = (bgColor: string): string => {
        return DesignSystemUtils.getContrastText(bgColor);
    };
    
    const titleColor = getTextColor(backgroundColor);
    const descriptionColor = getTextColor(backgroundColor);

    useEffect(() => {
        getSettings().then(settings => setFaqs(settings.faqs));
    }, []);

    const toggleFaq = (id: string) => {
        setOpenFaqId(prevId => {
            // Si la pregunta actual está abierta, cerrarla; si no, abrir esta y cerrar cualquier otra
            if (prevId === id) {
                return null;
            }
            return id;
        });
    };

    if (faqs.length === 0) return null;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            {/* Header mejorado */}
            <motion.div
                initial={reduceAnimations ? {} : { opacity: 0, y: 20 }}
                whileInView={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reduceAnimations ? {} : { duration: 0.6 }}
                className="text-center mb-8 md:mb-10"
            >
                <div className="inline-flex items-center justify-center gap-3 mb-4 md:mb-5">
                    {/* Icono de interrogación moderno y futurista */}
                    <svg 
                        className="w-8 h-8 md:w-10 md:h-10" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="questionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={accentColor} stopOpacity="1" />
                                <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path 
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" 
                            fill={`url(#questionGradient)`}
                            filter="url(#glow)"
                            style={{ 
                                stroke: accentColor,
                                strokeWidth: '0.5',
                                strokeLinejoin: 'round'
                            }}
                        />
                    </svg>
                </div>
                <h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
                    style={{ color: titleColor }}
                >
                    Preguntas Frecuentes
                </h2>
                <p 
                    className="text-lg md:text-xl max-w-2xl mx-auto"
                    style={{ color: descriptionColor }}
                >
                    Encuentra respuestas rápidas a las dudas más comunes sobre nuestros sorteos
                </p>
            </motion.div>

            {/* Grid mejorado con diseño más atractivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {faqs.map((faq, index) => {
                    // Asegurar que cada FAQ tenga un ID único
                    const faqId = faq.id || `faq-${index}`;
                    const isCurrentlyOpen = openFaqId === faqId;
                    
                    return (
                    <motion.div
                        key={faqId}
                        initial={reduceAnimations ? {} : { opacity: 0, y: 30 }}
                        whileInView={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={reduceAnimations ? {} : { duration: 0.5, delay: index * 0.1 }}
                    >
                            <FaqItem 
                                question={faq.question} 
                                answer={faq.answer} 
                                isOpen={isCurrentlyOpen}
                                onClick={() => toggleFaq(faqId)}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer informativo optimizado */}
            {faqs.length > 0 && (
                <motion.div
                    initial={reduceAnimations ? {} : { opacity: 0, y: 20 }}
                    whileInView={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduceAnimations ? {} : { duration: 0.5, delay: 0.3 }}
                    className="mt-8 md:mt-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-action/15 to-accent/15 rounded-xl border border-action/20 backdrop-blur-sm">
                        {/* Icono de interrogación pequeño */}
                        <svg 
                            className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" 
                                fill={accentColor}
                                style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
                            />
                        </svg>
                        <p className="text-xs md:text-sm text-slate-300">
                            ¿No encuentras lo que buscas? <span className="text-accent font-semibold">Contáctanos</span>
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default memo(Faq);
