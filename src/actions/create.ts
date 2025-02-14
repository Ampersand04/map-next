import bcrypt from "bcrypt";
// import bcrypt from 'bcryptjs';
import { userService } from "../service/user.service";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";

// This function handles user registration logic
export const create = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    console.log(values);

    if (!validatedFields.success) {
        return { error: "Заполните поля!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
        console.log("Email уже используется");
        return { error: "Email уже используется" };
    }

    await prisma.user.create({
        data: { name, email, password: hashedPassword, image: "" },
    });

    console.log("Пользователь создан");

    return { success: "Пользователь создан" };
};
