import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Header = () => {
    const { appearance } = useTheme();
    
    // Obtener colores del tema o usar valores por defecto
    const primaryColor = appearance?.colors?.action || '#0ea5e9';
    const accentColor = appearance?.colors?.accent || '#ec4899';
    const headerColor = primaryColor; // Usar el color action como color principal del header

    return (
        <header className="relative w-full sticky top-0 z-50 overflow-hidden">
            {/* Línea de color personalizable */}
            <div 
                className="w-full h-2 md:h-3"
                style={{ 
                    background: `linear-gradient(90deg, ${headerColor} 0%, ${accentColor} 50%, ${headerColor} 100%)`
                }}
            />
            
            {/* Barra principal del header */}
            <div 
                className="w-full py-4 md:py-5 px-4 md:px-6"
                style={{ 
                    backgroundColor: appearance?.colors?.backgroundSecondary || '#1f2937'
                }}
            >
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center justify-between relative">
                        {/* Botón Izquierdo - Métodos de Pago */}
                        <Link 
                            to="/cuentas-de-pago"
                            className="flex-1 flex items-center justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full max-w-[180px] md:max-w-[220px] px-3 py-2.5 md:py-3 rounded-lg font-bold text-white text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#ffffff',
                                    border: `2px solid ${headerColor}`
                                }}
                            >
                                <div className="flex flex-col items-center leading-tight">
                                    <span>MÉTODOS</span>
                                    <span>DE PAGO</span>
                                </div>
                            </motion.button>
                        </Link>

                        {/* Logo en el centro */}
                        <Link 
                            to="/" 
                            className="flex-shrink-0 mx-4 md:mx-8 group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="relative"
                            >
                                {appearance?.logoUrl ? (
                                    <div className="relative">
                                        {/* Efecto de resplandor */}
                                        <div 
                                            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${headerColor}40, ${accentColor}40)`
                                            }}
                                        />
                                        {/* Contenedor cuadrado para el logo */}
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center bg-transparent">
                                            <img 
                                                src={appearance.logoUrl} 
                                                alt={appearance?.siteName || 'Logo'} 
                                                className="w-full h-full object-contain drop-shadow-lg bg-transparent"
                                                style={{ mixBlendMode: 'normal' }}
                                            />
                                        </div>
                                        {/* Badge de verificación (opcional) */}
                                        <div 
                                            className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10"
                                            style={{ backgroundColor: '#3b82f6' }}
                                        >
                                            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {/* Efecto de resplandor */}
                                        <div 
                                            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${headerColor}40, ${accentColor}40)`
                                            }}
                                        />
                                        {/* Contenedor cuadrado con nombre */}
                                        <div 
                                            className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center shadow-xl"
                                            style={{
                                                backgroundColor: appearance?.colors?.backgroundPrimary || '#111827',
                                                border: `2px solid ${headerColor}`
                                            }}
                                        >
                                            <span 
                                                className="text-lg md:text-xl font-black"
                                                style={{ color: headerColor }}
                                            >
                                                {appearance?.siteName?.charAt(0) || 'L'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </Link>

                        {/* Botón Derecho - Verificar Boletos */}
                        <Link 
                            to="/verificador"
                            className="flex-1 flex items-center justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full max-w-[180px] md:max-w-[220px] px-3 py-2.5 md:py-3 rounded-lg font-bold text-white text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#ffffff',
                                    border: `2px solid ${headerColor}`
                                }}
                            >
                                <div className="flex flex-col items-center leading-tight">
                                    <span>VERIFICAR</span>
                                    <span>BOLETOS</span>
                                </div>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
