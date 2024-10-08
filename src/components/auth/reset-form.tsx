'use client';

import { Button, CardSocial, ForgotPassword, Input } from '@/components/ui';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/shared';
import FieldController from '../shared/fieldController/field-controller';
import { useState, useTransition } from 'react';

const ResetForm = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        // mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log('Form Submitted:', values);
        startTransition(() => {
            // login(values).then(data) => {
            //     setError(data.error)
            // };
        });
    };

    return (
        <div className="flex flex-col gap-[12px]">
            <Form onSubmit={form.handleSubmit(onSubmit)} methods={form}>
                <FieldController
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <Input
                            autoFocus
                            id="email"
                            type="text"
                            value={field.value || ''} // Обеспечиваем, что значение не undefined
                            onChange={field.onChange}
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
                            intent={fieldState?.error ? 'error' : 'default'}
                            label="Введите пароль"
                            errorMessage={fieldState?.error?.message}
                        />
                    )}
                />

                <Button buttonType="submit" intent="primary" size="full" className=" my-[4px]">
                    Войти
                </Button>
            </Form>
        </div>
    );
};

export default ResetForm;
