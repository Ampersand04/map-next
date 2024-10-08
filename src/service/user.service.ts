import { IUser } from '@/hooks/useUserCreate';
import { IUserLogin } from '@/hooks/useUserLogin';
import { prisma } from '@/lib/prisma';

class UserService {
    private URL = 'http://localhost:5000/api/auth';

    async userRegister(newUser: IUser) {
        // // const { email, password, fullname } = req.body;
        // // if (!email || !password || !fullname) {
        // //     return res.status(400).send('Please provide name, email, username, and password');
        // // }
        // // // console.log(!!userService.isUserExist({ email }));
        // // if (await userService.isUserExist({ email })) {
        // //     return res.status(400).send('Такой e-mail уже используется');
        // // }
        // // const hashedPassword = await bcrypt.hash(password, 10);
        // try {
        //     const user = await userService.createUser(req.body, hashedPassword);
        //     // const user = await prisma.user.create({
        //     //     data: {
        //     //         fullname: fullname,
        //     //         email: email,
        //     //         password: hashedPassword,
        //     //         // role: 'USER',
        //     //     },
        //     // });
        //     delete user.password;
        //     const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
        //         expiresIn: '1d',
        //     });
        //     console.log(token);
        //     res.json(user);
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).send('An error occurred while registering the user');
        // }
    }

    async userLogin(currentUser: IUserLogin) {
        // return axios.post<IUserLogin>(`${this.URL}/login`, currentUser);
    }

    async getUserByEmail(email: string) {
        try {
            const user = prisma.user.findUnique({ where: { email } });

            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserById(id: string) {
        try {
            const user = prisma.user.findUnique({ where: { id } });

            return user;
        } catch (error) {
            return null;
        }
    }
}

export const userService = new UserService();
