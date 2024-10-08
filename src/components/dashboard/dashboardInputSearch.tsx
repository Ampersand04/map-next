import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface Suggestion {
    name: string;
    address: string;
    icon: string;
}

interface DashboardInputSearchProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const DashboardInputSearch: React.FC<DashboardInputSearchProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="relative flex text-sm mt-4 mb-3 items-center">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Поиск объектов и адресов'}
                className="bg-white text-sm text-text rounded-lg outline-blue-light w-[400px] min-h-[44px] max-h-[44px] max-md:px-4 max-md:py-4 pl-4 pr-11 py-4"
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
        </div>
    );
};

export default DashboardInputSearch;
