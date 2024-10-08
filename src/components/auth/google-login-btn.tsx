import { Button } from '@/components/ui';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';

export const GoogleLogin = () => {
    const handleGoogleLogin = () => {
        signIn('google', {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };
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
