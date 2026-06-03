import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    Scissors, 
    Settings, 
    LogOut,
    TrendingUp,
    Clock,
    CheckCircle,
    Plus,
    Search,
    Trash2,
    Edit3,
    MoreVertical,
    ChevronRight,
    MapPin,
    Phone,
    Bell,
    Filter,
    Download,
    Eye,
    Star,
    Shield,
    DollarSign,
    CalendarDays,
    X,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    FileDown,
    PlusCircle,
    Menu
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES, STAFF, BUSINESS_INFO } from '../constants/data';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    // Modal State
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('recruit');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [dashboardStaff, setDashboardStaff] = useState(STAFF);
    const [staffForm, setStaffForm] = useState({ name: '', role: '', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' });

    const openStaffModal = (action, staff = null) => {
        setModalAction(action);
        setSelectedStaff(staff);
        if (action === 'edit' && staff) {
            setStaffForm({ name: staff.name, role: staff.role, image: staff.image || '' });
        } else {
            setStaffForm({ name: '', role: '', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' });
        }
        setIsStaffModalOpen(true);
    };

    const closeStaffModal = () => {
        setIsStaffModalOpen(false);
        setTimeout(() => { setSelectedStaff(null); setStaffForm({ name: '', role: '', image: '' }); }, 300);
    };

    const handleSaveStaff = () => {
        if (modalAction === 'recruit') {
            setDashboardStaff(prev => [...prev, { id: Date.now().toString(), ...staffForm }]);
        } else if (modalAction === 'edit' && selectedStaff) {
            setDashboardStaff(prev => prev.map(s => s.id === selectedStaff.id ? { ...s, ...staffForm } : s));
        }
        closeStaffModal();
    };

    const handleDeleteStaff = (id) => {
        setDashboardStaff(prev => prev.filter(s => s.id !== id));
    };

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Supabase Bookings Data
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setBookings(data || []);
    };

    useEffect(() => {
        fetchBookings();

        // Real-time subscription — new booking appears instantly
        const subscription = supabase
            .channel('bookings-channel')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'bookings'
            }, () => {
                fetchBookings();
            })
            .subscribe();

        return () => supabase.removeChannel(subscription);
    }, []);

    // Booking Modal State
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingModalAction, setBookingModalAction] = useState('create');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingForm, setBookingForm] = useState({ name: '', date: '', time: '' });

    const openBookingModal = (action, booking = null) => {
        setBookingModalAction(action);
        setSelectedBooking(booking);
        if (action === 'create') {
            setBookingForm({ name: '', date: '', time: '' });
        }
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setTimeout(() => { setSelectedBooking(null); setBookingForm({ name: '', date: '', time: '' }); }, 300);
    };

    const handleCreateBooking = async () => {
        await supabase
            .from('bookings')
            .insert({
                customer_name: bookingForm.name || 'New Client',
                customer_phone: '—',
                services: ['General Service'],
                date: bookingForm.date || new Date().toISOString().split('T')[0],
                time: bookingForm.time || '10:00 AM',
                professional_name: 'Any',
                status: 'Pending',
                total_price: '₹0'
            });
        fetchBookings();
        closeBookingModal();
    };

    // Services State
    const [dashboardServices, setDashboardServices] = useState(SERVICES);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [serviceModalAction, setServiceModalAction] = useState('create');
    const [selectedService, setSelectedService] = useState(null);
    const [serviceForm, setServiceForm] = useState({ title: '', category: '', price: '' });

    const openServiceModal = (action, service = null) => {
        setServiceModalAction(action);
        setSelectedService(service);
        if (action === 'edit' && service) {
            setServiceForm({ title: service.title, category: service.category, price: service.price });
        } else {
            setServiceForm({ title: '', category: '', price: '' });
        }
        setIsServiceModalOpen(true);
    };

    const closeServiceModal = () => {
        setIsServiceModalOpen(false);
        setTimeout(() => { setSelectedService(null); setServiceForm({ title: '', category: '', price: '' }); }, 300);
    };

    const handleSaveService = () => {
        if (serviceModalAction === 'create') {
            setDashboardServices(prev => [...prev, { id: Date.now().toString(), icon: Scissors, ...serviceForm }]);
        } else if (serviceModalAction === 'edit' && selectedService) {
            setDashboardServices(prev => prev.map(s => s.id === selectedService.id ? { ...s, ...serviceForm } : s));
        }
        closeServiceModal();
    };

    const handleDeleteService = (id) => {
        setDashboardServices(prev => prev.filter(s => s.id !== id));
    };

    // Settings State
    const [settingsForm, setSettingsForm] = useState(BUSINESS_INFO);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    const handleSettingsChange = (field, value) => {
        setSettingsForm(prev => ({ ...prev, [field]: value }));
    };

    const handleDiscardSettings = () => {
        setSettingsForm(BUSINESS_INFO);
    };

    const handleApplySettings = () => {
        setIsSavingSettings(true);
        setTimeout(() => setIsSavingSettings(false), 1500);
    };

    const handleConfirmBooking = async (id) => {
        await supabase
            .from('bookings')
            .update({ status: 'Confirmed' })
            .eq('id', id);
        fetchBookings();
    };

    const handleDeleteBooking = async (id) => {
        await supabase
            .from('bookings')
            .delete()
            .eq('id', id);
        fetchBookings();
    };

    const allBookings = useMemo(() => {
        return bookings.map(b => ({
            id: b.id,
            name: b.customer_name || 'Customer',
            phone: b.customer_phone || '—',
            services: b.services || [],
            date: b.date,
            time: b.time,
            stylist: b.professional_name || 'Any',
            status: b.status,
            price: b.total_price
        }));
    }, [bookings]);

    const filteredBookings = useMemo(() => {
        return allBookings.filter(b => {
            const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                b.services.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [allBookings, searchQuery, statusFilter]);

    // Stats for Dashboard
    const stats = [
        { label: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, color: 'text-green-500', trend: '+12.5%', trendDir: 'up', tab: null, sparkline: "0,10 5,8 10,12 15,4 20,6 25,2 30,0" },
        { label: 'Active Staff', value: STAFF.length.toString(), icon: Users, color: 'text-gold-500', trend: 'Stable', trendDir: 'neutral', tab: 'Staff Management', sparkline: "0,5 5,5 10,5 15,5 20,5 25,5 30,5" },
        { label: 'Monthly Bookings', value: '342', icon: CalendarDays, color: 'text-blue-500', trend: '+8.2%', trendDir: 'up', tab: 'Appointments', sparkline: "0,12 5,10 10,8 15,9 20,5 25,3 30,0" },
        { label: 'Pending Requests', value: '8', icon: Clock, color: 'text-orange-500', trend: '-2', trendDir: 'down', tab: 'Appointments', sparkline: "0,0 5,2 10,1 15,5 20,4 25,8 30,10" },
    ];

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: Calendar, label: 'Appointments' },
        { icon: Users, label: 'Staff Management' },
        { icon: Scissors, label: 'Services' },
        { icon: Settings, label: 'Settings' },
    ];

    // Revenue Data
    const revenueData = [
        { day: 'Mon', value: 400 },
        { day: 'Tue', value: 600 },
        { day: 'Wed', value: 500 },
        { day: 'Thu', value: 800 },
        { day: 'Fri', value: 1000 },
        { day: 'Sat', value: 1200 },
        { day: 'Sun', value: 900 }
    ];
    const maxRevenue = Math.max(...revenueData.map(d => d.value));

    // Time utils
    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const getNextUpcomingAppointmentId = () => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        
        const todayBookings = allBookings
            .filter(b => b.date === todayStr && b.status !== 'Completed')
            .map(b => {
                // Parse time like "10:30 AM"
                const [time, modifier] = b.time.split(' ');
                let [hours, minutes] = time.split(':');
                if (hours === '12') hours = '00';
                if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                
                const bookingDate = new Date(now);
                bookingDate.setHours(hours, minutes, 0, 0);
                return { ...b, dateObj: bookingDate };
            })
            .filter(b => b.dateObj > now)
            .sort((a, b) => a.dateObj - b.dateObj);

        return todayBookings.length > 0 ? todayBookings[0].id : null;
    };
    const nextUpcomingId = getNextUpcomingAppointmentId();

    const getCountdown = (timeStr) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
        
        const now = new Date();
        const target = new Date(now);
        target.setHours(hours, minutes, 0, 0);
        
        const diffMs = target - now;
        if (diffMs <= 0) return '';
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `In ${diffMins} min`;
        return `In ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
    };

    const renderDashboard = () => (
        <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-8"
        >
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        onClick={() => stat.tab && setActiveTab(stat.tab)}
                        className={`glass-card p-4 md:p-6 border border-white/5 relative overflow-hidden group hover:border-gold-500/30 transition-all duration-500 ${stat.tab ? 'cursor-pointer' : ''}`}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 blur-3xl group-hover:bg-gold-500/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-charcoal-950 flex items-center justify-center shadow-xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            
                            {/* SVG Sparkline */}
                            <svg className="hidden sm:block w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 -2 30 14" preserveAspectRatio="none">
                                <polyline
                                    fill="none"
                                    stroke={stat.trendDir === 'up' ? '#22c55e' : stat.trendDir === 'down' ? '#f97316' : '#3b82f6'}
                                    strokeWidth="1.5"
                                    points={stat.sparkline}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        
                        <div className="space-y-1 relative z-10">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{stat.label}</p>
                            <div className="flex items-baseline gap-3">
                                <h4 className="text-3xl text-white font-serif font-bold">{stat.value}</h4>
                                <div className={`flex items-center gap-0.5 text-[10px] font-bold ${stat.trendDir === 'up' ? 'text-green-500' : stat.trendDir === 'neutral' ? 'text-blue-500' : 'text-orange-500'}`}>
                                    {stat.trendDir === 'up' ? <ArrowUpRight size={12} /> : stat.trendDir === 'down' ? <ArrowDownRight size={12} /> : <Minus size={12} />}
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => openBookingModal('create')} className="glass-card p-4 flex flex-col items-center justify-center gap-3 border border-white/5 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all group rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                        <PlusCircle size={18} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-white transition-colors">New Appt</span>
                </button>
                <button onClick={() => openServiceModal('create')} className="glass-card p-4 flex flex-col items-center justify-center gap-3 border border-white/5 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all group rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                        <Scissors size={18} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-white transition-colors">Add Service</span>
                </button>
                <button onClick={() => openStaffModal('recruit')} className="glass-card p-4 flex flex-col items-center justify-center gap-3 border border-white/5 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all group rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                        <Users size={18} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-white transition-colors">Recruit Staff</span>
                </button>
                <button onClick={() => console.log('Exporting...')} className="glass-card p-4 flex flex-col items-center justify-center gap-3 border border-white/5 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all group rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                        <FileDown size={18} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-white transition-colors">Export Report</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl md:text-2xl font-serif text-white">Today's Appointments</h3>
                            <div className="px-3 py-1 rounded-full bg-charcoal-950 border border-white/10 text-xs font-mono text-gold-500 flex items-center gap-2 shadow-inner">
                                <Clock size={12} className="animate-pulse" />
                                {formatTime(currentTime)}
                            </div>
                        </div>
                        <button onClick={() => setActiveTab('Appointments')} className="text-xs text-gold-500 font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                            Manage All <ChevronRight size={14} />
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {allBookings.slice(0, 4).map((booking, i) => {
                            const isNext = booking.id === nextUpcomingId;
                            return (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={booking.id} 
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl bg-charcoal-900/50 border ${isNext ? 'border-y-white/5 border-r-white/5 border-l-4 border-l-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border border-white/5'} hover:border-white/10 hover:bg-white/5 transition-all group gap-4`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-2xl bg-charcoal-950 flex items-center justify-center ${isNext ? 'text-charcoal-950 bg-gold-500 animate-pulse' : 'text-gold-500 border border-white/5'} group-hover:scale-110 transition-transform shadow-lg`}>
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-bold flex items-center gap-2">
                                                {booking.name}
                                                {isNext && <span className="text-[9px] uppercase tracking-widest bg-gold-500/20 text-gold-500 px-2 py-0.5 rounded-full">Next</span>}
                                            </p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{booking.services.join(' • ')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                                        <div className="text-right flex items-center gap-4 sm:block">
                                            <div className="text-left sm:text-right">
                                                <p className="text-xs text-white font-bold">{booking.time}</p>
                                                {booking.date === new Date().toISOString().split('T')[0] && booking.status !== 'Completed' && (
                                                    <p className="text-[10px] text-gold-500 font-black">{getCountdown(booking.time)}</p>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold sm:mt-1 hidden sm:block">{booking.stylist}</p>
                                        </div>
                                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${booking.status === 'Confirmed' ? 'bg-green-500' : booking.status === 'In-Progress' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]'}`} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-serif text-white">Revenue Overview</h3>
                    <div className="glass-card p-6 md:p-8 border border-white/5 space-y-8 h-full flex flex-col">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Weekly Total</p>
                                <p className="text-2xl text-white font-serif font-bold">₹24,500</p>
                            </div>
                            <TrendingUp className="text-green-500" size={32} />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-end mt-4">
                            <div className="flex items-end justify-between h-40 w-full gap-2 relative">
                                {/* SVG Chart Background lines (optional, kept simple for now) */}
                                {revenueData.map((d, i) => {
                                    const heightPct = (d.value / maxRevenue) * 100;
                                    return (
                                        <div key={d.day} className="flex flex-col items-center flex-1 gap-3 group relative">
                                            {/* Tooltip on hover */}
                                            <div className="absolute -top-8 bg-charcoal-950 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 z-10 whitespace-nowrap">
                                                ₹{d.value}
                                            </div>
                                            <div className="w-full bg-charcoal-950 rounded-t flex-1 relative flex items-end overflow-hidden group-hover:bg-white/5 transition-colors">
                                                <motion.div 
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${heightPct}%` }}
                                                    transition={{ duration: 1, delay: i * 0.1, type: 'spring' }}
                                                    className={`w-full ${i === revenueData.length - 1 ? 'bg-gold-500' : 'bg-white/20'} rounded-t`}
                                                />
                                            </div>
                                            <span className={`text-[9px] uppercase tracking-widest font-bold ${i === revenueData.length - 1 ? 'text-gold-500' : 'text-gray-500'}`}>{d.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderAppointments = () => (
        <motion.div 
            key="appointments"
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-8"
        >
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif text-white mb-2">Appointments</h1>
                    <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Manage client bookings and schedules</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search client, service..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-charcoal-900 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:border-gold-500 outline-none w-full md:w-80 transition-all shadow-xl"
                        />
                    </div>
                    <div className="flex items-center bg-charcoal-900 border border-white/5 rounded-2xl px-4 py-3 gap-3">
                        <Filter size={16} className="text-gray-500" />
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-xs text-white outline-none font-bold uppercase tracking-widest cursor-pointer"
                        >
                            <option value="All" className="bg-charcoal-900">All Status</option>
                            <option value="Pending" className="bg-charcoal-900">Pending</option>
                            <option value="Confirmed" className="bg-charcoal-900">Confirmed</option>
                            <option value="In-Progress" className="bg-charcoal-900">In-Progress</option>
                        </select>
                    </div>
                    <button onClick={() => openBookingModal('create')} className="btn-gold !py-3 !px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-gold-500/10">
                        <Plus size={20} /> Create New
                    </button>
                </div>
            </header>

            <div className="glass-card overflow-hidden border border-white/5 shadow-2xl">
                {/* Mobile Card View */}
                <div className="block md:hidden space-y-4 p-4 bg-charcoal-950/30">
                    {filteredBookings.map(item => (
                        <div key={item.id} className="p-4 rounded-2xl bg-charcoal-900 border border-white/5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 font-serif font-bold shrink-0 border border-white/5">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{item.name}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{item.services.join(', ')}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded border shrink-0 ${item.status === 'Confirmed' ? 'text-green-500 border-green-500/20 bg-green-500/10' : item.status === 'In-Progress' ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' : 'text-orange-500 border-orange-500/20 bg-orange-500/10'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-400">
                                <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-gold-500/50" /> {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} @ {item.time}</span>
                                <span className="font-serif text-white font-bold">{item.price}</span>
                            </div>
                            <div className="flex gap-2 pt-3 border-t border-white/5">
                                <button onClick={() => openBookingModal('view', item)} className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"><Eye size={16} /></button>
                                <button onClick={() => handleConfirmBooking(item.id)} className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"><CheckCircle size={16} /></button>
                                <button onClick={() => handleDeleteBooking(item.id)} className="flex-1 py-2.5 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                <th className="px-8 py-6 font-black">Client Details</th>
                                <th className="px-8 py-6 font-black">Services Requested</th>
                                <th className="px-8 py-6 font-black">Schedule</th>
                                <th className="px-8 py-6 font-black">Professional</th>
                                <th className="px-8 py-6 font-black">Price</th>
                                <th className="px-8 py-6 font-black">Status</th>
                                <th className="px-8 py-6 font-black text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredBookings.map((item) => (
                                <tr key={item.id} className="hover:bg-white/5 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 border border-white/5 font-serif font-bold group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-bold group-hover:text-gradient-gold transition-colors">{item.name}</p>
                                                <p className="text-xs text-gray-500 font-medium group-hover:text-gray-400">{item.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.services.map((s, idx) => (
                                                <span key={idx} className="text-[10px] text-white bg-charcoal-950 border border-white/5 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">{s}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-xs text-white font-medium">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                                            <p className="text-[10px] text-gold-500 font-black uppercase tracking-widest">{item.time}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Shield size={14} className="text-gold-500/50" />
                                            <span className="text-xs text-gray-300 font-medium">{item.stylist}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm text-white font-serif font-bold">{item.price}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${item.status === 'Confirmed' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : item.status === 'In-Progress' ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'}`} />
                                            <span className={`text-[10px] uppercase tracking-widest font-black ${item.status === 'Confirmed' ? 'text-green-500' : item.status === 'In-Progress' ? 'text-blue-500' : 'text-orange-500'}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button onClick={() => openBookingModal('view', item)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-charcoal-950 border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-all" title="View Details"><Eye size={16} /></button>
                                            <button onClick={() => handleConfirmBooking(item.id)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-charcoal-950 border border-white/5 text-green-500 hover:bg-green-500/10 transition-all" title="Confirm"><CheckCircle size={16} /></button>
                                            <button onClick={() => handleDeleteBooking(item.id)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-charcoal-950 border border-white/5 text-red-500 hover:bg-red-500/10 transition-all" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );

    const renderStaff = () => (
        <motion.div 
            key="staff"
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-8"
        >
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-white mb-2">Staff Directory</h1>
                    <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Manage your professional team</p>
                </div>
                <button onClick={() => openStaffModal('recruit')} className="btn-gold !py-3 !px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-gold-500/10">
                    <Plus size={20} /> Recruit Staff
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dashboardStaff.map((member) => (
                    <motion.div 
                        whileHover={{ y: -5 }}
                        key={member.id} 
                        className="glass-card p-8 border border-white/10 hover:border-transparent transition-all duration-500 relative group overflow-hidden shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]"
                    >
                        {/* Animated Border Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-transparent to-gold-600 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0" />
                        <div className="absolute inset-[1px] rounded-2xl bg-charcoal-900/90 pointer-events-none z-0" />

                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 text-gold-500 z-10 pointer-events-none">
                            <Shield size={120} />
                        </div>
                        
                        <div className="flex flex-col items-center text-center relative z-20">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-gold-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                                <img src={member.image} alt={member.name} className="w-28 h-28 rounded-3xl object-cover border-4 border-charcoal-950 shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            
                            <h4 className="text-2xl font-serif text-white mb-1 group-hover:text-gradient-gold transition-colors duration-300">{member.name}</h4>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500/80 font-black mb-6 group-hover:text-gold-400 transition-colors">{member.role}</p>
                            
                            <div className="grid grid-cols-3 gap-6 w-full pt-6 border-t border-white/5">
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-1 text-gold-500 font-bold">
                                        <Star size={12} fill="currentColor" />
                                        <span className="text-sm text-white">4.8</span>
                                    </div>
                                    <p className="text-[8px] text-gray-500 uppercase font-black">Rating</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-white font-bold">120</p>
                                    <p className="text-[8px] text-gray-500 uppercase font-black">Tasks</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-white font-bold">Active</p>
                                    <p className="text-[8px] text-gray-500 uppercase font-black">Status</p>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full mt-8 relative z-20">
                                <button onClick={() => openStaffModal('profile', member)} className="flex-1 bg-white/5 border border-white/5 hover:border-white/20 text-white text-[10px] uppercase tracking-widest font-black py-3 rounded-xl transition-all">Profile</button>
                                <button onClick={() => openStaffModal('edit', member)} className="w-12 h-11 flex items-center justify-center bg-white/5 border border-white/5 hover:border-gold-500/30 text-gray-400 hover:text-gold-500 rounded-xl transition-all"><Edit3 size={16} /></button>
                                <button onClick={() => handleDeleteStaff(member.id)} className="w-12 h-11 flex items-center justify-center bg-white/5 border border-white/5 hover:border-red-500/30 text-gray-400 hover:text-red-500 rounded-xl transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    const renderServices = () => (
        <motion.div 
            key="services"
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-8"
        >
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-white mb-2">Service Catalog</h1>
                    <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Manage your salon offerings and pricing</p>
                </div>
                <button onClick={() => openServiceModal('create')} className="btn-gold !py-3 !px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-gold-500/10">
                    <Plus size={20} /> Add Service
                </button>
            </header>

            <div className="glass-card p-6 md:p-10 border border-white/5">
                <div className="grid grid-cols-1 gap-4">
                    {dashboardServices.map((service, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={service.id} 
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 rounded-3xl bg-charcoal-900/50 border border-white/5 hover:border-gold-500/30 hover:bg-white/5 transition-all group gap-4 md:gap-0"
                        >
                            <div className="flex items-center gap-4 md:gap-8">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-charcoal-950 flex items-center justify-center text-gold-500 border border-white/5 group-hover:scale-110 transition-transform shadow-lg shrink-0">
                                    <service.icon size={24} />
                                </div>
                                <div>
                                    <h5 className="text-base md:text-lg text-white font-bold mb-1 group-hover:text-gold-500 transition-colors">{service.title}</h5>
                                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{service.category}</span>
                                        <span className="hidden md:inline-block w-1 h-1 rounded-full bg-white/20" />
                                        <span className="text-[10px] text-gold-500/60 uppercase tracking-widest font-black">Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 w-full md:w-auto pt-4 border-t border-white/5 md:pt-0 md:border-t-0">
                                <div className="text-left md:text-right">
                                    <p className="text-lg md:text-xl text-white font-serif font-bold">{service.price}</p>
                                    <p className="hidden md:block text-[10px] text-gray-600 uppercase tracking-widest font-black">Current Price</p>
                                </div>
                                <div className="flex gap-2 md:gap-3 md:border-l border-white/10 md:pl-10">
                                    <button onClick={() => openServiceModal('edit', service)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-charcoal-950 border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-all"><Edit3 size={18} /></button>
                                    <button onClick={() => handleDeleteService(service.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-charcoal-950 border border-white/5 text-red-500 hover:bg-red-500/10 transition-all"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    const renderSettings = () => (
        <motion.div 
            key="settings"
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-12"
        >
            <div>
                <h1 className="text-3xl font-serif text-white mb-2">Salon Settings</h1>
                <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Configure your business presence</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Business Info */}
                <div className="space-y-8">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                        <Shield size={18} className="text-gold-500" /> General Configuration
                    </h3>
                    <div className="glass-card p-10 space-y-8 border border-white/5">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Salon Name</label>
                            <input type="text" value={settingsForm.name} onChange={(e) => handleSettingsChange('name', e.target.value)} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Brand Tagline</label>
                            <input type="text" value={settingsForm.tagline} onChange={(e) => handleSettingsChange('tagline', e.target.value)} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Official Phone</label>
                                <input type="text" value={settingsForm.phone} onChange={(e) => handleSettingsChange('phone', e.target.value)} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Heritage Since</label>
                                <input type="text" value={settingsForm.foundedYear} onChange={(e) => handleSettingsChange('foundedYear', e.target.value)} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-8">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                        <Clock size={18} className="text-gold-500" /> Salon Hours
                    </h3>
                    <div className="glass-card p-10 space-y-5 border border-white/5">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                            <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0 border-b border-white/5 last:border-0 group">
                                <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{day}</span>
                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                    <span className="text-[10px] text-white font-black uppercase tracking-widest bg-charcoal-950 px-3 py-1.5 rounded-lg border border-white/5">08:00 AM - 10:00 PM</span>
                                    <button className="text-[10px] text-gold-500 font-black uppercase tracking-widest hover:text-white transition-colors">Adjust</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="pt-12 border-t border-white/5 flex justify-end gap-6">
                <button onClick={handleDiscardSettings} className="px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-white transition-colors">Discard Changes</button>
                <button onClick={handleApplySettings} className={`btn-gold !py-5 !px-16 rounded-2xl shadow-2xl transition-all duration-300 ${isSavingSettings ? 'bg-green-500 text-white shadow-green-500/20 border-green-500 hover:bg-green-400' : 'shadow-gold-500/20'}`}>
                    {isSavingSettings ? (
                        <span className="flex items-center gap-2"><CheckCircle size={18} /> Saved ✓</span>
                    ) : (
                        'Apply Configuration'
                    )}
                </button>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-charcoal-950 flex font-sans selection:bg-gold-500 selection:text-charcoal-950">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-charcoal-950 z-50 flex flex-col border-r border-white/10 shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 md:w-80 md:bg-charcoal-900 md:border-white/5 shrink-0 h-screen ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-12">
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            <span className="text-charcoal-950 font-serif text-2xl font-black">A</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-2xl font-black text-gradient-gold tracking-tight leading-none">Ashok</span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 group-hover:text-gold-500 transition-colors font-black mt-1">Management</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-8 space-y-3">
                    <p className="px-5 text-[10px] uppercase tracking-[0.4em] text-gray-600 font-black mb-6">Main Menu</p>
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => { setActiveTab(item.label); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl transition-all duration-500 group relative overflow-hidden ${activeTab === item.label ? 'bg-gold-500 text-charcoal-950 font-black shadow-2xl shadow-gold-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <div className="flex items-center gap-5 relative z-10">
                                <item.icon size={20} className={activeTab === item.label ? 'text-charcoal-950' : 'group-hover:text-gold-500 transition-colors'} />
                                <span className="text-xs tracking-[0.1em] uppercase">{item.label}</span>
                            </div>
                            {activeTab === item.label && <motion.div layoutId="activeNav" className="relative z-10"><ChevronRight size={16} /></motion.div>}
                        </button>
                    ))}
                </nav>

                <div className="p-8 mt-auto border-t border-white/5">
                    <div className="bg-charcoal-950/50 rounded-3xl p-6 mb-8 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">System Online</span>
                        </div>
                        <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-widest break-all">Logged in as <br /><span className="text-white">{user?.email}</span></p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-8 py-5 rounded-3xl text-red-500 hover:bg-red-500/10 transition-all group font-black uppercase tracking-[0.2em] text-[10px] border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-24 bg-charcoal-950/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-12 shrink-0 z-30">
                    <div className="flex items-center gap-4 text-sm">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white">
                            <Menu size={24} />
                        </button>
                        <span className="hidden md:inline text-gray-500 font-medium">Ashok</span>
                        <ChevronRight size={14} className="hidden md:block text-gray-700" />
                        <span className="text-white font-bold md:font-bold font-serif text-lg md:text-sm md:font-sans">{activeTab}</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 pr-4 md:pr-8 border-r border-white/10">
                            <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-colors relative">
                                <Bell size={18} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold-500 rounded-full border-2 border-charcoal-950" />
                            </button>
                            <button className="hidden md:flex w-10 h-10 rounded-2xl bg-white/5 items-center justify-center text-gray-400 hover:text-gold-500 transition-colors">
                                <Search size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="text-right">
                                <p className="text-xs text-white font-black uppercase tracking-widest leading-none mb-1">Ashok Ahire</p>
                                <p className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.2em]">Master Stylist</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-500 shadow-xl">
                                <Shield size={22} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Viewport */}
                <main className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'Dashboard' && renderDashboard()}
                        {activeTab === 'Appointments' && renderAppointments()}
                        {activeTab === 'Staff Management' && renderStaff()}
                        {activeTab === 'Services' && renderServices()}
                        {activeTab === 'Settings' && renderSettings()}
                    </AnimatePresence>
                </main>
            </div>

            {/* Staff Modal Overlay */}
            <AnimatePresence>
                {isStaffModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={closeStaffModal} />
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-[calc(100%-2rem)] mx-4 md:mx-auto md:max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-charcoal-900 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                        >
                            {/* Animated Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent pointer-events-none" />
                            
                            <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-serif text-white">
                                        {modalAction === 'recruit' && 'Recruit New Staff'}
                                        {modalAction === 'edit' && 'Edit Professional'}
                                        {modalAction === 'profile' && 'Professional Profile'}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                                        {modalAction === 'profile' ? 'View Details' : 'Manage Information'}
                                    </p>
                                </div>
                                <button onClick={closeStaffModal} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-8 relative z-10">
                                {modalAction === 'profile' && selectedStaff && (
                                    <div className="flex flex-col items-center text-center">
                                        <img src={selectedStaff.image} alt={selectedStaff.name} className="w-32 h-32 rounded-3xl object-cover border-4 border-charcoal-950 shadow-2xl mb-6" />
                                        <h4 className="text-3xl font-serif text-white mb-2 text-gradient-gold">{selectedStaff.name}</h4>
                                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black mb-8">{selectedStaff.role}</p>
                                        
                                        <div className="w-full bg-charcoal-950 rounded-2xl p-6 border border-white/5 text-left space-y-4 shadow-inner">
                                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Contact</span>
                                                <span className="text-sm text-white font-medium">staff@ashokparlour.com</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Joined</span>
                                                <span className="text-sm text-white font-medium">May 2024</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</span>
                                                <span className="text-[10px] uppercase tracking-widest text-green-500 font-black flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Active
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {(modalAction === 'recruit' || modalAction === 'edit') && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Full Name</label>
                                            <input type="text" value={staffForm.name} onChange={(e) => setStaffForm({...staffForm, name: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" placeholder="E.g., John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Specialization Role</label>
                                            <input type="text" value={staffForm.role} onChange={(e) => setStaffForm({...staffForm, role: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" placeholder="E.g., Senior Barber" />
                                        </div>
                                        
                                        <button onClick={handleSaveStaff} className="w-full btn-gold !py-4 rounded-2xl mt-4">
                                            {modalAction === 'recruit' ? 'Send Invitation' : 'Save Changes'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Appointment Modal Overlay */}
            <AnimatePresence>
                {isBookingModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={closeBookingModal} />
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-[calc(100%-2rem)] mx-4 md:mx-auto md:max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-charcoal-900 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent pointer-events-none" />
                            
                            <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-serif text-white">
                                        {bookingModalAction === 'create' ? 'Create Appointment' : 'Appointment Details'}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                                        {bookingModalAction === 'create' ? 'Schedule a new client' : 'Review booking information'}
                                    </p>
                                </div>
                                <button onClick={closeBookingModal} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-8 relative z-10">
                                {bookingModalAction === 'view' && selectedBooking && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="w-16 h-16 rounded-full bg-charcoal-950 flex items-center justify-center text-gold-500 border border-white/5 font-serif text-2xl font-bold shadow-xl">
                                                {selectedBooking.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-serif text-white">{selectedBooking.name}</h4>
                                                <p className="text-sm text-gray-400 font-medium">{selectedBooking.phone}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="w-full bg-charcoal-950 rounded-2xl p-6 border border-white/5 text-left space-y-4 shadow-inner">
                                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Services</span>
                                                <span className="text-sm text-white font-bold">{selectedBooking.services.join(', ')}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Schedule</span>
                                                <span className="text-sm text-white font-medium">{selectedBooking.date} at {selectedBooking.time}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Professional</span>
                                                <span className="text-sm text-gold-500 font-bold">{selectedBooking.stylist}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</span>
                                                <span className={`text-[10px] uppercase tracking-widest font-black ${selectedBooking.status === 'Confirmed' ? 'text-green-500' : selectedBooking.status === 'In-Progress' ? 'text-blue-500' : 'text-orange-500'}`}>
                                                    {selectedBooking.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingModalAction === 'create' && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Client Name</label>
                                            <input type="text" value={bookingForm.name} onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" placeholder="E.g., Michael Scott" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Date</label>
                                                <input type="date" value={bookingForm.date} onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Time</label>
                                                <input type="time" value={bookingForm.time} onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" />
                                            </div>
                                        </div>
                                        
                                        <button onClick={handleCreateBooking} className="w-full btn-gold !py-4 rounded-2xl mt-4">
                                            Confirm Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Service Modal Overlay */}
            <AnimatePresence>
                {isServiceModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={closeServiceModal} />
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-xl bg-charcoal-900 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent pointer-events-none" />
                            
                            <div className="flex items-center justify-between p-8 border-b border-white/5 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-serif text-white">
                                        {serviceModalAction === 'create' ? 'Add New Service' : 'Edit Service'}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                                        {serviceModalAction === 'create' ? 'Expand your catalog' : 'Update pricing and details'}
                                    </p>
                                </div>
                                <button onClick={closeServiceModal} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-8 relative z-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Service Title</label>
                                        <input type="text" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" placeholder="E.g., Signature Fade" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Category</label>
                                            <input type="text" value={serviceForm.category} onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" placeholder="E.g., Hair" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Price</label>
                                            <input type="text" value={serviceForm.price} onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})} className="w-full bg-charcoal-950 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold-500 outline-none transition-all shadow-inner" placeholder="E.g., ₹500" />
                                        </div>
                                    </div>
                                    
                                    <button onClick={handleSaveService} className="w-full btn-gold !py-4 rounded-2xl mt-4">
                                        {serviceModalAction === 'create' ? 'Publish Service' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
