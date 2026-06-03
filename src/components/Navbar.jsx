import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants/data';
import LiveStatus from './LiveStatus';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenBooking }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top or specific section on location change
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isScrolled
                ? 'bg-charcoal-950/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4'
                : 'bg-gradient-to-b from-charcoal-950/80 to-transparent py-7'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-12">
                    {/* Logo & Status */}
                    <div className="flex items-center gap-6 h-full">
                        <Link to="/" className="group flex items-center gap-3 h-full">
                            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                                <span className="text-charcoal-950 font-serif text-xl font-black">A</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="font-serif text-xl font-black tracking-tight text-gradient-gold leading-none">Ashok's</span>
                                <span className="hidden sm:block text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mt-1 group-hover:text-gold-500 transition-colors">Parlour</span>
                            </div>
                        </Link>
                        <div className="hidden sm:flex items-center h-full">
                            <div className="w-px h-6 bg-white/10 mx-2" />
                            <LiveStatus />
                        </div>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 h-full">
                        <div className="flex items-center gap-8 mr-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gold-400 transition-all duration-300 font-black relative group py-2"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 border-l border-white/10 pl-8 h-full">
                            <button
                                onClick={onOpenBooking}
                                className="btn-gold !py-2 !px-4 lg:!py-2.5 lg:!px-6 rounded-xl text-[10px] shadow-none hover:shadow-gold-500/20"
                            >
                                Book Now
                            </button>
                            
                            <div className="relative flex items-center h-full">
                                <button
                                    onClick={() => user ? setIsProfileOpen(!isProfileOpen) : navigate('/login')}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${user 
                                        ? 'bg-gold-500 text-charcoal-950 border-gold-500 shadow-lg shadow-gold-500/20' 
                                        : 'bg-white/5 text-gray-400 border-white/5 hover:text-gold-500 hover:bg-gold-500/10'}`}
                                >
                                    <User size={18} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && user && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full right-0 mt-4 w-64 bg-charcoal-900 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                                        >
                                            <div className="mb-4 pb-4 border-b border-white/5">
                                                <p className="text-[10px] text-gold-500 font-black uppercase tracking-widest mb-1">{user.role}</p>
                                                <p className="text-sm text-white font-bold truncate">{user.email}</p>
                                            </div>

                                            <div className="space-y-1">
                                                {user.role === 'admin' ? (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        <LayoutDashboard size={16} /> Admin Dashboard
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to="/profile"
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        <User size={16} /> My Profile
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-red-500 hover:bg-red-500/10 transition-all font-bold"
                                                >
                                                    <LogOut size={16} /> Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[59] md:hidden"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 w-80 bg-charcoal-950 z-[60] flex flex-col p-8 gap-6 border-l border-white/10 shadow-2xl md:hidden overflow-y-auto"
                    >
                        <button onClick={() => setIsMobileMenuOpen(false)} className="self-end w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10">
                            <X size={20} />
                        </button>
                        
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl font-serif text-white hover:text-gold-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        <div className="pt-4 border-t border-white/10 space-y-4 mt-auto">
                            <button
                                onClick={() => {
                                    onOpenBooking();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full btn-gold rounded-xl py-4"
                            >
                                Book Appointment
                            </button>
                            
                            {user ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-gold-500 font-bold uppercase tracking-widest mb-1">{user.role}</p>
                                        <p className="text-sm text-white font-bold truncate">{user.email}</p>
                                    </div>
                                    {user.role === 'admin' ? (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm text-white bg-white/5 border border-white/5"
                                        >
                                            <LayoutDashboard size={18} /> Admin Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm text-white bg-white/5 border border-white/5"
                                        >
                                            <User size={18} /> My Profile
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm text-red-500 bg-red-500/10 font-bold"
                                    >
                                        <LogOut size={18} /> Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm text-white bg-white/5 border border-white/5"
                                >
                                    <User size={18} /> Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </>
    );
};

export default Navbar;
