'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button, Card, OtherWay } from '@/components/ui';
import LoginForm from '@/components/auth/login-form';
import { GoogleLogin } from '@/components/auth/google-login-btn';

const Login = () => {
    // const { data: session } = useSession();

    // console.log('session: ' + { session });

    return (
        <Card label="Войти" description="Войдите, чтобы получить доступ к карте">
            <LoginForm />
            <GoogleLogin />
            <OtherWay text="Еще нет аккаунта?" linkHref="/auth/register" linkLabel="Создать" />
        </Card>
    );
};

export default Login;
