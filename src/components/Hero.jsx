import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

const Hero = ({ onOpenBooking }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scaleContent = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return (
        <section ref={ref} id="home" style={{ position: 'relative' }} className="h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-charcoal-950">
            {/* Background Video with Parallax */}
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ y: isMobile ? 0 : yBg }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/hero-bg.png"
                    className="w-full h-full object-cover opacity-50 scale-110"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/90 via-charcoal-950/20 to-charcoal-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-transparent to-charcoal-950/40" />
            </motion.div>

            {/* Content */}
            <motion.div 
                style={{ opacity: opacityContent, scale: scaleContent }}
                className="relative z-10 container mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="inline-flex items-center gap-3 text-gold-500 font-bold tracking-[0.4em] mb-6 uppercase text-xs md:text-sm"
                    >
                        <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500"></span>
                        {BUSINESS_INFO.tagline}
                        <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500"></span>
                    </motion.span>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-white font-black leading-tight md:leading-[0.9] mb-8">
                        The Art of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 animate-pulse relative inline-block">
                            Grooming
                            <div className="absolute inset-0 bg-gold-500 blur-3xl opacity-20" />
                        </span>
                    </h1>

                    <p className="text-gray-400 text-base md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed px-4 md:px-0">
                        Experience world-class styling at Dhule's premier men's parlour. Crafting excellence since <span className="text-white font-bold">{BUSINESS_INFO.foundedYear}</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
                        <button
                            onClick={onOpenBooking}
                            className="btn-gold !py-4 !px-10 rounded-full text-[10px] group w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center gap-3">
                                Book Your Slot
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
                            </span>
                        </button>
                        
                        <a 
                            href="#services"
                            className="btn-outline-gold !py-4 !px-10 rounded-full text-[10px] w-full sm:w-auto flex items-center justify-center"
                        >
                            View Services
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] text-gold-500/40 font-bold">Discover</span>
                <div className="w-px h-16 bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent relative">
                    <motion.div 
                        animate={{ y: [0, 40, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold-500 rounded-full blur-[2px]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
