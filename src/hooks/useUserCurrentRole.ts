import { useSession } from 'next-auth/react'; // Client-side session management

export const useUserCurrentRole = () => {
    const { data: session } = useSession(); // Get session and loading status from next-auth

    const user = session?.user || null; // Extract the user from session

    return user?.role;
};
