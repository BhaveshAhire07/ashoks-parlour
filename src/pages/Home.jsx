import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Products from '../components/Products';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import { useAuth } from '../context/AuthContext';

const Home = ({ onOpenBooking }) => {
    const { user } = useAuth();
    return (
        <>
            <Hero onOpenBooking={onOpenBooking} />
            <Services />
            <Products />
            <About />
            {user && <Testimonials />}
        </>
    );
};

export default Home;
