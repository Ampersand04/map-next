'use client';
import Image from 'next/image';
import styles from './mapBlock.module.scss';
import { Button } from '@/components/ui';
import { Body1, Body1accent, Heading1, Heading2 } from '@/components/ui/heading';
import { PropsWithChildren } from 'react';
import { Container } from '../container';
import { classNames } from '@/utils/combineClasses';
import Link from 'next/link';

interface mapBlockProps {
    intent?: 'primary' | 'secondary';
    className?: string;
}

const MapBlock: React.FC<PropsWithChildren<mapBlockProps>> = ({
    intent = 'primary',
    className,
    children,
}) => {
    // const intentClasses = {
    //     primary: styles.primary,
    //     secondary: styles.secondary,
    // };

    // const combinedClasses = [styles.mapBlock, intentClasses[intent], className]
    //     .filter(Boolean)
    //     .join(' ');

    const combinedClasses = classNames(
        styles.mapBlock,
        styles[intent],
        // styles[state],
        className,
    );

    if (intent === 'primary') {
        return (
            <section id="home" className={combinedClasses}>
                <Container className="h-full max-md:py-[72px] py-24">
                    <div className=" h-full flex items-center justify-center">
                        {/* INFO */}
                        <div className="flex flex-col gap-6 z-10 items-center justify-center">
                            <Heading1 className="text-center">
                                Интерактивная карта инфраструктуры
                                <br />
                                Вашего города
                            </Heading1>
                            <Body1 className="text-center text-white-secondary">
                                Легко находите, исследуйте и управляйте объектами ЖКХ вашего <br />
                                города с помощью нашего интерактивного и удобного веб-приложения.
                            </Body1>
                            <div className="flex flex-row items-center justify-between gap-16">
                                <div className="flex flex-col items-center">
                                    <Heading2>1000+</Heading2>
                                    <Body1accent>объектов</Body1accent>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Heading2>70+</Heading2>
                                    <Body1accent>характеристик</Body1accent>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Heading2>5+</Heading2>
                                    <Body1accent>городов</Body1accent>
                                </div>
                            </div>
                            <Link href={'service'}>
                                <Button intent="primary">Перейти в приложение</Button>
                            </Link>
                        </div>

                        {/* SHADOWS */}
                        <div className="absolute top-[-417px] left-[-966px] w-[1679px] h-[1387px] bg-blue-gradient z-0"></div>
                        <div className="absolute top-[172px] right-[-902px] w-[1679px] h-[1387px] bg-blue-gradient z-0"></div>

                        {/* MAP */}
                        <Image
                            className="absolute object-cover h-[80%] w-fit mt-4 z-0"
                            width={1100}
                            height={650}
                            src="/map.svg"
                            alt="map"
                        />

                        {/* MOUSE */}

                        <Image
                            className="absolute bottom-7 z-0"
                            width={30}
                            height={110}
                            src="/mouse.svg"
                            alt="map"
                        />
                    </div>
                </Container>
            </section>
        );
    } else if (intent === 'secondary') {
        return (
            <section className={combinedClasses}>
                <Container className="h-full max-md:py-[72px] py-24">
                    <div className=" h-full flex items-center justify-center">
                        {/* INFO */}
                        <div className="flex flex-col bg-white gap-6 z-10 py-[40px] px-[56px] items-center justify-center rounded-3xl">
                            {children}
                        </div>

                        <div className="absolute flex flex-row gap-1 top-[30px] left-[80px] z-50 ">
                            <Image
                                className="h-fit"
                                width={20}
                                height={20}
                                src={'/logo.png'}
                                alt="logo"></Image>
                            <Body1accent className="text-lg">Интерактивная карта</Body1accent>
                        </div>

                        {/* SHADOWS */}
                        <div className="absolute top-[-417px] left-[-966px] w-[1679px] h-[1387px] bg-[radial-gradient(rgba(90,197,243,0.8)_0%,rgba(52,55,250,0)_50%)] z-0"></div>
                        <div className="absolute top-[172px] right-[-902px] w-[1679px] h-[1387px] bg-[radial-gradient(rgba(90,197,243,0.8)_0%,rgba(52,55,250,0)_50%)] z-0"></div>

                        {/* MAP */}
                        <Image
                            className="absolute object-cover h-[80%] w-fit mt-4 z-0"
                            width={1100}
                            height={650}
                            src="/map.svg"
                            alt="map"
                        />
                    </div>
                </Container>
            </section>
        );
    }
};

export default MapBlock;
