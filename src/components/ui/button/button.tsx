import React from 'react';
import styles from './button.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Body2accent } from '../heading';
import { classNames } from '@/utils/combineClasses';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: 'button' | 'submit';
    intent?: 'primary' | 'secondary' | 'ghost' | 'google' | 'redirect';
    size?: 'small' | 'medium' | 'full';
    state?: 'normal' | 'inactive' | 'hover' | 'pressed';
    href?: string;
    back?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            intent = 'primary',
            size = 'medium',
            state = 'normal',
            buttonType = 'button',
            href,
            className,
            children,
            back,
            ...props
        },
        ref,
    ) => {
        // const intentClasses = {
        //     primary: styles.primary,
        //     secondary: styles.secondary,
        //     google: styles.google,
        //     redirect: styles.redirect,
        // };

        // const sizeClasses = {
        //     small: styles.small,
        //     medium: styles.medium,
        //     full: styles.full,
        // };

        // const stateClasses = {
        //     normal: '',
        //     inactive: styles.inactive,
        //     hover: '',
        //     pressed: '',
        // };

        // const combinedClasses = [
        //     styles.button,
        //     intentClasses[intent],
        //     sizeClasses[size],
        //     stateClasses[state],
        //     className,
        // ]
        //     .filter(Boolean)
        //     .join(' ');

        const combinedClasses = classNames(
            styles.button,
            styles[intent],
            styles[size],
            styles[state],
            className,
        );

        const RenderContent = ({ back }: { back?: boolean }) => {
            return (
                <button className={combinedClasses} type={buttonType} ref={ref} {...props}>
                    <div
                        className={
                            back ? 'flex flex-row-reverse gap-[8px]' : 'flex flex-row gap-[12px]'
                        }>
                        {children}
                        {intent === 'redirect' && (
                            <Image
                                width={back ? 28 : 32}
                                height={10}
                                src={'/button-arrow.svg'}
                                className={back ? 'rotate-180' : ''}
                                alt="button-arrow"
                            />
                        )}
                    </div>
                </button>
            );
        };

        if (href) {
            return (
                <Link href={href}>
                    <RenderContent back={back} />
                </Link>
            );
        } else {
            return (
                <button className={combinedClasses} type={buttonType} ref={ref} {...props}>
                    {intent === 'google' ? (
                        <Image width={23} height={24} src={'/google.svg'} alt="google" />
                    ) : (
                        ''
                    )}
                    <p>{children}</p>
                </button>
            );
        }
    },
);

Button.displayName = 'Button';

export default Button;
