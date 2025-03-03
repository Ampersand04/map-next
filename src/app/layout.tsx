import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { QueryClientProviderWrapper } from '@/providers/queryClientProviderWrapper';
import { SessionProviderComponent } from '@/providers/sessionProvider';
import { Toaster } from 'sonner';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="!scroll-smooth">
            <body className={raleway.className}>
                <SessionProviderComponent>
                    <QueryClientProviderWrapper>
                        <Toaster position="top-center" richColors />
                        <div>{children}</div>
                    </QueryClientProviderWrapper>
                </SessionProviderComponent>
            </body>
        </html>
    );
}
