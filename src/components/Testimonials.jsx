import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants/data';
import { motion } from 'framer-motion';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-16 md:py-32 bg-charcoal-900 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/5 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold-500 font-bold block mb-4">Testimonials</span>
                    <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">Client Stories</h2>
                    <div className="w-20 h-0.5 bg-gold-500 mx-auto rounded-full mb-8" />
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Don't just take our word for it. Hear from the gentlemen who trust us with their style.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            key={t.id}
                            className="group relative p-6 md:p-10 rounded-3xl bg-charcoal-800/40 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 transition-all duration-500"
                        >
                            <div className="absolute top-6 md:top-8 right-6 md:right-10 text-gold-500/10 group-hover:text-gold-500/20 transition-colors duration-500">
                                <div className="md:hidden"><Quote size={40} /></div>
                                <div className="hidden md:block"><Quote size={60} /></div>
                            </div>

                            <div className="flex gap-1.5 mb-8">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        size={16}
                                        className={starIndex < Math.floor(t.rating) ? "text-gold-500 fill-gold-500" : "text-gray-700"}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light italic">
                                "{t.review}"
                            </p>

                            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 font-serif text-xl font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-serif text-lg leading-none mb-1">{t.name}</h4>
                                    <span className="text-[10px] uppercase tracking-widest text-gold-500/50 font-bold">Verified Customer</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
