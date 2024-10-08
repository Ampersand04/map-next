import React from 'react';

interface headingProps {
    className?: string;
}

export const Heading1: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return (
        <h1 className={'text-[46px] max-md:text-[36px] font-bold leading-[56px] ' + className}>
            {children}
        </h1>
    );
};

export const Heading2: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return <h2 className={'text-[32px] font-bold leading-[37.5px] ' + className}>{children}</h2>;
};

export const Heading3: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return <h3 className={'text-[28px] font-bold leading-[32px] ' + className}>{children}</h3>;
};

export const Heading5: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return <h5 className={'text-[20px] font-semibold leading-[26px] ' + className}>{children}</h5>;
};

export const Body1: React.FC<React.PropsWithChildren<headingProps>> = ({ className, children }) => {
    return (
        <p className={'max-md:text-sm text-lg font-normal leading-[24px] ' + className}>
            {children}
        </p>
    );
};

export const Body1m: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return <p className={'text-lg font-medium leading-[24px] ' + className}>{children}</p>;
};

export const Body1accent: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return <p className={'text-lg font-semibold leading-[24px] ' + className}>{children}</p>;
};

export const Body2accent: React.FC<React.PropsWithChildren<headingProps>> = ({
    className,
    children,
}) => {
    return <p className={'text-base font-semibold leading-[24px] ' + className}>{children}</p>;
};

export const Body3: React.FC<React.PropsWithChildren<headingProps>> = ({ className, children }) => {
    return <p className={' text-sm font-normal leading-[24px] ' + className}>{children}</p>;
};
