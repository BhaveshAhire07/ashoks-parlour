import { Scissors, Sun, UserCheck, Calendar } from 'lucide-react';

export const PRODUCTS = [
    {
        id: 1,
        title: "Lemongrass Tea Series",
        description: "Premium shampoo and conditioner for daily care.",
        price: "₹450",
        image: "/branded-products.png"
    },
    {
        id: 2,
        title: "Essential Beard Oil",
        description: "Nourishment for a softer, healthier beard.",
        price: "₹350",
        image: "/beard-oil.jpg"
    },
    {
        id: 3,
        title: "Styling Clay & Balm",
        description: "Strong hold clay and conditioning balm.",
        price: "₹400",
        image: "/styling-clay.jpg"
    }
];

export const STAFF = [
    {
        id: 1,
        name: "Bapuji Ahire",
        role: "Master Stylist (43 Years Exp.)",
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200", // Placeholder
    },
    {
        id: 2,
        name: "Gitesh Ahire",
        role: "Owner & Senior Barber (35 Years Exp.)",
        image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=200", // Placeholder
    },
    {
        id: 3,
        name: "Jitendra Suryawanshi",
        role: "Salon Manager",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=200", // Placeholder
    }
];

export const JOBS = [
    {
        id: 1,
        title: "Senior Stylist",
        type: "Full Time",
        experience: "3+ Years",
        description: "Expert in haircuts, beard styling, and customer service."
    },
    {
        id: 2,
        title: "Salon Assistant",
        type: "Part Time",
        experience: "0-1 Years",
        description: "Assist senior stylists and manage salon hygiene."
    }
];

export const SERVICES = [
    {
        id: 1,
        title: "Hair Cut",
        description: "Expert styling suited for your face shape and personality.",
        price: "₹150 - ₹300",
        icon: Scissors,
        category: "Hair"
    },
    {
        id: 2,
        title: "Beard Styling",
        description: "Trimming, shaping, and grooming for the perfect beard.",
        price: "₹100 - ₹200",
        icon: UserCheck,
        category: "Beard"
    },
    {
        id: 3,
        title: "Hair Rebonding",
        description: "Smooth, straight, and shiny hair with our premium treatment.",
        price: "₹2000+",
        icon: Sun, // Using Sun as a proxy for 'shine'
        category: "Treatments"
    },
    {
        id: 4,
        title: "Facials & Cleanup",
        description: "Rejuvenating skin treatments for a fresh look.",
        price: "₹500 - ₹1500",
        icon: UserCheck,
        category: "Face"
    },
    {
        id: 5,
        title: "Hair Colouring",
        description: "Premium global color and highlights.",
        price: "₹800+",
        icon: Scissors,
        category: "Hair"
    },
    {
        id: 6,
        title: "Groom Package",
        description: "Complete grooming solution for your big day.",
        price: "Consult for Price",
        icon: Calendar,
        category: "Packages"
    }
];

export const BUSINESS_INFO = {
    name: "Mr. Ashok Men's Parlour",
    tagline: "Defining Men's Style in Dhule Since 1996",
    address: "Opposite VWS College, Kumar Nagar, Dhule, Maharashtra",
    phone: "919403428663",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Ashok+Mens+Parlour+Dhule",
    foundedYear: 1996
};

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Rahul Patil",
        review: "Best salon in Dhule! Ashok bhau is a legend. Been coming here for 10 years.",
        rating: 5
    },
    {
        id: 2,
        name: "Sameer Deshmukh",
        review: "Excellent service and very hygienic. The new look of the parlour is great.",
        rating: 5
    },
    {
        id: 3,
        name: "Vikram Wagh",
        review: "Professional staff and premium products used. Highly recommended for hair rebonding.",
        rating: 4.5
    }
];

export const NAV_LINKS = [
    { name: 'Services', href: '/home#services' },
    { name: 'Products', href: '/home#products' },
    { name: 'About', href: '/home#about' },
    { name: 'Careers', href: '/careers' },
];
