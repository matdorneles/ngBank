import { Request, Response } from "express";
import { LoginUserService } from "../services/LoginUserService";

class LoginUserController {
    async handle(req: Request, res: Response) {
        const { username, password } = req.body;

        const loginUserService = new LoginUserService();

        const user = await loginUserService.execute({ username, password });

        return res.status(200).json(user);
    }
}

export { LoginUserController }