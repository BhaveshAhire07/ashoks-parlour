import React, { useState, useEffect } from 'react';

const LiveStatus = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [statusText, setStatusText] = useState('');

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const hours = now.getHours();
            const openHour = 8;
            const closeHour = 22; // 10 PM

            if (hours >= openHour && hours < closeHour) {
                setIsOpen(true);
                setStatusText('Open Now');
            } else {
                setIsOpen(false);
                setStatusText('Closed (Opens 8 AM)');
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isOpen
                ? 'bg-green-500/10 border-green-500/50 text-green-500'
                : 'bg-red-500/10 border-red-500/50 text-red-500'
            }`}>
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            {statusText}
        </div>
    );
};

export default LiveStatus;
