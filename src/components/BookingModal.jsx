import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, CheckCircle, ChevronRight, ChevronLeft, Scissors, Users } from 'lucide-react';
import { SERVICES, STAFF } from '../constants/data';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const BookingModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        category: '',
        services: [], // Array of selected services
        professional: null,
        type: 'Individual', // Individual vs Group
        name: '',
        phone: '',
        date: '',
        time: ''
    });

    // Auto-fill user data if logged in
    useEffect(() => {
        if (user && isOpen) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                // If we had a phone in user context, we'd add it here
            }));
        }
    }, [user, isOpen]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Derived data
    const categories = [...new Set(SERVICES.map(s => s.category))];
    const filteredServices = formData.category
        ? SERVICES.filter(s => s.category === formData.category)
        : SERVICES;

    const toggleService = (service) => {
        setFormData(prev => {
            const isSelected = prev.services.find(s => s.id === service.id);
            if (isSelected) {
                return { ...prev, services: prev.services.filter(s => s.id !== service.id) };
            } else {
                return { ...prev, services: [...prev.services, service] };
            }
        });
    };

    const calculateTotalPrice = () => {
        if (formData.services.length === 0) return '—';
        let min = 0;
        let hasConsult = false;

        formData.services.forEach(s => {
            if (s.price.includes('Consult')) {
                hasConsult = true;
            } else {
                const priceMatch = s.price.match(/₹(\d+)/);
                if (priceMatch) {
                    min += parseInt(priceMatch[1]);
                }
            }
        });

        if (hasConsult) return `₹${min}+ (Consult)`;
        return `₹${min}`;
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(async () => {
            const servicesList = formData.services.map(s => s.title).join(', ');
            const totalPrice = calculateTotalPrice();
            const message = `*New Booking Request*\n\n` +
                `*Type:* ${formData.type}\n` +
                `*Services:* ${servicesList} (${formData.category})\n` +
                `*Total Est:* ${totalPrice}\n` +
                `*Professional:* ${formData.professional?.name || 'Any Professional'}\n` +
                `*Date:* ${formData.date}\n` +
                `*Time:* ${formData.time}\n` +
                `*Client:* ${formData.name}\n` +
                `*Phone:* ${formData.phone}`;

            // Save to Supabase if user is logged in
            if (user) {
                const { error } = await supabase
                    .from('bookings')
                    .insert({
                        user_id: user.id,
                        customer_name: user.name,
                        customer_phone: formData.phone || user.phone,
                        customer_email: user.email,
                        services: formData.services.map(s => s.title),
                        category: formData.category,
                        professional_name: formData.professional?.name || 'Any Professional',
                        date: formData.date,
                        time: formData.time,
                        type: formData.type,
                        total_price: calculateTotalPrice(),
                        status: 'Pending',
                    });

                if (error) {
                    console.error('Booking error:', error);
                    return;
                }
            }

            const waLink = `https://wa.me/919403428663?text=${encodeURIComponent(message)}`;
            window.open(waLink, '_blank');

            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setStep(1);
                setFormData({
                    category: '',
                    services: [],
                    professional: null,
                    type: 'Individual',
                    name: '',
                    phone: '',
                    date: '',
                    time: ''
                });
            }, 2000);
        }, 1500);
    };

    const variants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                        <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full h-full max-h-full rounded-none flex-col md:max-w-4xl md:rounded-3xl md:max-h-[90vh] md:flex-row bg-charcoal-900 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex"
                    >
                        {/* Animated Border Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-500/5 pointer-events-none" />
                        {/* Summary Sidebar (Desktop) */}
                        <div className="hidden md:flex md:w-80 bg-charcoal-950 p-8 border-r border-white/5 flex-col justify-between shrink-0">
                            <div>
                                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center mb-8 rotate-3">
                                    <Scissors className="text-charcoal-950" size={24} />
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-2">Your Booking</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">Summary</p>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gold-500/50 font-bold">Services</p>
                                        <div className="flex flex-wrap gap-1">
                                            {formData.services.length > 0 ? (
                                                formData.services.map(s => (
                                                    <span key={s.id} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white border border-white/5">{s.title}</span>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-600 italic">None selected</p>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-1">{formData.category}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-gold-500/50 font-bold">Stylist</p>
                                        <p className="text-sm text-white font-medium">{formData.professional?.name || 'Any Professional'}</p>
                                    </div>
                                    {(formData.date || formData.time) && (
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gold-500/50 font-bold">When</p>
                                            <p className="text-sm text-white font-medium">
                                                {formData.date && new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                {formData.time && ` @ ${formData.time}`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">Estimated Total</span>
                                    <span className="text-xl font-serif text-gold-500 font-bold">{calculateTotalPrice()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between p-6 md:p-8 shrink-0 relative z-10 border-b border-white/5 bg-charcoal-950/30 backdrop-blur-sm">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-serif text-white flex items-center gap-2">
                                        Step <span className="text-gradient-gold">{step}</span>
                                    </h3>
                                    <div className="flex gap-1 mt-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div
                                                key={i}
                                                className={`h-1.5 rounded-full transition-all duration-700 ease-out ${step >= i ? 'w-10 bg-gradient-to-r from-gold-400 to-gold-600 shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'w-4 bg-white/10'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content Body */}
                            <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
                                        >
                                            <CheckCircle size={40} />
                                        </motion.div>
                                        <h4 className="text-2xl font-serif text-white mb-2">Request Sent!</h4>
                                        <p className="text-gray-400 max-w-xs mx-auto">We're redirecting you to WhatsApp to finalize your booking.</p>
                                    </div>
                                ) : (
                                    <div className="min-h-[300px]">
                                        <AnimatePresence mode='wait'>
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    className="space-y-6"
                                                >
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {categories.map(cat => (
                                                            <button
                                                                key={cat}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, category: cat });
                                                                    handleNext();
                                                                }}
                                                                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-left flex items-center gap-4"
                                                            >
                                                                <div className="w-12 h-12 rounded-xl bg-charcoal-950 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                                                                    <Scissors size={20} />
                                                                </div>
                                                                <span className="text-lg font-bold text-white group-hover:text-gold-500 transition-colors">{cat}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    className="space-y-4"
                                                >
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select one or more services</h4>
                                                        <span className="text-[10px] bg-gold-500/10 text-gold-500 px-2 py-1 rounded-full font-bold">{formData.services.length} Selected</span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {filteredServices.map(service => {
                                                            const isSelected = formData.services.find(s => s.id === service.id);
                                                            return (
                                                                <button
                                                                    key={service.id}
                                                                    onClick={() => toggleService(service)}
                                                                    className={`w-full flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all ${isSelected
                                                                        ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                                                                        : 'bg-white/5 border-white/5 hover:border-white/20'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-gold-500 border-gold-500' : 'border-white/20 bg-transparent'}`}>
                                                                            {isSelected && <CheckCircle size={14} className="text-charcoal-950" />}
                                                                        </div>
                                                                        <div className="text-left">
                                                                            <h5 className="font-bold text-white text-base md:text-lg">{service.title}</h5>
                                                                            <p className="text-sm text-gray-500 max-w-xs hidden sm:block">{service.description}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className="text-gold-500 font-bold block">{service.price}</span>
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="pt-6">
                                                        <button
                                                            onClick={handleNext}
                                                            disabled={formData.services.length === 0}
                                                            className="w-full btn-gold rounded-2xl py-4 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                                                        >
                                                            Continue with {formData.services.length} Services <ChevronRight size={20} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    className="space-y-4"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setFormData({ ...formData, professional: null });
                                                            handleNext();
                                                        }}
                                                        className={`w-full flex items-center gap-5 p-5 rounded-2xl border transition-all ${!formData.professional
                                                            ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                                                            : 'bg-white/5 border-white/5 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <div className="w-14 h-14 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 border border-white/5">
                                                            <Users size={24} />
                                                        </div>
                                                        <div className="text-left">
                                                            <h5 className="font-bold text-white text-lg">First Available Professional</h5>
                                                            <p className="text-sm text-gray-500 font-medium">Fastest scheduling</p>
                                                        </div>
                                                    </button>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {STAFF.map(staff => (
                                                            <button
                                                                key={staff.id}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, professional: staff });
                                                                    handleNext();
                                                                }}
                                                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${formData.professional?.id === staff.id
                                                                    ? 'bg-gold-500/10 border-gold-500'
                                                                    : 'bg-white/5 border-white/5 hover:border-white/20'
                                                                    }`}
                                                            >
                                                                <div className="relative">
                                                                    <img src={staff.image} alt={staff.name} className="w-12 h-12 rounded-full object-cover border-2 border-charcoal-950" />
                                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-charcoal-900 rounded-full" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <h5 className="font-bold text-white text-sm">{staff.name}</h5>
                                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{staff.role.split('(')[0]}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    className="space-y-8"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-6">
                                                            <div className="space-y-3">
                                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Appointment Type</label>
                                                                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                                                                    {['Individual', 'Group'].map(type => (
                                                                        <button
                                                                            key={type}
                                                                            type="button"
                                                                            onClick={() => setFormData({ ...formData, type })}
                                                                            className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${formData.type === type
                                                                                ? 'bg-gold-500 text-charcoal-950 shadow-lg'
                                                                                : 'text-gray-500 hover:text-white'
                                                                                }`}
                                                                        >
                                                                            {type}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-3">
                                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Date</label>
                                                                    <div className="relative group">
                                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={16} />
                                                                        <input
                                                                            type="date"
                                                                            min={new Date().toISOString().split('T')[0]}
                                                                            value={formData.date}
                                                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-gold-500 outline-none transition-all"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Time</label>
                                                                    <div className="relative group">
                                                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={16} />
                                                                        <input
                                                                            type="time"
                                                                            min="08:00"
                                                                            max="22:00"
                                                                            value={formData.time}
                                                                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                                                                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-gold-500 outline-none transition-all"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <div className="space-y-3">
                                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Your Details</label>
                                                                <div className="space-y-4">
                                                                    <div className="relative group">
                                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={16} />
                                                                        <input
                                                                            type="text"
                                                                            value={formData.name}
                                                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                                            placeholder="Full Name"
                                                                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-gold-500 outline-none transition-all"
                                                                        />
                                                                    </div>
                                                                    <div className="relative group">
                                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={16} />
                                                                        <input
                                                                            type="tel"
                                                                            value={formData.phone}
                                                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                                            placeholder="Phone Number"
                                                                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:border-gold-500 outline-none transition-all"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10 flex items-start gap-3">
                                                                <div className="text-gold-500 shrink-0 mt-0.5"><CheckCircle size={14} /></div>
                                                                <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider font-medium">By clicking confirm, you'll be redirected to WhatsApp to complete your booking with the selected details.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                            {/* Footer / Actions */}
                            {!isSubmitted && (
                                <div className="p-6 md:p-8 border-t border-white/5 bg-charcoal-950/50 flex justify-between items-center shrink-0">
                                    {step > 1 ? (
                                        <button
                                            onClick={handleBack}
                                            className="text-xs font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                                        >
                                            <ChevronLeft size={16} /> Back
                                        </button>
                                    ) : (
                                        <div />
                                    )}

                                    {step < 4 ? (
                                        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">Select an option to continue</p>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!formData.name || !formData.phone || !formData.date || !formData.time}
                                            className="btn-gold rounded-full disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center gap-2 justify-center w-full sm:w-auto"
                                        >
                                            Confirm Booking <ChevronRight size={18} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
