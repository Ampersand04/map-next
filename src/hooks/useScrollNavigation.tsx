import { useState, useEffect, useCallback } from 'react';

const useScrollNavigation = (navItems: string[]) => {
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY;

        let currentActiveId: string | null = null;
        for (const id of navItems) {
            const section = document.getElementById(id);
            if (section) {
                const sectionTop = section.offsetTop - 10;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentActiveId = id;
                    break;
                }
            }
        }

        setActiveId(currentActiveId);
    }, [navItems]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleClick = (id: string) => {
        setActiveId(id);
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return { activeId, handleClick };
};

export default useScrollNavigation;
