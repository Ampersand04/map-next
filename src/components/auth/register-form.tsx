'use client';

import { Button, CardSocial, Input } from '@/components/ui';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/shared';
import FieldController from '../shared/fieldController/field-controller';
import { useUserCreate } from '@/hooks/useUserCreate';
import { useState, useTransition } from 'react';
import { register } from '@/actions/register';
import { toast } from 'sonner';

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        // mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        console.log('Form Submitted:', values);

        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data?.error);
                        toast.error('Ошибка регистрации: ' + data?.error);
                    } else if (data?.success) {
                        setSuccess(data?.success);
                        toast.success('Регистрация успешна! ' + data?.success);
                    }
                })
                .catch((error) => {
                    setError('Произошла ошибка во время регистрации');
                    toast.error('Ошибка сервера. Попробуйте снова позже.');
                    console.error('Register error:', error);
                });
        });
    };

    return (
        <div className="flex flex-col gap-[12px]">
            <Form onSubmit={form.handleSubmit(onSubmit)} methods={form}>
                <FieldController
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Input
                            autoFocus
                            id="name"
                            type="text"
                            value={field.value || ''}
                            onChange={field.onChange}
                            intent={fieldState?.error ? 'error' : 'default'}
                            label="Введите ФИО"
                            // placeholder="example@add.com"
                            errorMessage={fieldState?.error?.message}
                        />
                    )}
                />
                <FieldController
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <Input
                            id="email"
                            type="text"
                            value={field.value || ''} // Обеспечиваем, что значение не undefined
                            onChange={field.onChange}
                            disabled={isPending}
                            intent={fieldState?.error ? 'error' : 'default'}
                            label="Введите E-mail"
                            // placeholder="example@add.com"
                            errorMessage={fieldState?.error?.message}
                        />
                    )}
                />

                <FieldController
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <Input
                            id="password"
                            type="password"
                            value={field.value || ''} // Обеспечиваем, что значение не undefined
                            onChange={field.onChange}
                            disabled={isPending}
                            intent={fieldState?.error ? 'error' : 'default'}
                            label="Придумайте пароль"
                            errorMessage={fieldState?.error?.message}
                        />
                    )}
                />

                <Button
                    state={isPending ? 'inactive' : 'normal'}
                    buttonType="submit"
                    intent="primary"
                    size="full"
                    className="my-[4px]">
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );
};

export default RegisterForm;
