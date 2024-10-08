'use client';
import React from 'react';

import { MapBlock } from '@/components/shared';
import { Form } from '@/components/shared';
import Input from '@/components/ui/input/input';
import { Body3, Heading2 } from '@/components/ui/heading';
import { Button, Card, CardSocial, OtherWay } from '@/components/ui';
import Link from 'next/link';
import RegisterForm from '@/components/auth/register-form';
import { GoogleLogin } from '@/components/auth/google-login-btn';

export default function Register() {
    return (
        // <Form>
        //     <div className="w-full text-center flex flex-col gap-[28px] min-w-[390px]">
        //         <div className="flex flex-col gap-[12px]">
        //             <Heading2 className="text-text">Регистрация</Heading2>
        //             <Body3 className="text-text-secondary">
        //                 Зарегистрируйтесь, чтобы получить доступ к карте
        //             </Body3>
        //         </div>
        //         <div className="flex flex-col gap-3">
        //             <Input id="fullname" type="text" intent="default" label="Введите ФИО" />
        //             <Input id="email" type="email" intent="default" label="Введите E-mail" />
        //             <Input
        //                 id="password"
        //                 type="password"
        //                 intent="default"
        //                 label="Придумайте пароль"
        //             />

        //             <Button intent="primary" size="full" className="my-[4px]">
        //                 Зарегистрироваться
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
        //             Уже есть аккаунт?
        //             <Link href="/login" className="font-semibold">
        //                 Войти
        //             </Link>
        //         </Body3>
        //     </div>
        // </Form>

        <Card label="Регистрация" description="Зарегистрируйтесь, чтобы получить доступ к карте">
            <RegisterForm />
            <GoogleLogin />
            <OtherWay text="Уже есть аккаунт?" linkHref="/login" linkLabel="Войти" />
        </Card>
    );
}
