import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, Mail, CheckCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [currentView, setCurrentView] = useState('signIn');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
    const [isResetSent, setIsResetSent] = useState(false);
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        
        if (currentView === 'forgotPassword') {
            setIsResetSent(true);
            setTimeout(() => {
                setIsResetSent(false);
                setCurrentView('signIn');
            }, 3000);
            return;
        }

        if (currentView === 'signIn') {
            const result = await login(formData.email, formData.password);
            if (!result.success) {
                setAuthError(result.error);
                return;
            }
            if (result.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } else if (currentView === 'signUp') {
            const result = await register(formData.name, formData.email, formData.password, formData.phone);
            if (!result.success) {
                setAuthError(result.error);
                return;
            }
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-12 md:px-6 md:py-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg shadow-gold-500/20">
                        {formData.email === 'admin@ashokparlour.com' ? <ShieldCheck className="text-charcoal-950" size={32} /> : <User className="text-charcoal-950" size={32} />}
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
                        {currentView === 'forgotPassword' ? 'Reset Password' : 
                         currentView === 'signUp' ? 'Create Account' : 
                         formData.email === 'admin@ashokparlour.com' ? 'Admin Portal' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-500 text-sm tracking-widest uppercase">
                        {currentView === 'forgotPassword' ? 'Recover your access' :
                         currentView === 'signUp' ? 'Join our community' :
                         formData.email === 'admin@ashokparlour.com' ? 'Management Access' : 'Sign in to your account'}
                    </p>
                </div>

                <div className="glass-card p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence>
                            {currentView === 'signUp' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-6 mb-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gold-500/50 font-bold ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={18} />
                                            <input
                                                type="text"
                                                required={currentView === 'signUp'}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-charcoal-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-gold-500/50 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-gold-500/50 font-bold ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-charcoal-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-gold-500/50 outline-none transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {currentView !== 'forgotPassword' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gold-500/50 font-bold">Password</label>
                                        {currentView === 'signIn' && (
                                            <button type="button" onClick={() => {setCurrentView('forgotPassword'); setAuthError('');}} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-gold-500 transition-colors font-bold">Forgot?</button>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={18} />
                                        <input
                                            type="password"
                                            required={currentView !== 'forgotPassword'}
                                            value={formData.password}
                                            onChange={(e) => {
                                                setFormData({ ...formData, password: e.target.value });
                                                setAuthError('');
                                            }}
                                            className="w-full bg-charcoal-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-gold-500/50 outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {currentView === 'signUp' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-6 !mt-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-gold-500/50 font-bold ml-1">Phone Number (optional)</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:scale-110 transition-transform" size={18} />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-charcoal-950 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-gold-500/50 outline-none transition-all"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {authError && (
                            <div className="mt-2 text-center">
                                <p className="text-red-500 text-xs">{authError}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isResetSent}
                            className={`w-full btn-gold !py-4 rounded-xl flex items-center justify-center gap-3 mt-4 ${isResetSent ? '!bg-green-500 hover:!bg-green-400 !text-white !border-green-500 shadow-green-500/30' : ''}`}
                        >
                            {isResetSent ? (
                                <><CheckCircle size={18} /> <span>Link Sent!</span></>
                            ) : (
                                <>
                                    <span>
                                        {currentView === 'forgotPassword' ? 'Send Reset Link' : 
                                         currentView === 'signUp' ? 'Create Account' : 
                                         formData.email === 'admin@ashokparlour.com' ? 'Verify & Access' : 'Sign In'}
                                    </span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-500 text-xs">
                            {currentView === 'signIn' ? (
                                <>
                                    Don't have an account?{' '}
                                    <button type="button" onClick={() => {setCurrentView('signUp'); setAuthError('');}} className="text-gold-500 font-bold hover:underline">Register Now</button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button type="button" onClick={() => {setCurrentView('signIn'); setAuthError('');}} className="text-gold-500 font-bold hover:underline">Sign In</button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
