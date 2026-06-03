import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants/data';
import { useAuth } from '../context/AuthContext';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Services = () => {
    const [activeCategory, setActiveCategory] = React.useState('All');
    const [searchQuery, setSearchQuery] = React.useState('');
    const { user } = useAuth();

    const categories = ['All', ...new Set(SERVICES.filter(s => s.category).map(s => s.category))];

    const filteredServices = SERVICES.filter(service => {
        const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
        const matchesSearch = (service.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (service.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="services" className="py-12 md:py-20 bg-charcoal-900 relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold-500 font-bold block mb-3">Our Expertise</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Premium Services</h2>
                    <div className="w-16 h-0.5 bg-gold-500 mx-auto rounded-full mb-6" />
                    <p className="text-gray-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
                        From classic cuts to modern styling, we offer a comprehensive range of grooming services tailored for the modern gentleman.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex overflow-x-auto pb-2 gap-2 w-full lg:w-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`shrink-0 px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-500 border ${activeCategory === cat
                                    ? 'bg-gold-500 border-gold-500 text-charcoal-950 shadow-lg shadow-gold-500/20'
                                    : 'bg-white/5 border-white/5 text-gray-400 hover:border-gold-500/30 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="w-full lg:w-72 relative group">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3 text-white text-xs focus:outline-none focus:border-gold-500/50 transition-all duration-500"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gold-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                </div>

                <motion.div
                    layout
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => {
                                const Icon = service.icon || null;
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        key={service.id}
                                        variants={item}
                                        className="group relative p-5 md:p-8 rounded-2xl bg-charcoal-800/40 backdrop-blur-xl border border-white/10 hover:border-transparent transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
                                    >
                                        {/* Animated Border Glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400 via-transparent to-gold-600 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                                        <div className="absolute inset-[1px] rounded-2xl bg-charcoal-900 pointer-events-none" />
                                        
                                        {Icon && (
                                            <div className="hidden md:block absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.12] group-hover:scale-125 transition-all duration-700 text-gold-500 z-10 pointer-events-none">
                                                <Icon size={140} />
                                            </div>
                                        )}

                                        <div className="relative z-20">
                                            {Icon && (
                                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-charcoal-800 to-charcoal-950 flex items-center justify-center text-gold-500 mb-6 border border-white/10 shadow-inner shadow-gold-500/10 group-hover:shadow-gold-500/30 group-hover:text-gold-400 transition-all duration-500">
                                                    <Icon size={24} />
                                                </div>
                                            )}

                                            <span className="text-[9px] uppercase tracking-[0.3em] text-gold-500/80 font-black mb-2 block group-hover:text-gold-400 transition-colors">{service.category || ''}</span>
                                            <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-gradient-gold transition-all duration-300">{service.title || ''}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light group-hover:text-gray-300 transition-colors">{service.description || ''}</p>

                                            <div className="flex items-center justify-between pt-6 border-t border-white/10 relative">
                                                {/* Line animated on hover */}
                                                <div className="absolute top-[-1px] left-0 w-0 h-px bg-gradient-to-r from-gold-500 to-transparent group-hover:w-full transition-all duration-700" />
                                                <span className="text-xl font-serif text-white font-bold min-w-0">
                                                    {user ? (service.price || 'Consult') : <span className="text-sm text-gold-500/60 italic">Login to view</span>}
                                                </span>
                                                <button className="text-[9px] uppercase tracking-widest font-black text-gold-500 hover:text-white transition-colors">
                                                    Details +
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-16 text-center">
                                <p className="text-gray-500 text-base">No services found matching your criteria.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
