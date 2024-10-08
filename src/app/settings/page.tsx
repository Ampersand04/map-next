import { auth, signOut } from '@/auth';
import React from 'react';

const SettingsPage = async () => {
    const session = await auth();
    return (
        <div className="text-text">
            <div>{JSON.stringify(session)}</div>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}>
                <button type="submit">выйти</button>
            </form>
        </div>
    );
};

export default SettingsPage;
