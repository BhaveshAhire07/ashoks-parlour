import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Calendar, 
    Clock, 
    Settings, 
    LogOut, 
    ChevronRight, 
    MapPin, 
    Phone, 
    Mail, 
    ShieldCheck, 
    Scissors,
    History,
    Edit2,
    Save,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveTab] = useState('My Bookings');
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: 'Dhule, Maharashtra'
    });

    const fetchBookings = async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setBookings(data || []);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSaveProfile = () => {
        const updated = { ...user, name: profileData.name, phone: profileData.phone };
        localStorage.setItem('ashok_user', JSON.stringify(updated));
        setIsEditing(false);
    };

    const renderBookings = () => (
        <motion.div 
            key="bookings"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif text-white">Appointment History</h3>
                <span className="text-[10px] bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-gold-500/20">
                    {bookings.length} Bookings
                </span>
            </div>

            {bookings.length > 0 ? (
                <div className="grid gap-6">
                    {bookings.map((booking, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/5 hover:border-gold-500/20 transition-all group"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-charcoal-950 flex items-center justify-center text-gold-500 border border-white/5 group-hover:scale-110 transition-transform">
                                    <Scissors size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">
                                        {booking.services.join(', ')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2 md:gap-4 text-xs text-gray-500 font-medium">
                                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold-500/50" /> {booking.date}</span>
                                        <span className="hidden sm:flex items-center gap-1.5"><Clock size={14} className="text-gold-500/50" /> {booking.time}</span>
                                        <span className="flex items-center gap-1.5"><User size={14} className="text-gold-500/50" /> {booking.professional?.name || 'Any Stylist'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                <div className="text-right">
                                    <p className="text-lg font-serif font-bold text-white">{booking.totalPrice}</p>
                                    <p className="text-[10px] text-gray-600 uppercase font-black">Estimated Price</p>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-gold-500/10 text-gold-500'
                                }`}>
                                    {booking.status || 'Pending'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="glass-card p-20 text-center border border-dashed border-white/10">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar size={32} className="text-gray-600" />
                    </div>
                    <h4 className="text-xl text-white font-serif mb-2">No Bookings Yet</h4>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">Start your grooming journey by booking an appointment with our master stylists.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn-gold rounded-xl px-8 py-3"
                    >
                        Book Now
                    </button>
                </div>
            )}
        </motion.div>
    );

    const renderSettings = () => (
        <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-12"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif text-white">Profile Settings</h3>
                <button 
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                        isEditing ? 'bg-green-500 text-charcoal-950' : 'bg-white/5 text-gold-500 border border-gold-500/20 hover:bg-gold-500/10'
                    }`}
                >
                    {isEditing ? <><Save size={14} /> Save</> : <><Edit2 size={14} /> Edit Profile</>}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" size={16} />
                            <input 
                                type="text" 
                                disabled={!isEditing}
                                value={profileData.name}
                                onChange={e => setProfileData({...profileData, name: e.target.value})}
                                className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-gold-500 outline-none transition-all disabled:opacity-50" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" size={16} />
                            <input 
                                type="email" 
                                disabled={!isEditing}
                                value={profileData.email}
                                onChange={e => setProfileData({...profileData, email: e.target.value})}
                                className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-gold-500 outline-none transition-all disabled:opacity-50" 
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" size={16} />
                            <input 
                                type="tel" 
                                disabled={!isEditing}
                                value={profileData.phone}
                                onChange={e => setProfileData({...profileData, phone: e.target.value})}
                                className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-gold-500 outline-none transition-all disabled:opacity-50" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Location</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" size={16} />
                            <input 
                                type="text" 
                                disabled={!isEditing}
                                value={profileData.address}
                                onChange={e => setProfileData({...profileData, address: e.target.value})}
                                className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-gold-500 outline-none transition-all disabled:opacity-50" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-gold-500" /> Security
                </h4>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all">Change Password</button>
                    <button className="px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all">Two-Factor Auth</button>
                    <button className="px-6 py-3 bg-red-500/5 border border-red-500/10 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all">Delete Account</button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-charcoal-950 pt-24 pb-16 px-4 md:pt-32 md:pb-20 md:px-6 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold-500/5 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="glass-card p-8 text-center border border-white/5">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-gold-500 rounded-3xl blur-2xl opacity-20" />
                                <div className="w-24 h-24 rounded-3xl bg-charcoal-950 border-2 border-gold-500 flex items-center justify-center relative z-10">
                                    <User size={40} className="text-gold-500" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-serif text-white mb-1 font-bold">{user?.name || 'Customer'}</h2>
                            <p className="text-[10px] text-gold-500 font-black uppercase tracking-[0.2em] mb-6">Platinum Member</p>
                            <div className="pt-6 border-t border-white/5 flex overflow-x-auto lg:flex-col gap-3 pb-2 lg:pb-0 custom-scrollbar">
                                <button 
                                    onClick={() => setActiveTab('My Bookings')}
                                    className={`shrink-0 lg:w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeSection === 'My Bookings' ? 'bg-gold-500 text-charcoal-950 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <span className="flex items-center gap-3"><History size={18} /> Bookings</span>
                                    <ChevronRight size={14} className="hidden lg:block" />
                                </button>
                                <button 
                                    onClick={() => setActiveTab('Settings')}
                                    className={`shrink-0 lg:w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeSection === 'Settings' ? 'bg-gold-500 text-charcoal-950 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <span className="flex items-center gap-3"><Settings size={18} /> Profile</span>
                                    <ChevronRight size={14} className="hidden lg:block" />
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold lg:mt-4"
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Quick Help */}
                        <div className="glass-card p-8 border border-white/5 bg-gold-500/5">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Need Help?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed mb-6">Our support team is available 24/7 for your assistance.</p>
                            <button className="w-full py-3 border border-gold-500/20 rounded-xl text-[10px] font-black text-gold-500 uppercase tracking-widest hover:bg-gold-500 hover:text-charcoal-950 transition-all">Contact Support</button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode='wait'>
                            {activeSection === 'My Bookings' ? renderBookings() : renderSettings()}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
