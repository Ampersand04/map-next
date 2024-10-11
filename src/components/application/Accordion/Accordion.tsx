import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface AccordionProps {
    title: string;
    content: React.ReactNode;
    open?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, open }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        open && setIsOpen(true); // Обновите состояние, если open изменится
    }, [open]);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-gray-secondary">
            <button
                className="flex justify-between items-center py-3 px-0 w-full text-blue-main text-left font-semibold text-base bg-transparent hover:bg-gray focus:outline-none"
                onClick={toggleAccordion}>
                <span>{title}</span>
                <span>
                    {isOpen ? (
                        <Image
                            src={'/arrowOpen.svg'}
                            alt=""
                            width={12}
                            height={12}
                            className="rotate-180"
                        />
                    ) : (
                        <Image src={'/arrowOpen.svg'} alt="" width={12} height={12} />
                    )}
                </span>
            </button>
            {isOpen && (
                <div className="flex flex-col gap-2.5 px-3 pb-4 bg-gray-50 text-gray-700">
                    {content}
                </div>
            )}
        </div>
    );
};

export default Accordion;
