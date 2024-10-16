import React, { useState } from 'react';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { signOut } from '@/auth'; // Assume this is the signOut function
import { useUserSession } from '@/hooks/useUserSession'; // Custom hook
import { logout } from '@/actions/logout';
import Link from 'next/link';
import { IconRole } from './iconRole';

interface UserMenuProps {
    isLight?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ isLight }) => {
    const { user, loading } = useUserSession();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    if (loading) {
        return <div className="text-text">Загрузка...</div>; // Show a loading state while user data is being fetched
    }

    const handleLogoutClick = async () => {
        await logout();
    };

    const isAdmin = user?.role === 'ADMIN';
    const isManager = user?.role === 'MANAGER';

    return (
        <div className="relative flex gap-4 items-center">
            {user ? (
                <div onClick={toggleDropdown} className="cursor-pointer flex items-center gap-2">
                    <p className={`text-right truncate max-w-[120px] ${isLight && 'text-text'} `}>
                        {user?.name}
                    </p>
                    <IconRole />
                </div>
            ) : (
                <>
                    <Button href="/auth/login" intent="ghost" state="normal">
                        Войти
                    </Button>
                    <Button href="/auth/register">Зарегистрироваться</Button>
                </>
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-14 right-0 text-text-secondary mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
                    <div className="flex items-center gap-2 bg-gray p-4 rounded-t-lg">
                        <IconRole />
                        <div>
                            <h3 className="text-sm text-text font-semibold leading-4">
                                {user?.name}
                            </h3>
                            {user?.role !== 'USER' && (
                                <p className="text-[10px] text-gray-500">{user?.role}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-4 p-4 text-sm">
                        {/* General Menu Items */}
                        <Link href={'/404'}>
                            <div className="menu-item flex items-center justify-between hover:cursor-pointer">
                                <div className="flex items-center gap-[8px]">
                                    <Image src="/settings.svg" alt="" width={24} height={24} />

                                    <h5 className="text-gray-700 font-semibold">Настройки</h5>
                                </div>
                                <Image src="/user-right-arrow.svg" alt="" width={12} height={12} />
                            </div>
                        </Link>
                        {!isAdmin && !isManager && (
                            <Link href={'/404'}>
                                <div className="menu-item flex items-center justify-between hover:cursor-pointer">
                                    <div className="flex items-center gap-[8px]">
                                        <Image src="/premium.svg" alt="" width={24} height={24} />
                                        <h5 className="text-gray-700 font-semibold">
                                            Premium-доступ
                                        </h5>
                                    </div>
                                    <Image
                                        src="/user-right-arrow.svg"
                                        alt=""
                                        width={12}
                                        height={12}
                                    />
                                </div>
                            </Link>
                        )}

                        {/* Role-Specific Items */}
                        {isAdmin && (
                            <Link
                                href={'/dashboard/objects'}
                                className="menu-item flex items-center justify-between hover:cursor-pointer">
                                <div className="flex items-center gap-[8px]">
                                    <Image src="/control-panel.svg" alt="" width={24} height={24} />

                                    <h5 className="text-gray-700 font-semibold">
                                        Панель управления
                                    </h5>
                                </div>
                                <Image src="/user-right-arrow.svg" alt="" width={12} height={12} />
                            </Link>
                        )}
                        {isManager && (
                            <Link
                                href={'/dashboard/objects'}
                                className="menu-item flex items-center justify-between hover:cursor-pointer">
                                <div className="flex items-center gap-[8px]">
                                    <Image src="/home.svg" alt="" width={24} height={24} />

                                    <h5 className="text-gray-700 font-semibold">Объекты</h5>
                                </div>
                                <Image src="/user-right-arrow.svg" alt="" width={12} height={12} />
                            </Link>
                        )}
                        <div className="bg-[#DEEBEE] -my-1 w-full h-[1px]" />
                        <div className="menu-item flex items-center justify-between hover:cursor-pointer ">
                            <button onClick={handleLogoutClick}>
                                <div className="flex items-center gap-[8px] font-semibold">
                                    <Image src="/exit.svg" alt="" width={24} height={24} />
                                    <h5>Выйти</h5>
                                </div>
                            </button>
                            <Image src="/user-right-arrow.svg" alt="" width={12} height={12} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
