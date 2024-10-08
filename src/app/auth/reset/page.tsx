'use client';
import React from 'react';

import { Card, CardBackBtn } from '@/components/ui';
import ResetForm from '@/components/auth/reset-form';

const Reset = () => {
    return (
        // <Form>
        //     <div className="w-full text-center flex flex-col gap-[28px] min-w-[390px]">
        //         <div className="flex flex-col gap-[12px]">
        //             <Heading2 className="text-text">Вход</Heading2>
        //             <Body3 className="text-text-secondary">
        //                 Войдите, чтобы получить доступ к карте
        //             </Body3>
        //         </div>
        //         <div className="flex flex-col gap-[12px]">
        //             <Input id="email" type="email" intent="default" label="Введите E-mail" />
        //             <Input id="password" type="password" intent="default" label="Введите пароль" />

        //             <Body3 className="text-left text-text ml-[16px]">
        //                 <Link href="/reset" className="font-semibold">
        //                     Забыли пароль?
        //                 </Link>
        //             </Body3>

        //             <Button intent="primary" size="full" className="my-[4px]">
        //                 Войти
        //             </Button>

        //             <div className="flex justify-center">
        //                 <div className="flex flex-row items-center gap-2 w-[90%]">
        //                     <div className="h-[1px] w-1/2 bg-text-secondary" />

        //                     <p className="text-text">или</p>
        //                     <div className="h-[1px] w-1/2 bg-text-secondary" />
        //                 </div>
        //             </div>
        //             <Button intent="google" size="full" className="my-[4px]">
        //                 Войти через Google
        //             </Button>
        //         </div>
        //         <Body3 className="text-text">
        //             Еще нет аккаунта?
        //             <Link href="/register" className="font-semibold">
        //                 Создать
        //             </Link>
        //         </Body3>
        //     </div>
        // </Form>

        <Card label="Сброс пароля" description="Придумайте новый пароль для своего аккаунта">
            <ResetForm />
            <CardBackBtn className={'ml-[-32px] mt-[-22px] flex flex-row'}>Назад</CardBackBtn>
        </Card>
    );
};

export default Reset;
