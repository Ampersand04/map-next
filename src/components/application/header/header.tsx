import React, { useState } from 'react';
import { Container } from '@/components/shared/container';
import Image from 'next/image';
import UserMenu from '@/components/shared/userMenu/userMenu';
import InputSearch from '../inputSearch/inputSearch';

interface Props {
    className?: string;
}

const Header: React.FC<Props> = () => {
    const [searchValue, setSearchValue] = useState(''); // State for search input

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value); // Update search input value
    };

    const suggestions = [
        {
            name: 'Брестский городской исполнительный комитет',
            address: 'Брестская обл., г. Брест, ул. Энгельса 3',
            icon: '/icon-building.svg',
        },
        {
            name: 'Брестский завод бытовой химии',
            address: 'Брестская обл., г. Брест, ул. Белорусская, д. 51',
            icon: '/icon-factory.svg',
        },
        // Add more suggestions here...
    ];

    return (
        <header
            className={`fixed z-10 transition-all duration-500 top-0 left-0 right-0 bg-white shadow-md flex min-h-[73px] max-h-[73px] max-md:px-6 max-md:py-4 px-20 py-3 `}>
            {/* <Container
                className={`flex flex-row justify-between max-w-screen-xl w-full items-center`}> */}
            <div className="flex flex-grow items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Image className="" width={15} height={15} src={'/logo-blue.png'} alt="logo" />
                    <p className="text-blue-main text-sm font-semibold">карта жкх</p>
                </div>
                <InputSearch
                    value={searchValue}
                    onChange={handleSearchChange}
                    suggestions={suggestions}
                />
                <UserMenu />
            </div>
            {/* </Container> */}
        </header>
    );
};

export default Header;
