import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

const WhatsAppButton = () => {
    const handleClick = () => {
        const message = "Hi, I would like to know more about your services and book an appointment.";
        const waLink = `https://wa.me/${BUSINESS_INFO.phone}?text=${encodeURIComponent(message)}`;
        window.open(waLink, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-4">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-2xl hidden md:block"
            >
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">Chat with us</p>
            </motion.div>
            
            <motion.button
                onClick={handleClick}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#25D366] text-white p-4 md:p-5 rounded-3xl shadow-[0_20px_50px_rgba(37,211,102,0.3)] hover:shadow-[0_20px_50px_rgba(37,211,102,0.5)] transition-all group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageCircle size={32} fill="white" className="text-transparent relative z-10" />
            </motion.button>
        </div>
    );
};

export default WhatsAppButton;
