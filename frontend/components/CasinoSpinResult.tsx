import React from 'react';
import { motion } from 'framer-motion';
import { Dices, ShoppingCart, RefreshCw, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CasinoSpinResultProps {
    selectedCount: number;
    onBuy: () => void;
    onSpinAgain: () => void;
    onClose: () => void;
}

const CasinoSpinResult: React.FC<CasinoSpinResultProps> = ({ selectedCount, onBuy, onSpinAgain, onClose }) => {
    const { appearance } = useTheme();
    const accentColor = appearance?.colors?.accent || '#00ff00';

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-background-secondary border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Dices size={40} style={{ color: accentColor }} />
                        </motion.div>
                        <div
                            className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                            style={{ background: accentColor }}
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">
                        ¡{selectedCount} Boletos!
                    </h2>
                    <p className="text-slate-300 mb-8">
                        Hemos seleccionado {selectedCount} boletos al azar para ti.
                        ¿Qué deseas hacer?
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={onBuy}
                            className="w-full py-4 px-6 rounded-xl font-bold text-lg text-background-primary flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                            style={{ background: accentColor }}
                        >
                            <ShoppingCart size={24} />
                            Comprar Ahora
                        </button>

                        <button
                            onClick={onSpinAgain}
                            className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-slate-700 hover:bg-slate-600 flex items-center justify-center gap-2 transition-all"
                        >
                            <RefreshCw size={24} />
                            Volver a Tirar
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CasinoSpinResult;
