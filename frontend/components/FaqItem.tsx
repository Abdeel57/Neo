import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { isMobile } from '../utils/deviceDetection';

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

// FIX: Explicitly type as React.FC to handle special props like 'key'.
const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
    const { appearance } = useTheme();
    const accentColor = appearance?.colors?.accent || '#ec4899';
    const mobile = isMobile();
    
    // Memoizar el icono SVG para evitar recreaciones
    const questionIcon = useMemo(() => {
        // En móviles: icono simple sin filtros pesados
        if (mobile) {
            return (
                <svg 
                    className="w-6 h-6 transition-colors duration-200" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" 
                        fill={accentColor}
                        opacity={isOpen ? "1" : "0.7"}
                    />
                </svg>
            );
        }
        
        // Desktop: icono con gradiente y efectos
        return (
            <svg 
                className="w-6 h-6 transition-all duration-200" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id={`questionGradient-${isOpen ? 'open' : 'closed'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={accentColor} stopOpacity={isOpen ? "1" : "0.7"} />
                        <stop offset="100%" stopColor={accentColor} stopOpacity={isOpen ? "0.9" : "0.5"} />
                    </linearGradient>
                </defs>
                <path 
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" 
                    fill={`url(#questionGradient-${isOpen ? 'open' : 'closed'})`}
                    style={{ 
                        stroke: accentColor,
                        strokeWidth: '0.5',
                        strokeLinejoin: 'round',
                        transition: 'opacity 0.2s ease'
                    }}
                />
            </svg>
        );
    }, [accentColor, isOpen, mobile]);
    
    return (
        <motion.div 
            className={`relative bg-gradient-to-br ${isOpen ? 'from-action/40 to-accent/40' : 'from-background-secondary to-slate-800/50'} rounded-2xl border-2 ${isOpen ? 'border-action/50 shadow-lg shadow-action/20' : 'border-slate-700/50'} overflow-hidden transition-all duration-200`}
            whileHover={mobile ? {} : { scale: 1.02 }}
            style={{ willChange: 'transform' }}
        >
            {/* Efecto de brillo cuando está abierto - deshabilitado en móviles */}
            {isOpen && !mobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-action/10 via-accent/10 to-action/10" />
            )}
            
            <button
                onClick={onClick}
                className="w-full flex items-center gap-4 text-left p-6 md:p-8 relative z-10 group"
            >
                {/* Icono de interrogación moderno y futurista */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-gradient-to-br from-action/20 to-accent/20' : 'bg-transparent'} ${!mobile && 'group-hover:bg-slate-600/20'}`}>
                    {questionIcon}
                </div>
                
                <div className="flex-1">
                    <h3 className={`font-bold text-lg md:text-xl mb-1 transition-colors ${isOpen ? 'text-white' : 'text-white group-hover:text-action/80'}`}>
                        {question}
                    </h3>
                </div>
                
                <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: mobile ? 0.15 : 0.2, ease: 'easeOut' }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${isOpen ? 'bg-action/20 text-action' : 'text-slate-400'} ${!mobile && 'group-hover:text-white'}`}
                    style={{ willChange: 'transform' }}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: mobile ? 0.15 : 0.2 }}
                        className="overflow-hidden relative z-10"
                        style={{ willChange: 'opacity' }}
                    >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                            <div className="border-t border-action/20 pt-6">
                                <p className="text-base md:text-lg text-slate-200 leading-relaxed whitespace-pre-line">
                                    {answer}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FaqItem;
