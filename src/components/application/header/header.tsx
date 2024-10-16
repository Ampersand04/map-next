import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import UserMenu from '@/components/shared/userMenu/userMenu';
import InputSearch from '../inputSearch/inputSearch';
import FilterModal from '@/components/shared/filter/filter';

interface Suggestion {
    name: string;
    address: string;
    images: string[];
    id: string;
}

interface Props {
    className?: string;
    setSelectedObjectId: (id: string | null) => void; // Функция для установки выбранного объекта
    setIsPanelOpen: (open: boolean) => void; // Функция для открытия боковой панели
}

const Header: React.FC<Props> = ({ setSelectedObjectId, setIsPanelOpen }) => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модалки
    const [filters, setFilters] = useState({});

    // Функция для получения подсказок из API
    const fetchSuggestions = async (query: string) => {
        try {
            const queryParams = new URLSearchParams({
                query,
                ...filters, // Добавляем фильтры в запрос
            }).toString();

            const response = await fetch(`/api/suggestions?${queryParams}`);
            const data = await response.json();
            setSuggestions(data.suggestions || []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    // Дебаунс для задержки API вызовов при вводе
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchValue) {
                fetchSuggestions(searchValue); // Получаем подсказки при изменении значения поиска
            } else {
                setSuggestions([]); // Очищаем подсказки, если поле поиска пустое
            }
        }, 300); // 300мс задержка

        return () => {
            clearTimeout(handler); // Очистка таймера при размонтировании компонента
        };
    }, [searchValue]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value); // Обновляем значение поиска
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setSelectedObjectId(suggestion.id); // Устанавливаем выбранный объект по ID
        setIsPanelOpen(true); // Открываем боковую панель
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleModalOk = (selectedFilters: any) => {
        setFilters(selectedFilters); // Устанавливаем выбранные фильтры
        setIsModalOpen(false);

        fetchSuggestions(searchValue);
    };

    const handleModalCancel = (selectedFilters: any) => {
        setFilters(selectedFilters);
        setIsModalOpen(false);
    };

    const hasActiveFilters = Object.values(filters).some((value) => value);

    return (
        <header
            className={`fixed z-30 transition-all duration-500 top-0 left-0 right-0 bg-white shadow-md flex min-h-[73px] max-h-[73px] max-md:px-6 max-md:py-4 px-20 py-3`}>
            <div className="flex flex-grow items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Image className="" width={15} height={15} src={'/logo-blue.png'} alt="logo" />
                    <p className="text-blue-main text-sm font-semibold">карта жкх</p>
                </div>
                <div className="flex items-center gap-4">
                    <InputSearch
                        value={searchValue}
                        onChange={handleSearchChange}
                        suggestions={suggestions}
                        onSuggestionClick={handleSuggestionClick} // Передаем функцию для обработки клика по подсказке
                    />
                    <div className="relative flex items-center h-fit">
                        <Image
                            className="hover:cursor-pointer m-2"
                            src="./filter.svg"
                            alt="Фильтры"
                            height={18}
                            width={18}
                            onClick={showModal}
                        />
                        {hasActiveFilters && (
                            <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-lg"></div>
                        )}
                    </div>
                </div>
                <UserMenu />
            </div>
            <FilterModal visible={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} />
        </header>
    );
};

export default Header;
