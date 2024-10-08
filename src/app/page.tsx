'use client';
import React from 'react';

import { Question } from '@/components/ui';
import { AboutBlock, Header, PremiumBlock, QuastionsBlock } from '@/components/landing';
import { MapBlock } from '@/components/shared';

export default function Home() {
    return (
        <div>
            <Header />
            <MapBlock intent="primary" />
            <AboutBlock />
            <PremiumBlock />
            <QuastionsBlock>
                <Question
                    question="Что такое веб-приложение «Карта объектов ЖКХ»?"
                    answer="Для получения платного доступа к Карте необходимо зарегистрироваться на сайте и выбрать соответствующий тарифный план."
                />
                <Question
                    question="Какие функции доступны для разных типов пользователей?"
                    answer="Для получения платного доступа к Карте необходимо зарегистрироваться на сайте и выбрать соответствующий тарифный план."
                />
                <Question
                    question="Как получить платный доступ к Карте объектов ЖКХ?"
                    answer="Для получения платного доступа к Карте необходимо зарегистрироваться на сайте и выбрать соответствующий тарифный план."
                />
                <Question
                    question="Какие функции доступны для разных типов пользователей?"
                    answer="Для получения платного доступа к Карте необходимо зарегистрироваться на сайте и выбрать соответствующий тарифный план."
                />
                <Question
                    question="Как получить платный доступ к Карте объектов ЖКХ?"
                    answer="Для получения платного доступа к Карте необходимо зарегистрироваться на сайте и выбрать соответствующий тарифный план."
                />
            </QuastionsBlock>
        </div>
    );
}
