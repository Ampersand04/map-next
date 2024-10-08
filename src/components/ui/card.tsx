import Link from 'next/link';
import { Button } from './button';
import { Body3, Heading2 } from './heading';
import Image from 'next/image';

interface CardProps {
    label: string;
    description?: string;
    children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, label, description }) => {
    return (
        <div className="relative w-full text-center flex flex-col gap-[28px] min-w-[390px]">
            <div className="flex flex-col gap-[12px]">
                <Heading2 className="text-text">{label}</Heading2>
                <Body3 className="text-text-secondary">{description}</Body3>
            </div>
            {children}
        </div>
    );
};

export const ForgotPassword = () => {
    return (
        <>
            <Body3 className="text-left text-[14px] text-text ml-[16px] mt-[-8px]">
                <Link href="/reset" className="font-semibold hover:underline">
                    Забыли пароль?
                </Link>
            </Body3>
        </>
    );
};
const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'; // Редирект на маршрут Google OAuth
};

export const CardSocial = () => {
    return (
        <div className="flex flex-col gap-[16px]">
            <div className="flex justify-center">
                <div className="flex flex-row items-center gap-2 w-[90%]">
                    <div className="h-[1px] w-1/2 bg-text-secondary" />

                    <p className="text-text">или</p>
                    <div className="h-[1px] w-1/2 bg-text-secondary" />
                </div>
            </div>
            <Button
                intent="google"
                state={'normal'}
                size="full"
                className="my-[4px]"
                onClick={handleGoogleLogin}>
                Войти с помощью Google
            </Button>
        </div>
    );
};

interface OtherWayProps {
    text: string;
    linkLabel: string;
    linkHref: string;
}

export const OtherWay: React.FC<OtherWayProps> = ({ text, linkHref, linkLabel }) => {
    return (
        <>
            <Body3 className="text-text">
                {text}
                <Link href={linkHref} className="font-semibold hover:underline">
                    {linkLabel}
                </Link>
            </Body3>
        </>
    );
};

interface CardBackBtnProps {
    children: string;
    className?: string;
}

export const CardBackBtn: React.FC<CardBackBtnProps> = ({ className, children }) => {
    return (
        <div className={`absolute t-[-30px] l-[-200px] flex flex-col ${className}`}>
            <Button href="/" back intent="redirect" size="small">
                {/* <Image width={32} height={10} src={'/button-arrow.svg'} alt="button-arrow" /> */}
                {children}
            </Button>
        </div>
    );
};
