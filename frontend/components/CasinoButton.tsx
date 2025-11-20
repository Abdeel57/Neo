import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CasinoButtonProps {
    onSelect: (quantity: number) => void;
}

const QUANTITIES = [1, 3, 5, 10, 20, 50, 100, 200, 250];

const CasinoButton: React.FC<CasinoButtonProps> = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { appearance } = useTheme();
    const accentColor = appearance?.colors?.accent || '#00ff00';

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="mb-4 bg-background-secondary border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden min-w-[140px]"
                    >
                        <div className="p-2 bg-slate-800/50 border-b border-slate-700/50 text-center">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                                Cantidad
                            </span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {QUANTITIES.map((qty) => (
                                <button
                                    key={qty}
                                    onClick={() => {
                                        onSelect(qty);
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors flex items-center justify-between group border-b border-slate-800/30 last:border-0"
                                >
                                    <span className="text-white font-bold text-lg group-hover:text-accent transition-colors">
                                        {qty}
                                    </span>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-300">
                                        boletos
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group"
                style={{
                    background: isOpen ? '#ef4444' : accentColor, // Red when open (to close), Accent when closed
                    boxShadow: `0 0 20px ${isOpen ? '#ef4444' : accentColor}60`
                }}
            >
                {/* Ping animation for attention when closed */}
                {!isOpen && (
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ background: accentColor }}
                    />
                )}

                <div className="relative z-10 text-background-primary">
                    {isOpen ? (
                        <X size={32} strokeWidth={2.5} />
                    ) : (
                        <Dices size={32} strokeWidth={2.5} className="group-hover:rotate-180 transition-transform duration-500" />
                    )}
                </div>
            </motion.button>
        </div>
    );
};

export default CasinoButton;
