import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, BUSINESS_INFO } from '../constants/data';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleInquiry = (productTitle) => {
        const message = `Hi, I am interested in the *${productTitle}* from your premium grooming range. Is it currently available?`;
        const waLink = `https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(message)}`;
        window.open(waLink, '_blank');
    };

    return (
        <section id="products" className="py-12 md:py-20 bg-charcoal-950 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold-500 font-bold block mb-3">Grooming Essentials</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Premium Products</h2>
                    <div className="w-16 h-0.5 bg-gold-500 mx-auto rounded-full mb-6" />
                    <p className="text-gray-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
                        Elevate your daily routine with our curated selection of high-performance grooming products.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            key={product.id}
                            className="group relative bg-charcoal-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-transparent transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
                        >
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-transparent to-gold-600 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0" />
                            <div className="absolute inset-[1px] rounded-3xl bg-charcoal-950/90 pointer-events-none z-0" />

                            {/* Image Container */}
                            <div className="aspect-[3/2] md:aspect-[4/5] overflow-hidden relative z-10 p-2">
                                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-transparent transition-all duration-700 z-10" />
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="w-10 h-10 rounded-full bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center text-gold-500 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold-500 hover:text-charcoal-950">
                                            <ShoppingBag size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            {user ? (
                                <div className="p-4 md:p-6 relative z-20">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-serif text-white mb-0.5 group-hover:text-gradient-gold transition-all duration-300">{product.title}</h3>
                                            <p className="text-[9px] text-gold-500/80 uppercase tracking-widest font-black group-hover:text-gold-400 transition-colors">Limited Edition</p>
                                        </div>
                                        <span className="text-xl font-serif text-gold-500 font-bold group-hover:text-gold-400 transition-colors">
                                            {product.price}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-6 leading-relaxed font-light">{product.description}</p>

                                    <button 
                                        onClick={() => handleInquiry(product.title)}
                                        className="w-full btn-outline-gold !rounded-xl !py-3 flex items-center justify-center gap-2"
                                    >
                                        <span className="text-[10px]">Inquire Availability</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="p-4 md:p-6 relative z-20">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-serif text-white mb-0.5 group-hover:text-gradient-gold transition-all duration-300">{product.title}</h3>
                                            <p className="text-[9px] text-gold-500/80 uppercase tracking-widest font-black group-hover:text-gold-400 transition-colors">Limited Edition</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-6 leading-relaxed font-light">{product.description}</p>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-0 backdrop-blur-sm bg-charcoal-950/60 rounded-xl z-10 flex flex-col items-center justify-center gap-2 p-4">
                                            <p className="text-[10px] uppercase tracking-widest text-gold-500 font-bold text-center">Login to view pricing</p>
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="btn-gold rounded-xl !py-2 !px-6 text-[10px]"
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                        <div className="blur-[4px] pointer-events-none opacity-50">
                                            <span className="text-xl font-serif text-gold-500 font-bold">{product.price}</span>
                                            <button className="w-full btn-outline-gold !rounded-xl !py-3 flex items-center justify-center gap-2 mt-4">
                                                <span className="text-[10px]">Inquire Availability</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
