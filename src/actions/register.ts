'use server';

import { signIn } from '@/auth';
import bcrypt from 'bcryptjs';
import { userService } from '../service/user.service';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { RegisterSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { error } from 'console';
import { prisma } from '@/lib/prisma';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    console.log(values);

    if (!validatedFields.success) {
        return { error: 'Заполните поля!' };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
        console.log('Email уже используется');
        return { error: 'Email уже используется' };
    }

    await prisma.user.create({
        data: { name, email, password: hashedPassword, image: '' },
    });
    console.log('Пользователь создан');

    try {
        await signIn('credentials', {
            email,
            password,
            name,
            image: null,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Нет такого пользоваеля' };
                default:
                    return { error: 'Что-то пошло не так' };
            }
        }

        throw error;
    }
    return { success: 'Пользователь создан' };
};
