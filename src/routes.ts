import { Router } from "express";
import { CheckBalanceController } from "./controllers/CheckBalanceController";
import { CreateUserController } from "./controllers/CreateUserController";
import { LoginUserController } from "./controllers/LoginUserController";

const router = Router();

router.post('/user/new', new CreateUserController().handle);
router.post('/user/auth', new LoginUserController().handle);

router.post('/account/balance', new CheckBalanceController().handle);

export { router }