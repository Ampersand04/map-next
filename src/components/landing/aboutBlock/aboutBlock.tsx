import React from 'react';
import styles from './aboutBlock.module.scss';
import { Button } from '@/components/ui';
import { Container } from '@/components/shared/container';
import Image from 'next/image';
import { Body1, Heading2, Heading3 } from '@/components/ui/heading';

interface Props {
    className?: string;
}

const AboutBlock: React.FC<Props> = () => {
    return (
        <section id="about" className="w-full h-fit bg-white text-text max-md:px-4 px-10">
            <Container className={'max-md:pt-16 max-md:pb-[12px] pt-24 pb-[12px]'}>
                <Body1 className="max-md:text-sm text-text-secondary">О сервисе</Body1>
                <Heading2 className="max-md:text-[28px] text-[36px] leading-10 max-md:mb-10 mb-12">
                    Как это работает
                </Heading2>

                <div className={`overflow-hidden grid ${styles.grid_areas}`}>
                    <div
                        className={`relative overflow-hidden bg-gray rounded-lg max-md:px-4 max-md:py-6 px-8 py-10 max-md:pb-[140px] pb-10 min-h-[300px] ${styles.area_1}`}>
                        <Heading3 className="max-md:text-[20px] text-text mb-4">
                            Информация об объектах ЖКХ в вашем кармане
                        </Heading3>
                        <Body1 className="max-md:text-md text-lg text-text-secondary leading-6 max-md:mb-3.5 mb-6 max-md:pr-0 pr-[100px]">
                            Наша карта предоставляет детальную информацию о каждом объекте ЖКХ.
                            Узнайте назначение объекта, год постройки, адрес и процент готовности
                            всего в несколько кликов. Получите данные о текущих ремонтах,
                            эксплуатационно-технических паспортах и планах работ. Начните
                            пользоваться картой прямо сейчас с вашего смартфона или компьютера.
                        </Body1>
                        <Button href="/login" intent="redirect">
                            Получить доступ к карте
                        </Button>

                        <Image
                            className="absolute bottom-0 right-[-10px] max-lg:w-[209px] w-[440px]"
                            width={442}
                            height={379}
                            src={'/map-phone.png'}
                            alt="map"
                        />
                    </div>
                    <div
                        className={`relative overflow-hidden bg-gray rounded-lg max-md:px-4 max-md:py-6 px-8 py-10 max-md:pb-[140px] pb-10 min-h-[300px] ${styles.area_2}`}>
                        <Heading3 className="max-md:text-[20px] text-text pr-[50px] mb-4">
                            Легкий поиск и удобная настройка фильтров
                        </Heading3>
                        <Body1 className="max-md:text-md text-text-secondary max-md:mb-3.5 mb-6 max-md:pr-0 pr-[100px]">
                            Просто введите адрес, и вы увидите подробную информацию об объекте,
                            включая технические характеристики и конструкционные особенности.
                        </Body1>

                        <Image
                            className="absolute bottom-0 -right-1 max-md:-bottom-1 max-md:-right-7 z-20 w-[150px] max-md:w-[209px]"
                            width={209}
                            height={214}
                            src={'/filter-search.png'}
                            alt="map"
                        />
                    </div>
                    <div
                        className={`relative overflow-hidden bg-gray rounded-lg px-4 py-6 max-md:px-8 max-md:py-10 pb-[140px] max-md:pb-10 min-h-[300px] ${styles.area_3}`}>
                        <Heading3 className=" max-md:text-[20px] text-[28px] text-text mb-4">
                            Мы защищаем ваши данные
                        </Heading3>
                        <Body1 className="max-md:text-md text-text-secondary max-md:mb-3.5 mb-6 max-md:pr-0 pr-[100px]">
                            Ваши данные в безопасности с нашей системой. Все технические
                            характеристики и эксплуатационная документация объектов ЖКХ хранятся с
                            соблюдением высоких стандартов безопасности.
                        </Body1>
                        <Image
                            className="absolute -bottom-1 right-1 max-md:bottom-1 max-md:right-1 z-20 w-[150px] max-md:w-[209px]"
                            width={209}
                            height={214}
                            src={'/safty.png'}
                            alt="map"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AboutBlock;
