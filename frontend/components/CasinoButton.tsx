                    />
                )}

<div className="relative z-10 text-background-primary">
    {isOpen ? (
        <X size={32} strokeWidth={2.5} />
    ) : (
        <Dices size={32} strokeWidth={2.5} className="group-hover:rotate-180 transition-transform duration-500" />
    )}
</div>
            </motion.button >
        </div >
    );
};

export default CasinoButton;
