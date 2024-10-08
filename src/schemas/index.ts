import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Введите e-mail корректно',
    }),
    password: z.string().min(1, {
        message: 'Пароль обязательное поле',
    }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: 'ФИО обязательное поле',
    }),

    email: z.string().email({
        message: 'Введите e-mail корректно',
    }),

    password: z.string().min(6, {
        message: 'Пароль должен содержать не менее 6 символов',
    }),
});

export const QuestoionSchema = z.object({
    name: z.string().min(1, {
        message: 'Введите ФИО корректно',
    }),
    email: z.string().email({
        message: 'Введите e-mail корректно',
    }),
    question: z.string().min(12, {
        message: 'Вопрос должен быть длиннее',
    }),
});
