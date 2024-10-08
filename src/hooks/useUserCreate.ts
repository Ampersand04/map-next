// import { userService } from '@/service/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
export interface IUser {
    name: string;
    email: string;
    password: string;
}

// const loginUser = async () => {};

export const useUserCreate = () => {
    // const { data, isPending, isError, isSuccess } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: loginUser,
    //     select: (data) => data.data,
    //     // enabled:
    // });

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationKey: ['user'],
        // mutationFn: (newUser: IUser) => userService.userRegister(newUser),
        // mutationFn: (newUser: IUser) => userService.userRegister(newUser),
    });

    // useEffect(() => {
    //     if (isSuccess) console.log('isSuccess');
    // }, [isSuccess]);

    // useEffect(() => {
    //     if (isPending) console.log('isPending');
    // }, [isPending]);

    // useEffect(() => {
    //     if (isError) console.log('isError');
    // }, [isError]);

    return { mutate, isPending, isError, isSuccess };
};
