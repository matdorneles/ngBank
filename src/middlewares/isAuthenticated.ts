import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const JWTsecret = "88df6abc268676d3e10f8e5388f6a127";

    // receive and validate token
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(token, JWTsecret) as Payload;

        req.user_id = sub;

        return next();

    } catch(err) {
        return res.status(401).end();
    }
}