import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

router.post('/user/new', new CreateUserController().handle);

export { router }