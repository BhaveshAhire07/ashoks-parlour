import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // If there's a hash, scroll to the element
            const element = document.getElementById(hash.substring(1)); // remove '#'
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If simply navigating pages, scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
