import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface Suggestion {
    name: string;
    address: string;
    icon: string;
}

interface InputSearchProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    suggestions: Suggestion[];
}

const InputSearch: React.FC<InputSearchProps> = ({ value, onChange, placeholder, suggestions }) => {
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
                className="bg-[#F0F7FF] text-sm text-text rounded-lg outline-blue-light w-[700px] min-h-[44px] max-h-[44px] max-md:px-4 max-md:py-4 pl-4 pr-11 py-4"
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
                            onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
                        }
                    />
                </div>
            )}
            {/* Filter Icon aligned outside the input */}
            <div className="absolute -right-8 cursor-pointer">
                <Image src="/filter.svg" alt="Filter Icon" width={16} height={16} />
            </div>

            {isFocused && value.trim() !== '' && suggestions.length > 0 && (
                <div className="absolute top-14 left-0 w-full max-h-60 overflow-y-auto text-text bg-white  rounded-lg shadow-md z-10">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 p-4 hover:bg-gray cursor-pointer border-b border-[#DEEBEE] last:border-none"
                            onClick={() =>
                                onChange({
                                    target: { value: suggestion.name },
                                } as ChangeEvent<HTMLInputElement>)
                            }>
                            <Image src={suggestion.icon} alt="Icon" width={24} height={24} />
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">{suggestion.name}</span>
                                <span className="text-xs text-gray-500">{suggestion.address}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputSearch;
