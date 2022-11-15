import { Request, Response } from "express";
import { createAccount } from "../middlewares/CreateAccount";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { username, password } = req.body;
        const account = createAccount();
        console.log(account);
        return res.json(account);

    }
}

export { CreateUserController }