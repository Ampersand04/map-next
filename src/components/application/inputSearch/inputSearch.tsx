import Image from 'next/image';
import { useState } from 'react';

interface Suggestion {
    name: string;
    address: string;
    images: string[];
    id: string; // Добавлено поле id
}

interface InputSearchProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    suggestions: Suggestion[];
    onSuggestionClick: (suggestion: Suggestion) => void; // Callback при выборе подсказки
}

const InputSearch: React.FC<InputSearchProps> = ({
    value,
    onChange,
    placeholder,
    suggestions,
    onSuggestionClick,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative flex text-sm items-center">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder={placeholder || 'Поиск объектов и адресов'}
                className="bg-[#F0F7FF] text-sm text-text rounded-lg outline-blue-light w-[700px] min-h-[44px] pl-4 pr-11 py-4"
            />
            {value.trim() === '' ? (
                <div className="absolute right-4 cursor-pointer">
                    <Image src="/search.svg" alt="Search Icon" width={16} height={16} />
                </div>
            ) : (
                <div className="absolute right-4 cursor-pointer">
                    <Image
                        src="/clear.svg"
                        alt="Clear Icon"
                        width={16}
                        height={16}
                        onClick={() =>
                            onChange({
                                target: { value: '' },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                    />
                </div>
            )}
            {/* Список подсказок */}
            {isFocused && value.trim() !== '' && suggestions.length > 0 ? (
                <div className="absolute top-14 left-0 w-full max-h-60 overflow-y-auto text-text bg-white rounded-lg shadow-md z-10 ">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 p-4 hover:bg-gray-200 cursor-pointer border-b border-[#DEEBEE] last:border-none hover:bg-gray"
                            onClick={() => onSuggestionClick(suggestion)} // Вызов функции при клике на подсказку
                        >
                            <Image
                                src={suggestion.images[0] || '/residential-icon.png'}
                                alt={suggestion.name}
                                width={32}
                                height={32}
                            />
                            <div>
                                <h4 className="font-semibold">{suggestion.name}</h4>
                                <p className="text-xs text-gray-500">{suggestion.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="absolute top-14 left-0 w-full max-h-60 overflow-y-auto text-text bg-white rounded-lg shadow-md z-10">
                    <div className="flex items-center gap-2 p-4 border-b border-[#DEEBEE] last:border-none ">
                        Нет данных
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputSearch;
