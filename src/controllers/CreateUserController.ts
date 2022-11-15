import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { schema } from "../passwordValidator/index";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { username, password } = req.body;

        // username validations
        if (username === '') {
            return res.status(400).json("É Necessário informar um username");
        } else if (username.length < 3) {
            return res.status(400).json("O username deve ter pelo menos 3 caracteres");
        }

        // password validations
        const validatePassword = schema.validate(password);

        if (!validatePassword) {
            return res.status(400).json("A senha deve ter pelo menos 8 caracteres, sendo um número e uma letra maiúscula");
        }

        // if all validations pass procceed
        
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ username, password });

        if(user === 'userExists') {
            return res.status(400).json("Este username já está registrado")
        }

        return res.status(201).json(user)
    }
}

export { CreateUserController }