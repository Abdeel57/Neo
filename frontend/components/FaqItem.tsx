import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

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
    
    return (
        <motion.div 
            className={`relative bg-gradient-to-br ${isOpen ? 'from-action/40 to-accent/40' : 'from-background-secondary to-slate-800/50'} rounded-2xl border-2 ${isOpen ? 'border-action/50 shadow-lg shadow-action/20' : 'border-slate-700/50'} overflow-hidden transition-all duration-300 hover:shadow-xl`}
            whileHover={{ scale: 1.02 }}
        >
            {/* Efecto de brillo cuando está abierto */}
            {isOpen && (
                <div className="absolute inset-0 bg-gradient-to-r from-action/10 via-accent/10 to-action/10 animate-pulse" />
            )}
            
            <button
                onClick={onClick}
                className="w-full flex items-center gap-4 text-left p-6 md:p-8 relative z-10 group"
            >
                {/* Icono de interrogación moderno y futurista */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-action/20 to-accent/20' : 'bg-transparent group-hover:bg-slate-600/20'}`}>
                    <svg 
                        className="w-6 h-6 transition-all duration-300" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id={`questionGradient-${isOpen ? 'open' : 'closed'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={accentColor} stopOpacity={isOpen ? "1" : "0.7"} />
                                <stop offset="100%" stopColor={accentColor} stopOpacity={isOpen ? "0.9" : "0.5"} />
                            </linearGradient>
                            <filter id={`glow-${isOpen ? 'open' : 'closed'}`}>
                                <feGaussianBlur stdDeviation={isOpen ? "2" : "1"} result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path 
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" 
                            fill={`url(#questionGradient-${isOpen ? 'open' : 'closed'})`}
                            filter={`url(#glow-${isOpen ? 'open' : 'closed'})`}
                            style={{ 
                                stroke: accentColor,
                                strokeWidth: '0.5',
                                strokeLinejoin: 'round',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </svg>
                </div>
                
                <div className="flex-1">
                    <h3 className={`font-bold text-lg md:text-xl mb-1 transition-colors ${isOpen ? 'text-white' : 'text-white group-hover:text-action/80'}`}>
                        {question}
                    </h3>
                </div>
                
                <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-action/20 text-action' : 'text-slate-400 group-hover:text-white'}`}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden relative z-10"
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
