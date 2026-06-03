import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO, NAV_LINKS } from '../constants/data';
import { Facebook, Instagram, Twitter, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-charcoal-950 pt-16 pb-10 md:pt-24 md:pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-20">

                    {/* Brand */}
                    <div className="space-y-8">
                        <Link to="/" className="group flex items-center gap-2">
                            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                <span className="text-charcoal-950 font-serif text-xl font-black">A</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">Ashok's</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold">Parlour</span>
                            </div>
                        </Link>
                        
                        <p className="text-gray-500 text-sm leading-relaxed font-light">
                            Defining the gold standard of men's grooming in Dhule since {BUSINESS_INFO.foundedYear}. Experience the fusion of tradition and modern style.
                        </p>
                        
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-all border border-white/5 hover:border-gold-500/20">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-all border border-white/5 hover:border-gold-500/20">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {NAV_LINKS.map(link => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-500 hover:text-gold-500 transition-colors text-sm font-light flex items-center gap-2 group">
                                        <span className="w-0 h-px bg-gold-500 group-hover:w-4 transition-all" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-8">Specialties</h4>
                        <ul className="space-y-4 text-gray-500 text-sm font-light">
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500/40" /> Hair Artistry</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500/40" /> Beard Sculpting</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500/40" /> Skin Rejuvenation</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold-500/40" /> Groom Packages</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-8">Visit Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-gold-500 shrink-0 mt-1" size={18} />
                                <span className="text-gray-500 text-sm font-light leading-relaxed">{BUSINESS_INFO.address}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-gold-500 shrink-0" size={18} />
                                <span className="text-gray-500 text-sm font-light">+91 {BUSINESS_INFO.phone}</span>
                            </li>
                            <li className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs uppercase tracking-widest text-gold-500 font-bold">Open Daily</span>
                                </div>
                                <p className="text-gray-600 text-[10px] mt-1 uppercase tracking-widest">08:00 AM - 10:00 PM</p>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <p className="text-center md:text-left">&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
                        <Link to="/login" className="hover:text-gold-500 transition-colors">Admin Login</Link>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
