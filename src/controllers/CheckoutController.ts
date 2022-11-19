import { Request, Response } from "express";
import { CheckoutService } from "../services/CheckoutService";
import { verify } from "jsonwebtoken";

class CheckoutController {
    async handle(req: Request, res: Response) {
        // getting user ID from the token so it can only see it's balance
        const JWTsecret = "88df6abc268676d3e10f8e5388f6a127";
        const authToken = req.headers.authorization as string;
        if(!authToken) {
            return res.status(401).end();
        }
        const [, token] = authToken.split(" ");
        const decoded = verify(token, JWTsecret);
        const getUserId = decoded.sub; // sub === user ID
        const debitUserId = Number(getUserId);

        const { creditAccountUser, transferValue } = req.body;

        const checkoutService = new CheckoutService();
        const checkout = await checkoutService.execute({ debitUserId, creditAccountUser, transferValue });

        return res.status(200).json(checkout);
    }
}

export { CheckoutController }