import { useSession } from 'next-auth/react'; // Client-side session management

export const useUserSession = () => {
    const { data: session, status } = useSession(); // Get session and loading status from next-auth

    const loading = status === 'loading'; // Loading status
    const user = session?.user || null; // Extract the user from session

    return { user, loading };
};
