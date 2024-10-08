import React, { useEffect, useState } from 'react';
import { Container } from '@/components/shared/container';

interface Props {
    className?: string;
}

const Footer: React.FC<Props> = () => {
    return (
        <>
            <footer className="bg-blue-main">
                <Container className="flex flex-row justify-between min-w-full">
                    <div className="hidden xl:flex xl:flex-grow xl:items-center xl:justify-between xl:gap-4"></div>
                </Container>
            </footer>
        </>
    );
};

export default Footer;
