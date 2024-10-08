import React, { useEffect, useState } from 'react';
import { Container } from '@/components/shared/container';
import Image from 'next/image';
import { Navigation } from '@/components/shared';
import { Button, NavItem } from '@/components/ui';
import useScrollNavigation from '@/hooks/useScrollNavigation';
import { Body1accent } from '@/components/ui/heading';
import UserMenu from '@/components/shared/userMenu/userMenu';

interface Props {
    className?: string;
}

const navItems = [
    {
        name: 'Главная',
        link: 'home',
    },
    {
        name: 'О сервисе',
        link: 'about',
    },
    {
        name: 'Premium',
        link: 'premium',
    },
    {
        name: 'FAQs',
        link: 'faqs',
    },
];

const Header: React.FC<Props> = () => {
    const { activeId, handleClick } = useScrollNavigation(navItems.map((item) => item.link));
    const [isHeaderTop, setHeaderTop] = useState(false);
    const navRef = React.useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            setHeaderTop(window.scrollY > 600);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`fixed z-50 transition-all duration-500 top-0 left-0 right-0 ${
                    isHeaderTop ? 'bg-blue-main' : 'backdrop-blur-md'
                } flex min-h-[73px] max-h-[73px] max-md:px-6 max-md:py-4 px-20 py-3`}>
                <Container
                    className={`flex flex-row justify-between min-w-full ${
                        isMenuOpen ? 'items-center' : ''
                    } transition-all duration-300 ease-in-out`}>
                    <div className="max-xl:hidden flex flex-grow items-center justify-between gap-4">
                        <div className="flex items-center gap-1">
                            <Image
                                className="h-fit"
                                width={20}
                                height={20}
                                src={'/logo.png'}
                                alt="logo"></Image>
                            <p className="text-base font-semibold">Интерактивная карта</p>
                        </div>
                        <Navigation ref={navRef}>
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.link}
                                    targetId={item.link}
                                    intent={activeId === item.link ? 'active' : 'default'}
                                    onClick={() => handleClick(item.link)}>
                                    {item.name}
                                </NavItem>
                            ))}
                        </Navigation>
                        <UserMenu />
                    </div>
                    <div className="hidden max-xl:w-full max-xl:flex max-xl:items-center max-xl:justify-between">
                        <div className="flex items-center gap-1">
                            <Image
                                className="h-fit"
                                width={20}
                                height={20}
                                src={'/logo.png'}
                                alt="logo"></Image>
                            <Body1accent className="text-lg">Интерактивная карта</Body1accent>
                            {/* <p className="font-semibold">Интерактивная карта</p> */}
                        </div>
                        <button onClick={toggleMenu} className="text-white">
                            {isMenuOpen ? (
                                <Image
                                    className="h-fit z-50"
                                    width={20}
                                    height={20}
                                    src={'/logo.png'}
                                    alt="logo"
                                />
                            ) : (
                                <Image
                                    className="m-3 h-fit z-40"
                                    width={20}
                                    height={20}
                                    src={'/menu.png'}
                                    alt="menu"
                                />
                            )}
                        </button>
                    </div>
                </Container>
            </header>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-blue-main z-50 flex flex-col items-center justify-center space-y-6"
                    onClick={closeMenu}>
                    <div className="absolute max-md:top-3 max-md:left-1 max-md:right-1 top-3 left-14 right-16 flex justify-between items-center px-5 py-3 ">
                        <div className="flex place-items-center gap-1">
                            <Image
                                className="h-fit"
                                width={20}
                                height={20}
                                src={'/logo.png'}
                                alt="logo"
                            />
                            <Body1accent className="text-lg">Интерактивная карта</Body1accent>
                        </div>
                        <button onClick={toggleMenu} className="text-white">
                            <Image
                                className="h-fit z-50"
                                width={20}
                                height={20}
                                src={'/close.png'}
                                alt="close"
                            />
                        </button>
                    </div>
                    <Navigation
                        ref={navRef}
                        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие меню при клике на навигацию
                    >
                        {navItems.map((item) => (
                            <NavItem
                                key={item.link}
                                targetId={item.link}
                                intent={activeId === item.link ? 'active' : 'default'}
                                onClick={() => {
                                    handleClick(item.link);
                                    closeMenu();
                                }}>
                                {item.name}
                            </NavItem>
                        ))}
                    </Navigation>

                    <div className="absolute bottom-7 left-[25%] right-[25%] flex flex-col gap-4 px-5 max-sm:left-1 max-sm:right-1">
                        <Button href="/auth/register" intent="primary" size="full">
                            Зарегистрироваться
                        </Button>
                        <Button href="/auth/login" intent="ghost" size="full">
                            Войти
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
