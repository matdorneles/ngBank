import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface UserRequest {
    username: string;
    password: string;
}

class LoginUserService {
    async execute({ username, password }: UserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        });

        const idStr = String(user?.id);
        const usernameStr = String(user?.username);
        const passwordStr = String(user?.password);
        const JwtSecret = "88df6abc268676d3e10f8e5388f6a127";

        if(!user) {
            return 'unauthorized';
        }

        const passwordMatch = await compare(password, passwordStr)

        if (!passwordMatch) {
            return 'unauthorized';
        }

        // If passes proceed
        const token = sign(
            {
                username: usernameStr
            },
            JwtSecret,
            {
                subject: idStr,
                expiresIn: "1d"
            }
        );

        return {
            id: user.id,
            username: user.username,
            token: token
        }
    }
}

export { LoginUserService }