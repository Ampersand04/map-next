import { MapBlock } from '@/components/shared';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <MapBlock intent="secondary">{children}</MapBlock>;
};

export default AuthLayout;
