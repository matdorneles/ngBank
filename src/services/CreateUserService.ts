import prismaClient from "../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    username: string;
    password: string;
}

class CreateUserService {
    async execute({ username, password }: UserRequest) {

        // verify if username is already registered
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        });

        if (userAlreadyExists) {
            return "userExists";
        }

        const account = await this.createAccount();

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                username: username,
                password: passwordHash,
                accountId: account.id
            }, select: {
                id: true,
                username: true,
                accountId: true
            }
        })

        return user;
    }

    async createAccount() {
        const account = await prismaClient.account.create({
            data: {
                balance: 100.0
            }, select: {
                id: true
            }
        });

        return account;
    }
}

export { CreateUserService }