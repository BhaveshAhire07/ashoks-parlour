import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO, STAFF } from '../constants/data';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-32 bg-charcoal-950 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
                    <div className="lg:w-1/2">
                        <div className="relative group">
                            <div className="hidden md:block absolute -inset-6 border border-gold-500/10 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700" />
                            <div className="hidden md:block absolute -inset-6 border border-gold-500/10 rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100" />
                            <img
                                src="/branded-products.png"
                                alt="Ashok's Branded Products"
                                className="relative rounded-2xl shadow-2xl transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-[1.02]"
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="inline-block px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold">Our Heritage</span>
                        </div>
                        
                        <h2 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-[1.1]">
                            A Legacy of <br />
                            <span className="text-gold-500 italic">Excellence</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
                            Established in <span className="text-white font-bold">{BUSINESS_INFO.foundedYear}</span>, {BUSINESS_INFO.name} has been the cornerstone of men's grooming in Dhule for nearly three decades. We blend traditional barbering art with modern styling techniques to create a signature look for every gentleman.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all group">
                                <div className="w-12 h-12 bg-charcoal-900 rounded-xl flex items-center justify-center text-gold-500 mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin size={20} />
                                </div>
                                <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Our Location</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{BUSINESS_INFO.address}</p>
                            </div>

                            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all group">
                                <div className="w-12 h-12 bg-charcoal-900 rounded-xl flex items-center justify-center text-gold-500 mb-4 group-hover:scale-110 transition-transform">
                                    <Clock size={20} />
                                </div>
                                <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Opening Hours</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">Mon - Sun<br />08:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="pt-20 border-t border-white/5">
                    <div className="text-center mb-20">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-gold-500/50 font-bold block mb-4">The Masters</span>
                        <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Meet the Experts</h3>
                        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {STAFF.map((member) => (
                            <div key={member.id} className="text-center group">
                                <div className="relative mb-8 inline-block">
                                    <div className="absolute inset-0 bg-gold-500 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                                    <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto">
                                        <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full scale-110 group-hover:scale-100 transition-transform duration-700" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-charcoal-950 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-serif text-white mb-2">{member.name}</h4>
                                <p className="text-gold-500 text-xs uppercase tracking-[0.2em] font-bold">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
