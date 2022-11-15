import { Request, Response } from "express";
import { CheckBalanceService } from "../services/CheckBalanceService";

class CheckBalanceController {
    async handle(req: Request, res: Response) {
        const userId = Number(req.query.userId);

        const checkBalanceService = new CheckBalanceService();

        const user = await checkBalanceService.execute({userId});

        return res.status(200).json(user);
    }
}

export { CheckBalanceController }