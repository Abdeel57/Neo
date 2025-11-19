import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FixedSizeGrid as Grid } from 'react-window';
import type { GridChildComponentProps } from 'react-window';
import { Check } from 'lucide-react';
import { isMobile } from '../utils/deviceDetection';
import { useTheme } from '../contexts/ThemeContext';
import { DesignSystemUtils } from '../utils/design-system-utils';

interface TicketSelectorProps {
    totalTickets: number;
    occupiedTickets: number[];
    selectedTickets: number[];
    listingMode?: 'paginado' | 'scroll';
    hideOccupied?: boolean;
    onTicketClick: (ticket: number) => void;
}

type ScrollGridData = {
    tickets: number[];
    columns: number;
    cellWidth: number;
    cellGap: number;
    hideOccupied: boolean;
    occupiedSet: Set<number>;
    selectedSet: Set<number>;
    createTicketNode: (ticket: number, isOccupied: boolean, isSelected: boolean) => React.ReactNode;
};

const CELL_GAP = 8;
const MIN_SCROLL_HEIGHT = 320;

const VirtualTicketCell: React.FC<GridChildComponentProps<ScrollGridData>> = ({ columnIndex, rowIndex, style, data }) => {
    const index = rowIndex * data.columns + columnIndex;
    if (index >= data.tickets.length) {
        return <div style={style} />;
    }

    const ticket = data.tickets[index];
    if (data.hideOccupied && data.occupiedSet.has(ticket)) {
        return <div style={style} />;
    }

    const isOccupied = data.occupiedSet.has(ticket);
    const isSelected = data.selectedSet.has(ticket);
    const content = data.createTicketNode(ticket, isOccupied, isSelected);

    if (!content) {
        return <div style={style} />;
    }

    const marginRight = columnIndex === data.columns - 1 ? 0 : data.cellGap;
    const marginBottom = data.cellGap;

    return (
        <div
            style={{
                ...style,
                width: data.cellWidth + marginRight,
                height: data.cellWidth + marginBottom,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: data.cellWidth,
                    height: data.cellWidth,
                    marginRight,
                    marginBottom,
                }}
            >
                {content}
            </div>
        </div>
    );
};

const TicketSelector = ({ totalTickets, occupiedTickets, selectedTickets, onTicketClick, listingMode = 'paginado', hideOccupied = false }: TicketSelectorProps) => {
    const { appearance, preCalculatedTextColors } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 50;
    const occupiedSet = useMemo(() => new Set(occupiedTickets), [occupiedTickets]);
    
    // Usar colores pre-calculados (optimización de rendimiento)
    const backgroundColor = appearance?.colors?.backgroundPrimary || '#1a1a1a';
    const accentColor = appearance?.colors?.accent || '#00ff00';
    const textColor = preCalculatedTextColors.description;

    const orderedTickets = useMemo(() => {
        if (!totalTickets || totalTickets <= 0) return [];
        const allTickets = Array.from({ length: totalTickets }, (_, i) => i + 1);
        const available = allTickets.filter(ticket => !occupiedSet.has(ticket));
        if (hideOccupied) {
            return available;
        }
        const occupiedOnly = allTickets.filter(ticket => occupiedSet.has(ticket));
        return [...available, ...occupiedOnly];
    }, [totalTickets, occupiedSet, hideOccupied]);

    const totalDisplayTickets = orderedTickets.length;
    const totalPages = Math.max(1, Math.ceil((totalDisplayTickets || 0) / ticketsPerPage));

    useEffect(() => {
        setCurrentPage(prev => Math.min(prev, totalPages));
    }, [totalPages]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800));

    useEffect(() => {
        const updateDimensions = () => {
            if (typeof window !== 'undefined') {
                setViewportHeight(window.innerHeight);
            }
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        updateDimensions();

        const handleResize = () => updateDimensions();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        const observer = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(updateDimensions)
            : null;

        if (observer && containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
            if (observer && containerRef.current) {
                observer.unobserve(containerRef.current);
            }
            observer?.disconnect();
        };
    }, []);

    const ticketPadding = useMemo(() => {
        if (!totalTickets || totalTickets <= 0) return 1;
        return String(totalTickets).length;
    }, [totalTickets]);

    const mobile = useMemo(() => {
        try {
            return isMobile();
        } catch {
            return false;
        }
    }, []);

    const selectedSet = useMemo(() => new Set(selectedTickets), [selectedTickets]);

    const createTicketNode = useCallback((ticket: number, isOccupied: boolean, isSelected: boolean) => {
        const baseClasses = 'relative p-1 text-center rounded-md text-sm cursor-pointer transition-all duration-200 flex items-center justify-center aspect-square';
        
        // Estilos dinámicos basados en el estado
        let bgStyle: React.CSSProperties = {};
        let textStyle: React.CSSProperties = {};
        
        if (isOccupied) {
            bgStyle = { background: 'rgba(100, 100, 100, 0.3)' };
            textStyle = { color: 'rgba(150, 150, 150, 0.5)' };
        } else if (isSelected) {
            bgStyle = { background: accentColor };
            textStyle = { color: DesignSystemUtils.getContrastText(accentColor) };
        } else {
            bgStyle = {
                background: backgroundColor,
                position: 'relative' as const,
                overflow: 'hidden' as const
            };
            textStyle = { color: textColor };
        }
        
        const stateClasses = isOccupied
            ? 'cursor-not-allowed line-through'
            : isSelected
                ? 'font-bold shadow-neon-accent'
                : 'hover:shadow-neon-accent';

        const ticketContent = (
            <>
                {!isOccupied && !isSelected && (
                    <div
                        className="absolute inset-0 opacity-20 blur-xl"
                        style={{
                            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`
                        }}
                    />
                )}
                {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Check size={16} style={{ color: textStyle.color }} />
                    </div>
                )}
                <span 
                    className={isSelected ? 'opacity-0' : 'opacity-100 relative z-10'}
                    style={textStyle}
                >
                    {String(ticket).padStart(ticketPadding, '0')}
                </span>
            </>
        );
        
        if (mobile) {
            return (
                <div
                    className={`${baseClasses} ${stateClasses}`}
                    style={bgStyle}
                    onClick={() => !isOccupied && onTicketClick(ticket)}
                >
                    {ticketContent}
                </div>
            );
        }

        return (
            <motion.div
                className={`${baseClasses} ${stateClasses}`}
                style={bgStyle}
                onClick={() => !isOccupied && onTicketClick(ticket)}
                whileTap={{ scale: isOccupied ? 1 : 0.9 }}
            >
                <AnimatePresence>
                    {ticketContent}
                </AnimatePresence>
            </motion.div>
        );
    }, [mobile, onTicketClick, ticketPadding, backgroundColor, accentColor, textColor]);

    const paginatedTickets = useMemo(() => {
        if (listingMode !== 'paginado' || totalDisplayTickets <= 0) {
            return [];
        }

        const start = (currentPage - 1) * ticketsPerPage;
        const end = start + ticketsPerPage;

        return orderedTickets
            .slice(start, end)
            .map(ticket => {
                const isOccupied = occupiedSet.has(ticket);
                const isSelected = selectedSet.has(ticket);
                const content = createTicketNode(ticket, isOccupied, isSelected);

                if (!content) return null;

                return (
                    <div key={ticket} className="flex items-center justify-center">
                        {content}
                    </div>
                );
            })
            .filter(Boolean) as React.ReactNode[];
    }, [listingMode, orderedTickets, totalDisplayTickets, currentPage, ticketsPerPage, occupiedSet, selectedSet, createTicketNode]);

    const columns = useMemo(() => {
        if (containerWidth >= 900) return 10;
        if (containerWidth >= 720) return 9;
        if (containerWidth >= 640) return 8;
        if (containerWidth >= 520) return 6;
        if (containerWidth >= 420) return 5;
        return 4;
    }, [containerWidth]);

    const cellWidth = useMemo(() => {
        if (columns <= 0 || containerWidth <= 0) return 64;
        const totalGap = CELL_GAP * (columns - 1);
        const availableWidth = Math.max(containerWidth - totalGap, 0);
        return Math.max(Math.floor(availableWidth / columns), 48);
    }, [columns, containerWidth]);

    const gridWidth = useMemo(() => {
        if (columns <= 0) return containerWidth;
        return Math.min(containerWidth, columns * (cellWidth + CELL_GAP) - CELL_GAP);
    }, [columns, containerWidth, cellWidth]);

    const gridHeight = useMemo(() => {
        if (listingMode !== 'scroll') return 0;
        const desired = cellWidth * 6;
        const basedOnViewport = Math.floor(viewportHeight * 0.6);
        return Math.max(MIN_SCROLL_HEIGHT, Math.min(desired, basedOnViewport || desired));
    }, [cellWidth, listingMode, viewportHeight]);

    const rowCount = useMemo(() => {
        if (columns <= 0 || totalDisplayTickets <= 0) return 0;
        return Math.ceil(totalDisplayTickets / columns);
    }, [columns, totalDisplayTickets]);

    const itemData = useMemo<ScrollGridData>(() => ({
        tickets: orderedTickets,
        columns,
        cellWidth,
        cellGap: CELL_GAP,
        hideOccupied,
        occupiedSet,
        selectedSet,
        createTicketNode,
    }), [orderedTickets, columns, cellWidth, hideOccupied, occupiedSet, selectedSet, createTicketNode]);

    const Legend = () => {
        const legendTextColor = preCalculatedTextColors.description;
        return (
            <div 
                className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4 text-sm"
                style={{ color: legendTextColor }}
            >
                <div className="flex items-center gap-2">
                    <div 
                        className="w-4 h-4 rounded-full border"
                        style={{
                            background: backgroundColor,
                            borderColor: accentColor + '60'
                        }}
                    />
                    <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                    <div 
                        className="w-4 h-4 rounded-full"
                        style={{ background: accentColor }}
                    />
                    <span>Seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                    <div 
                        className="w-4 h-4 rounded-full line-through"
                        style={{ background: 'rgba(100, 100, 100, 0.3)' }}
                    />
                    <span>Vendido</span>
                </div>
            </div>
        );
    };

    const showScrollGrid = listingMode === 'scroll' && totalDisplayTickets > 0 && columns > 0 && rowCount > 0;

    const containerBgColor = appearance?.colors?.backgroundPrimary || '#1a1a1a';
    const containerTextColor = preCalculatedTextColors.description;
    
    return (
        <div 
            className="p-4 rounded-lg shadow-lg relative overflow-hidden"
            style={{
                background: containerBgColor,
                border: `1px solid ${appearance?.colors?.accent || '#00ff00'}40`
            }}
        >
            <div
                className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${appearance?.colors?.accent || '#00ff00'} 0%, transparent 70%)`
                }}
            />
            <div className="relative z-10">
                <Legend />
            <div ref={containerRef}>
                {listingMode === 'scroll' ? (
                    showScrollGrid ? (
                        <Grid
                            columnCount={columns}
                            columnWidth={cellWidth + CELL_GAP}
                            height={gridHeight}
                            rowCount={rowCount}
                            rowHeight={cellWidth + CELL_GAP}
                            width={gridWidth}
                            itemData={itemData}
                            className="mx-auto"
                        >
                            {VirtualTicketCell}
                        </Grid>
                    ) : (
                        <div className="text-center text-sm text-slate-400 py-6">
                            {totalDisplayTickets > 0
                                ? 'Cargando boletos...'
                                : 'No hay boletos disponibles en este momento.'}
                        </div>
                    )
                ) : (
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {paginatedTickets}
                    </div>
                )}
            </div>
            {listingMode === 'paginado' && (
                <div 
                    className="flex justify-center items-center gap-4 mt-4"
                    style={{ color: containerTextColor }}
                >
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-md disabled:opacity-50"
                        style={{
                            background: appearance?.colors?.action || '#0066ff',
                            color: DesignSystemUtils.getContrastText(appearance?.colors?.action || '#0066ff')
                        }}
                    >
                        Anterior
                    </button>
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-md disabled:opacity-50"
                        style={{
                            background: appearance?.colors?.action || '#0066ff',
                            color: DesignSystemUtils.getContrastText(appearance?.colors?.action || '#0066ff')
                        }}
                    >
                        Siguiente
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

export default TicketSelector;