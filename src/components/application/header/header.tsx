import React, { useState, useEffect } from 'react';
import { Container } from '@/components/shared/container';
import Image from 'next/image';
import UserMenu from '@/components/shared/userMenu/userMenu';
import InputSearch from '../inputSearch/inputSearch';

interface Suggestion {
    name: string;
    address: string;
    icon: string;
}

interface Props {
    className?: string;
}

const Header: React.FC<Props> = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedObject, setSelectedObject] = useState<Suggestion | null>(null); // Track selected object for side panel
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Function to fetch suggestions from the API
    const fetchSuggestions = async (query: string) => {
        try {
            const response = await fetch(`/api/suggestions?query=${query}`);
            const data = await response.json();
            setSuggestions(data.suggestions || []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    // Debounce function to delay API calls while typing
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchValue) {
                fetchSuggestions(searchValue); // Fetch suggestions when search value changes
            } else {
                setSuggestions([]); // Clear suggestions if search input is empty
            }
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler); // Cleanup timeout on component unmount
        };
    }, [searchValue]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value); // Update search input value
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setSelectedObject(suggestion); // Set the selected suggestion for the side panel
        setIsPanelOpen(true); // Open the side panel
    };

    const closePanel = () => {
        setIsPanelOpen(false); // Close the panel
    };

    return (
        <header
            className={`fixed z-10 transition-all duration-500 top-0 left-0 right-0 bg-white shadow-md flex min-h-[73px] max-h-[73px] max-md:px-6 max-md:py-4 px-20 py-3 `}>
            <div className="flex flex-grow items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Image className="" width={15} height={15} src={'/logo-blue.png'} alt="logo" />
                    <p className="text-blue-main text-sm font-semibold">карта жкх</p>
                </div>
                <InputSearch
                    value={searchValue}
                    onChange={handleSearchChange}
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
