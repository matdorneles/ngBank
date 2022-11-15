import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { db } from "./database/db";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const port = 3333;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "internal server error"
    });
});

app.listen(port, async () => {
    try {
        await db.sync({ alter: true });
    } catch (error) {
        console.log(error);
    }

    console.log(`Server running on port ${port}`);
});