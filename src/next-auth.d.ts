import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSessions } from 'next-auth';

export type ExpendedUser = DefaultSessions['user'] & {
    role: UserRole;
};

declare module 'next-auth' {
    interface session {
        user: ExpendedUser;
    }
}
