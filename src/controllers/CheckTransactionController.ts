import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { CheckTransactionService } from "../services/CheckTransactionService";

class CheckTransactionController {
    async handle(req: Request, res: Response) {
        // getting user ID from the token so it can only see it's balance
        const JWTsecret = "88df6abc268676d3e10f8e5388f6a127";
        const authToken = req.headers.authorization as string;
        if(!authToken) {
            return res.status(401).end();
        }
        const [, token] = authToken.split(" ");
        const decoded = verify(token, JWTsecret);
        const userId = Number(decoded.sub); // sub === user ID

        const checkTransactionService = new CheckTransactionService();
        const transactions = checkTransactionService.execute({ userId });

        return res.status(200).json(transactions);
    }
}

export { CheckTransactionController }