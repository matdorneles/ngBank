import { UserModel } from "../database/models/user";

interface UserRequest {
    username: string;
    password: string;
    accountId: number;
}

class CreateUserService {
    async execute({ username, password, accountId }: UserRequest) {
        const user = await UserModel.create({
            username: username,
            password: password,
            accountId: accountId
        })
    }
}

export { CreateUserService }