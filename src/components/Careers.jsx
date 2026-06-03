import React from 'react';
import { motion } from 'framer-motion';
import { JOBS, BUSINESS_INFO } from '../constants/data';
import { Briefcase, ArrowRight } from 'lucide-react';

const Careers = () => {
    return (
        <section id="careers" className="py-16 md:py-32 bg-charcoal-900 border-t border-white/5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-start md:items-end justify-between mb-20 gap-10">
                    <div className="max-w-2xl">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-gold-500 font-bold block mb-4">Join Our Legacy</span>
                        <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight md:leading-none">We're <br /><span className="text-gold-500 italic">Hiring</span></h2>
                    </div>

                    <p className="text-gray-400 text-lg max-w-md font-light leading-relaxed">
                        Are you passionate about the art of grooming? Join Dhule's premier men's parlour and elevate your career with the masters.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {JOBS.map((job, index) => (
                        <motion.div 
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            key={job.id} 
                            className="group relative bg-charcoal-800/40 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 hover:border-transparent transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
                        >
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-transparent to-gold-600 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0" />
                            <div className="absolute inset-[1px] rounded-3xl bg-charcoal-900 pointer-events-none z-0" />

                            <div className="relative z-10 flex justify-between items-start mb-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-charcoal-800 to-charcoal-950 rounded-2xl flex items-center justify-center text-gold-500 mb-6 border border-white/10 shadow-inner shadow-gold-500/10 group-hover:shadow-gold-500/30 group-hover:text-gold-400 transition-all duration-500">
                                    <Briefcase size={28} />
                                </div>
                                <div className="px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] uppercase tracking-widest font-bold">
                                    {job.type}
                                </div>
                            </div>

                            <div className="relative z-10 mb-10">
                                <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-gradient-gold transition-all duration-300">{job.title}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                                    <span className="w-4 h-px bg-gold-500/30" />
                                    {job.experience} Experience Required
                                </p>
                            </div>

                            <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-10 font-light max-w-sm group-hover:text-gray-300 transition-colors">
                                {job.description}
                            </p>

                            <a
                                href={`https://wa.me/${BUSINESS_INFO.phone}?text=Hi, I am interested in the ${job.title} position at Ashok's Men's Parlour.`}
                                target="_blank"
                                rel="noreferrer"
                                className="relative z-10 inline-flex items-center gap-3 text-gold-500 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-widest group/link"
                            >
                                Apply via WhatsApp 
                                <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Careers;
