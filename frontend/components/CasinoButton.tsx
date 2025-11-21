import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CasinoButtonProps {
    onSelect: (quantity: number) => void;
}

const CasinoButton: React.FC<CasinoButtonProps> = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { appearance } = useTheme();
    const accentColor = appearance?.colors?.accent || '#00ff00';

    const quantities = [1, 3, 5, 10, 20, 50, 100, 200, 250];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-background-secondary border border-slate-700 rounded-2xl shadow-2xl overflow-hidden mb-4 min-w-[200px]"
                    >
                        <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                            <span className="font-bold text-white">Selección Rápida</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-2 grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                            {quantities.map((qty) => (
                                <button
                                    key={qty}
                                    onClick={() => {
                                        onSelect(qty);
                                        setIsOpen(false);
                                    }}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors border border-slate-600/50 hover:border-slate-500"
                                >
                                    <span className="text-lg font-bold text-white">{qty}</span>
                                    <span className="text-[10px] text-slate-400 uppercase">Boletos</span>
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
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-background-primary relative overflow-hidden group"
                style={{ background: accentColor }}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
