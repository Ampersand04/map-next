'use client';

import { SessionProvider } from 'next-auth/react';

interface ISession {
    children: React.ReactNode;
}

export const SessionProviderComponent = ({ children }: ISession) => {
    return <SessionProvider>{children}</SessionProvider>;
};
